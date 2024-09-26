// Sidebar.tsx

import { PanelLeftClose } from "lucide-react";
import IconButton from "@/components/IconButton";
import React, {useState, useRef, useEffect} from "react";
import clsx from "clsx";
import throttle from "lodash/throttle";

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
	const MIN_WIDTH = 200;
	const MAX_WIDTH = 500;

	const [width, setWidth] = useState<number>(300); // Initial width
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

			setWidth(newWidth);
		}, 50) ;

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

	return (
		<div
			ref={sidebarRef}
			className={'h-full relative'}
			style={{ width: `${width}px` }}
		>
			<nav className={'w-full h-full border-r-2 px-4 py-2'}>
				<div>
					<IconButton icon={<PanelLeftClose className={'icon'} />} />
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
