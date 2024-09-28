import clsx from "clsx";

interface DividerProps {
	direction: 'Vertical' | 'Horizontal'
	className?: string;
}

function Divider({direction, className}: DividerProps){
	return (
		<div
			className={clsx(
				"bg-gray-300",
				{
					"w-px h-full": direction === "Vertical",
					"h-px w-full": direction === "Horizontal",
				},
				className
			)}
		></div>
	)
}

export default Divider
