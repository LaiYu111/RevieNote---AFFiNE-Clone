import React, {MouseEvent, ReactElement, ReactNode, useEffect, useRef, useState} from "react";
import {ChevronDown, ChevronRight} from "lucide-react";
import IconButton from "@/components/IconButton";

interface DropdownProps {
	title: string
	className: string
	children?: ReactNode
}

function Dropdown({title, className, children}: DropdownProps){
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const itemsRef = useRef<Array<HTMLDivElement>>([])

	const toggleDropdown = () =>{
		setIsOpen(!isOpen)
	}

	const handleClickOutside = (e: MouseEvent | TouchEvent | FocusEvent) => {
		if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
			setIsOpen(false);
		}
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (!isOpen) return

		const currentIndex = itemsRef.current.findIndex(item => item === document.activeElement)
		switch (e.key){
			case 'ArrowDown': {
				e.preventDefault();
				const nextIndex = (currentIndex + 1) % itemsRef.current.length;
				itemsRef.current[nextIndex]?.focus();
				break
			}
			case 'ArrowUp':{
				e.preventDefault();
				const prevIndex = (currentIndex - 1 + itemsRef.current.length) % itemsRef.current.length;
				itemsRef.current[prevIndex]?.focus();
				break
			}
			case 'Escape':
				e.preventDefault();
				setIsOpen(false);
				break
			default:
				break
		}

	}

	useEffect(() => {
		if (isOpen) {
			// 聚焦第一个菜单项
			setTimeout(() => {
				itemsRef.current[0]?.focus();
			}, 0);

			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('keydown', handleKeyDown);

		} else {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen]);

	const DropdownItemsCloned = React.Children.map(children, (child,index) => {
		if (React.isValidElement(child)){
			return React.cloneElement(child as ReactElement, {
				ref: (el: HTMLDivElement) => (itemsRef.current[index] = el),
				// className: 'DropdownItems__cloned'
			})
		}
	})

	return (
		<div
			ref={dropdownRef}
			className={className}
		>
			<div
				className={'flex flex-row cursor-pointer relative h-7 items-center'}
				onClick={toggleDropdown}
			>
					{isOpen ?
						<IconButton icon={ <ChevronDown className={'dropdown-icon'}/>}/>
						:<IconButton icon={ <ChevronRight className={'dropdown-icon'}/>}/>
					}
				<div>
					{title}
				</div>
			</div>

			{isOpen && (
				<div
					className={'flex flex-col justify-center gap-2 absolute min-w-64  mt-2 bg-white shadow-dropdown z-10 rounded-lg p-2'}
					role={'menuitem'}
				>
					{DropdownItemsCloned}
				</div>
			)}

		</div>
	)
}

export default Dropdown
