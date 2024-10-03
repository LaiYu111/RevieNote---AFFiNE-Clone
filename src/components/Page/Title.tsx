import React, { useState, useEffect } from 'react';
import { PageDB } from '@/db/schemas';
import {useAppDispatch} from "@/redux/store.ts";
import {updatePageAsync} from "@/redux/slices/pageSlice.ts";


interface TitleProps {
	className?: string;
	page: PageDB;
	workspaceId: string
}

function Title({ className,workspaceId, page }: TitleProps) {
	const dispatch = useAppDispatch();
	const [value, setValue] = useState(page.title);
	const [isComposing, setIsComposing] = useState(false);

	useEffect(() => {
		setValue(page.title);
	}, [page.title]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		if (!isComposing) {
			dispatch(
				updatePageAsync({
					pageId: page.id,
					workspaceId: workspaceId,
					title: e.target.value,
				})
			);
		}
	};

	const handleCompositionStart = () => {
		setIsComposing(true);
	};

	const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
		setIsComposing(false);
		dispatch(
			updatePageAsync({
				pageId: page.id,
				workspaceId: workspaceId,
				title: e.currentTarget.value,
			})
		);
	};

	return (
		<div className={className}>
			<input
				placeholder="Untitled"
				value={value}
				onChange={handleChange}
				onCompositionStart={handleCompositionStart}
				onCompositionEnd={handleCompositionEnd}
				className={'w-full focus:outline-none'}
			/>
		</div>
	);
}

export default Title;
