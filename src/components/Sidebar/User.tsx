import dummyImg from "@/assets/react.svg";
import {useAppSelector} from "@/redux/store.ts";
import clsx from "clsx";
import SidebarItemWrapper from "@/components/Sidebar/SidebarItemWrapper.tsx";
import {WorkspaceDB} from "@/db/schemas.ts";
import {useNavigate} from "react-router-dom";


interface UserProps{
	workspace: WorkspaceDB | null
	className?: string
}

function User({workspace, className}: UserProps){
	const status = useAppSelector(state => state.system.status)
	const navigation = useNavigate()
	const handleNavigation = () => {
		if (workspace){
			navigation(`/ws/${workspace.id}`)
		}
	}

	return (
		<SidebarItemWrapper
			className={className}
			onClick={handleNavigation}
		>
			<img src={dummyImg} alt={'workspace image'} className={'flex-shrink-0 bg-cyan-200 w-10 h-10 p-1  rounded-md'}/>
			<div className={'flex-shrink-0 flex flex-col justify-between '}>
				<div className={'font-bold truncate'}>
					{workspace?.title}
				</div>

				<div className={'flex-1 flex flex-row gap-1 items-center '}>
					<div
						className={clsx(
							'rounded-full h-3 w-3 border',
							status === 'online' ? 'bg-green-500' : 'bg-red-500'
						)}>
					</div>
					<div>
						{status} - LocalStorage
					</div>
				</div>
			</div>
		</SidebarItemWrapper>
	)
}

export default User
