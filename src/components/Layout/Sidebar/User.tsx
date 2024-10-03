import dummyImg from "@/assets/react.svg";
import {useAppSelector} from "@/redux/store.ts";
import clsx from "clsx";
import {useEffect, useState} from "react";
import {TOKEN} from "@/config.ts";
import {parseToken} from "@/utils.ts";

function User(){
	const status = useAppSelector(state => state.system.status)


	return (
		<div className={'flex flex-row items-center gap-4 text-xs overflow-hidden cursor-pointer'}>
			<img src={dummyImg} alt={'workspace image'} className={'flex-shrink-0 bg-cyan-200 w-10 h-10 p-1  rounded-md'}/>
			<div className={'flex-shrink-0 flex flex-col justify-between '}>
				<div className={'font-bold truncate'}>
					ReviewNote
				</div>

				<div className={'flex-1 flex flex-row gap-2 items-center '}>
					<div
						className={clsx(
							'rounded-full h-3 w-3 border',
							status === 'online' ? 'bg-green-500' : 'bg-red-500'
						)}>
					</div>
					<div>
						{status}
					</div>
				</div>
			</div>
		</div>
	)
}

export default User
