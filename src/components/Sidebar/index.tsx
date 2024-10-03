import {NotebookIcon, PanelLeftClose, PlusIcon, Search as SearchIcon} from "lucide-react";
import IconButton from "@/components/IconButton";
import React, {useRef, useEffect} from "react";
import clsx from "clsx";
import { throttle} from 'lodash';
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {closeSidebar, setWidth} from "@/redux/slices/sidebarSlice.ts";
import User from "@/components/Sidebar/User.tsx";
import Resize from "@/components/Sidebar/Resize.tsx";
import SidebarItem from "@/components/Sidebar/SidebarItem.tsx";
import {PageDB, WorkspaceDB} from "@/db/schemas.ts";
import {v4 as uuidv4} from 'uuid'
import {getTimestamp} from "@/utils.ts";
import {addPageAsync} from "@/redux/slices/workspaceSlice.ts";
import {useNavigate} from "react-router-dom";


interface SidebarProps {
	workspace: WorkspaceDB | null
}

function Sidebar({workspace}: SidebarProps) {
	const dispatch = useAppDispatch()
	const MIN_WIDTH = useAppSelector(state => state.sidebar.MIN_WIDTH);
	const MAX_WIDTH = useAppSelector(state => state.sidebar.MAX_WIDTH);
	const width = useAppSelector(state => state.sidebar.width)
	const isOpen = useAppSelector((status) => status.sidebar.isOpen)
	const sidebarRef = useRef<HTMLDivElement | null>(null);
	const isResizing = useRef<boolean>(false);
	const initialWidth = useRef<number>(width);
	const startX = useRef<number>(0);
	const navigation = useNavigate()


	useEffect(() => {
		const handleMouseMove = throttle((e) => {
			if (!isResizing.current) return;

			const dx = e.clientX - startX.current;
			let newWidth = initialWidth.current + dx;

			if (newWidth < MIN_WIDTH) newWidth = MIN_WIDTH;
			if (newWidth > MAX_WIDTH) newWidth = MAX_WIDTH;

			dispatch(setWidth(newWidth))
		}, 25) ;

		const handleMouseUp = () => {
			if (isResizing.current) {
				isResizing.current = false;
			}
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);

		return () => {
			document.removeEventListener('mousemove',  handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, []);

	const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>) => {
		isResizing.current = true;
		initialWidth.current = width;
		startX.current = e.clientX;
	};

	const handleCloseSidebar = () => {
		dispatch(closeSidebar())
	}

	const handleCreatePage = async () => {
		const pageId = uuidv4()
		const page: PageDB = {
			id:pageId,
			editorStatus: null,
			title: '',
			createdAt: getTimestamp(),
			updatedAt: getTimestamp(),
		}

		dispatch(addPageAsync(page))
		if(workspace?.id){
			navigation(`/ws/${workspace.id}/p/${pageId}`)
		}
	};

	const handleClick = (pageId: string) => {
		if(workspace?.id){
			navigation(`/ws/${workspace.id}/p/${pageId}`)
		}
	}

	return (
		<div
			ref={sidebarRef}
			className={"h-full relative bg-gray-100"}
			style={{ width: `${width}px` }}
		>
			<nav className={clsx(
				'w-full h-full flex flex-col border-r-2 overflow-hidden transition-all duration-300 gap-3',
				isOpen ? 'px-2 py-3' : 'px-0 py-3'
			)}>
				<div><IconButton icon={<PanelLeftClose className={'icon'} type={'button'} onClick={handleCloseSidebar}/>}/>
				</div>
				<User workspace={workspace}/>
				<br/>
				<SidebarItem icon={<IconButton icon={<SearchIcon className={'icon'} type={'button'}/>}/>} text={'Search'}/>

				<div
					className={'flex flex-row justify-between items-center hover:bg-gray-200 transition-all rounded-md p-1 cursor-pointer'}
					onClick={handleCreatePage}
				>
					<div className={'caption text-md px-1'}>
						Private
					</div>
					<IconButton icon={<PlusIcon className={'icon'} type={'button'}/>}/>
				</div>

				<div className={'h-1/2 overflow-y-auto'}>
					{
						workspace?.pages.map((page)=>(
							<SidebarItem
								onClick={() => handleClick(page.id)}
								key={page.id}
								icon={<IconButton icon={<NotebookIcon className={'icon'} />}/>}
								text={page.title === "" ? 'Untitled': page.title}
								className={'overflow-hidden whitespace-nowrap overflow-ellipsis'}
							/>
						))
					}
				</div>
			</nav>


			{isOpen && <Resize className={'absolute top-0 -right-[5px]'} onResizeStart={handleResizeStart}/> }
		</div>
	);
}

export default Sidebar;
