import React, { KeyboardEvent } from 'react';
import IconButton from "@/components/IconButton";
import clsx from "clsx";

interface DropdownItemsProps {
	icon?: React.ReactNode;
	text: string;
	onClick?: () => void;
	className?: string
	onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
}

const DropdownItem = React.forwardRef<HTMLDivElement | null, DropdownItemsProps>(
	({ icon, text, onClick, className }, ref) => {
		return (
			<div
				ref={ref}
				className={clsx('flex flex-row items-center gap-4 hover:bg-gray-200 hover:bg-opacity-55 rounded-lg cursor-pointer p-1 focus:outline-none focus:bg-blue-200 focus:bg-opacity-55',className)}
				onClick={onClick}
				role="menuitem"
				tabIndex={-1} // 初始时不聚焦，由父组件控制
			>
				<IconButton icon={icon} />
				<span className='text-lg'>{text}</span>
			</div>
		);
	}
);

export default DropdownItem;
