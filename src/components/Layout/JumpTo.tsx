import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

// 判断去login还是去页面
function JumpTo(){
	const navigation = useNavigate()

	useEffect(() => {
		navigation('/login')
	}, []);

	return null
}

export default JumpTo
