import IconButton from "@/components/IconButton";
import {Ellipsis, Info} from "lucide-react";

function Header(){
	return (
		<div className={'flex flex-row items-center border-b-2 h-14 px-4 gap-3'}>
			<div>Title</div>
			<div><IconButton icon={<Info className={'icon'} />} /></div>
			<div><IconButton icon={<Ellipsis className={'icon'}/>} /></div>
		</div>
	)
}

function MainContainer(){
	return (
		<div className={'h-full w-full flex flex-col'}>
			<Header />

		</div>
	)
}

export default MainContainer
