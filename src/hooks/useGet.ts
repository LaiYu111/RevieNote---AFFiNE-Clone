import {useEffect, useState} from "react";
import axios from "axios";


interface UseGetResponse<T> {
	data: any;
	loading: boolean;
	error: string | null;
	fetchData: (suffix: string) => Promise<T | null>;
}



/**
 *
 * @param prefix 如 BACKEND_URL localhost:8001
 */
function useGet<T>(prefix: string): UseGetResponse<T> {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const requestInterceptor = axios.interceptors.request.use(
			(config) => {
				const token = localStorage.getItem('token');
				console.log(`TOKEN: ${token}`)
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
	 */
	const fetchData = async (suffix: string): Promise<T | null> => {
		setLoading(true);
		setError(null);

		try {
			const response = await axios.get<T>(`${prefix}${suffix}`);
			setData(response.data);
			return response.data;
		} catch (err) {
			setError(err instanceof Error ? err.message : "An unknown error occurred");
			return null;
		} finally {
			setLoading(false);
		}
	};


	return { data, loading, error, fetchData }
}

export default useGet;
