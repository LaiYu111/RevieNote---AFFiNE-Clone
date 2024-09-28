import React from "react";
import clsx from "clsx";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	icon: React.ReactNode;
	disabled?: boolean;
}

function IconButton({
	                    icon,
	                    className,
	                    disabled,
	                    ...rest
                    }: IconButtonProps) {
	return (
		<button
			className={clsx(
				`inline-flex flex-shrink-0 items-center justify-center p-1 rounded-md transition-all`,
				{
					"hover:bg-gray-200 hover:bg-opacity-55 animation-on-hover": !disabled,
					"cursor-not-allowed text-gray-200 ": disabled
				},
				className
			)}
			disabled={disabled}
			{...rest}
		>
			{icon}
		</button>
	);
}

export default IconButton;
