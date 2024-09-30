import {
	$getSelection,
	$isRangeSelection,
	COMMAND_PRIORITY_HIGH,
	PASTE_COMMAND
} from "lexical";
import {useEffect} from "react";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";


interface PastePayload {
	clipboardData: DataTransfer;
}

function PastePlugin(){
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		const handlePaste = (payload: PastePayload) => {
			const { clipboardData } = payload;
			const text = clipboardData?.getData('text')
			// console.log(clipboardData?.getData('data'))
			if (text){
				editor.update(()=>{
					const selection = $getSelection();
					if ($isRangeSelection(selection)) {

						selection.insertText(text);
					}
				})
			}

			return true;
		};

		return editor.registerCommand(
			PASTE_COMMAND,
			handlePaste,
			COMMAND_PRIORITY_HIGH
		);
	}, [editor]);

	return null;
}

export default PastePlugin
