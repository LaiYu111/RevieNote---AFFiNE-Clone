import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import './ContentEditable.css'

type Props = {
	className?: string;
	placeholderClassName?: string;
	placeholder: string;
};


function LexicalContentEditable({
	className,
	placeholder,
	placeholderClassName
                                }: Props){
	return (
		<ContentEditable
			className={className ?? 'ContentEditable__root'}
			aria-placeholder={placeholder}
			placeholder={
				<div className={placeholderClassName ?? 'ContentEditable__placeholder'}>
					{placeholder}
				</div>
			}
		/>
	)
}

export default LexicalContentEditable
