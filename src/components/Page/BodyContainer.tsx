import {PageDB} from "@/db/schemas.ts";
import clsx from "clsx";
import Editor from "@/components/Editor";
import Info from "@/components/Page/Info.tsx";
import Title from "@/components/Page/Title.tsx";

interface BodyContainerProps{
	className?: string
	page: PageDB,
	workspaceId: string
}

function BodyContainer({className, page, workspaceId}: BodyContainerProps) {
	return (
		<div
			className={clsx(className)}
		>
			<div className={'flex flex-col gap-3'}>
				<Title className={'text-4xl font-bold py-7'}  workspaceId={workspaceId} page={page} />
				<Info className={'caption'} page={page} />

				<div >
					<Editor page={page} workspaceId={workspaceId}/>
				</div>
			</div>
		</div>
	)
}

export default BodyContainer
