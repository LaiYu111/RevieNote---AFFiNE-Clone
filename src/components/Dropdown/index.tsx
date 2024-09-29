import React, {MouseEvent, ReactElement, ReactNode, useEffect, useRef, useState} from "react";
import {ChevronDown, ChevronRight} from "lucide-react";
import IconButton from "@/components/IconButton";

interface DropdownProps {
	title: string | ReactNode
	className: string
	children?: ReactNode
	showToggleIcon?: boolean
	value?: string // 与 Dropdown Id 匹配。若匹配则选中。
}

function Dropdown({title, value, className, children, showToggleIcon = true}: DropdownProps){
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
			setTimeout(() => {
				const focusedItem = itemsRef.current.find((item) => {
					return item.id === value
				})
				if (focusedItem) {
					focusedItem.focus();
				}
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
				className: 'DropdownItems__cloned'
			})
		}
	})

	return (
		<div
			ref={dropdownRef}
			className={className}
		>
			<div
				className={'flex flex-row gap-1 cursor-pointer relative h-7 items-center'}
				onClick={toggleDropdown}
			>
				{
					showToggleIcon && (
						isOpen ?
						<IconButton icon={ <ChevronDown className={'dropdown-icon'}/>}/>
						:<IconButton icon={ <ChevronRight className={'dropdown-icon'}/>}/>
					)
				}
				<div>
					{title}
				</div>
			</div>

			{isOpen && (
				<div
					className={'flex flex-col  gap-2 absolute min-w-72 max-h-96 overflow-y-auto  mt-2 bg-white shadow-dropdown z-10 rounded-lg p-2'}
					role={'menuitem'}
				>
					{DropdownItemsCloned}
				</div>
			)}

		</div>
	)
}

export default Dropdown
