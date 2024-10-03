import {useParams} from "react-router-dom";
import { useEffect} from "react";

interface HomeProps {
	setWsID: Function
}

function Home({setWsID}: HomeProps){
	const {ws_id} = useParams()

	useEffect(() => {
		setWsID(ws_id)
	}, []);

	return <div>{ws_id}</div>
}

export default Home
