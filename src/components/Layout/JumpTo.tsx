import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useGet from "@/hooks/useGet.ts";
import {BACKEND_URL, TOKEN, TOKEN_EXPIRES_IN} from "@/config.ts";
import {isTokenExpired, parseToken} from "@/utils.ts";




// 判断去login还是去页面
function JumpTo(){
	const navigation = useNavigate()
	const {data, fetchData} = useGet(BACKEND_URL)

	const getWorkspace = async (userId: string) => {
		await fetchData(`/api/workspace/all/${userId}`)
	}

	useEffect(() => {
		const tokenExpireTime = localStorage.getItem(TOKEN_EXPIRES_IN)
		const token = localStorage.getItem(TOKEN)
		if (isTokenExpired(Number(tokenExpireTime))) {
			console.log("Token expired")
			navigation('/login')
		}

		if (token){
			const parsedToken = parseToken(token)
			if (parsedToken){
				getWorkspace(parsedToken._id)
			}
		}
	}, []);

	useEffect(() => {
		if (data){
			if (data.length > 0){
				navigation(`/ws/${data[0]._id}`)
			}else{
				navigation('/create_workspace')
			}
		}
	}, [data]);

	return null
}

export default JumpTo
