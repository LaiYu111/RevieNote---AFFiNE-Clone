import {useEffect, useState} from "react";
import axios from "axios";

interface UsePostResponse{
	data: any;
	loading: boolean
	error: string | null
	postData: (suffix: string, payload: any) => Promise<any>;
	reset: () => void
}


/**
 *
 * @param prefix 如 BACKEND_URL localhost:8001
 */
function usePost(prefix: string): UsePostResponse {
	const [data, setData] = useState<unknown>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const requestInterceptor = axios.interceptors.request.use(
			(config) => {
				const token = localStorage.getItem("token");
				console.log(`TOKEN: ${token}`);
				if (token) {
					config.headers = config.headers || {};
					config.headers.Authorization = `Bearer ${token}`;
				}
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		return () => {
			axios.interceptors.request.eject(requestInterceptor);
		};
	}, []);

	/**
	 *
	 * @param suffix 如 /api/xxxx
	 * @param payload 传递给POST请求的数据
	 */
	const postData = async (suffix: string, payload: any): Promise<any> => {
		setLoading(true);
		setError(null);

		try {
			const response = await axios.post(`${prefix}${suffix}`, payload);
			setData(response.data);
			return response.data;
		} catch (err) {
			setError(err instanceof Error ? err.message : "An unknown error occurred");
			return null;
		} finally {
			setLoading(false);
		}
	};

	const reset = () => {
		setData(null)
		setLoading(false)
		setError(null)
	}

	return { data, loading, error, postData, reset };
}

export default usePost;
