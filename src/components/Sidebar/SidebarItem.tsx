import React, {ReactNode} from "react";
import SidebarItemWrapper from "@/components/Sidebar/SidebarItemWrapper.tsx";

interface SidebarItemProps extends React.BaseHTMLAttributes<HTMLDivElement>{
	icon: ReactNode
	text: string
	className?:string
}

function SidebarItem({icon, text, className, ...rest}: SidebarItemProps){
	return (
		<SidebarItemWrapper className={className} {...rest}>
			{icon}

			<div className={'caption font-bold'}>
				{text}
			</div>
		</SidebarItemWrapper>
	)
}

export default SidebarItem
