import {WorkspaceDB} from "@/db/schemas.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

interface JumpToProps {
	workspace: WorkspaceDB | null
}

function JumpTo({workspace}: JumpToProps){
	const navigation = useNavigate()

	useEffect(() => {
		if (workspace){
			navigation(`/ws/${workspace.id}`)
		}
	}, [workspace]);

	return null
}

export default JumpTo
