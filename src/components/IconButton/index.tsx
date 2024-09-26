import React from "react";
import clsx from "clsx";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	icon: React.ReactNode,
}

function IconButton ({
	icon,
	className,
	...rest
}: IconButtonProps){
	return (
		<button
			className={clsx(
				'inline-flex flex-shrink-0 items-center p-1 hover:bg-gray-200 hover:bg-opacity-55 hover:rounded-md animation-on-hover',
				className
			)}
			{...rest}
		>
			{icon}
		</button>
	)
}

export default IconButton
