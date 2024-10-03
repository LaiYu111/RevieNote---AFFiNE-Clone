import Header from "@/components/Header";
import {WorkspaceDB} from "@/db/schemas.ts";

interface WorkspaceProps {
	workspace: WorkspaceDB
}

function Workspace({workspace}: WorkspaceProps){

	return (
		<div className={'w-full'}>
			<Header title={workspace.title}/>
		</div>
	)
}

export default Workspace
