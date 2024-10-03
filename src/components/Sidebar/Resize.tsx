import React from "react";
import clsx from "clsx";

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

export default Resize
