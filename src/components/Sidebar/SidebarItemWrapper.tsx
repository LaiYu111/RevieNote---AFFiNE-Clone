import React, {ReactNode} from "react";
import clsx from "clsx";

interface ItemWrapperProps  extends React.BaseHTMLAttributes<HTMLDivElement> {
	children: ReactNode
	className?: string
}

function SidebarItemWrapper({children, className, ...rest}: ItemWrapperProps){
	return (
		<div
			className={clsx(
				'flex flex-row items-center gap-4 text-xs overflow-hidden cursor-pointer hover:bg-gray-200 hover:bg-opacity-70 p-2 rounded-md transition-all',
				className
			)}
			{...rest}
		>
			{children}
	</div>
	)
}

export default SidebarItemWrapper
