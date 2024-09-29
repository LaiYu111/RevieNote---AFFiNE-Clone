import {ReactNode} from "react";

interface ColorBlockProps {
	color: string
	children?: ReactNode
	height?: string
	width?: string
	bgOpacity?: string
}

function ColorBlock({color,height="25px",width='25px', children}: ColorBlockProps){
	return (
		<div style={{
			backgroundColor: color,
			height: height,
			width: width,
		}} className={'flex justify-center items-center border-2 rounded-lg'}>
			{children}
		</div>
	)
}

export default ColorBlock
