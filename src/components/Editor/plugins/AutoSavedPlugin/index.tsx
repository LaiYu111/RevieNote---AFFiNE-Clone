import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";

import {useEffect} from "react";
import {throttle} from "lodash";

function AutoSavedPlugin(){
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		const saveContent = throttle(() => {
			editor.getEditorState().read(() => {
				const serializedState = JSON.stringify(editor.getEditorState().toJSON());
				localStorage.setItem("editorContent", serializedState);
			});
		}, 1000);

		return editor.registerUpdateListener(() => {
			saveContent();
		});
	}, [editor]);
	return null
}


export default AutoSavedPlugin
