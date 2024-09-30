import { PanelLeftClose } from "lucide-react";
import IconButton from "@/components/IconButton";
import React, { useRef, useEffect} from "react";
import clsx from "clsx";
import { throttle} from 'lodash';
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {closeSidebar, setWidth} from "@/redux/slices/sidebarSlice.ts";

interface ResizeProps extends React.BaseHTMLAttributes<HTMLDivElement> {
	onResizeStart?: React.MouseEventHandler<HTMLDivElement>;
}

function Resize({ className, onResizeStart, ...rest }: ResizeProps) {
	return (
		<div
			className={clsx(
				'h-full w-[10px] cursor-col-resize flex justify-center opacity-0 animation-fade-in ',
				className
			)}
			onMouseDown={onResizeStart}
			{...rest}
		>
			<div className='w-[3px] bg-blue-400 h-full mx-auto z-10'></div>
		</div>
	);
}

function Sidebar() {
	const dispatch = useAppDispatch()
	const MIN_WIDTH = useAppSelector(state => state.sidebar.MIN_WIDTH);
	const MAX_WIDTH = useAppSelector(state => state.sidebar.MAX_WIDTH);
	const width = useAppSelector(state => state.sidebar.width)
	const isOpen = useAppSelector((status) => status.sidebar.isOpen)
	const sidebarRef = useRef<HTMLDivElement | null>(null);
	const isResizing = useRef<boolean>(false);
	const initialWidth = useRef<number>(width);
	const startX = useRef<number>(0);


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

	return (
		<div
			ref={sidebarRef}
			className={clsx(
				"h-full relative bg-white"
			)}
			style={{ width: `${width}px` }}
		>
			<nav className={clsx(
				'w-full h-full flex flex-col border-r-2 overflow-hidden transition-all duration-300',
				isOpen? 'px-4 py-3':'px-0 py-3'
			)}>
				<div className={''}>
					<IconButton icon={<PanelLeftClose className={'icon'} type={'button'} onClick={handleCloseSidebar} />} />
				</div>

				<div>
					sss
				</div>
			</nav>

			<Resize
				className={'absolute top-0 -right-[5px]'}
				onResizeStart={handleResizeStart}
			/>
		</div>
	);
}

export default Sidebar;
