
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {openSidebar} from "@/redux/slices/sidebarSlice.ts";
import IconButton from "@/components/IconButton";
import {Ellipsis, Info as InfoIcon, PanelLeftOpen} from "lucide-react";
import {useEffect} from "react";

interface HeaderProps{
	title: string
	workspaceId: string
}

function Header({title}:HeaderProps){
	const dispatch = useAppDispatch()
	const sidebarOpened = useAppSelector((state) => state.sidebar.isOpen)

	useEffect(() => {
		document.title = `${title} - ReviewNote`
	}, [title]);

	const handleOpenSidebar = () => {
		dispatch(openSidebar())
	}

	return (
		<div className={'flex flex-row  items-center gap-3 h-14 px-4 border-b-2'}>
			{
				!sidebarOpened && <IconButton icon={<PanelLeftOpen className={'icon'} onClick={handleOpenSidebar} />} />
			}
			<div className={'max-w-80 overflow-ellipsis overflow-hidden text-nowrap'}>{title}</div>
			<div><IconButton icon={<InfoIcon className={'icon'}/>}/></div>
			<div><IconButton icon={<Ellipsis className={'icon'}/>}/></div>
		</div>
	)
}

export default Header
