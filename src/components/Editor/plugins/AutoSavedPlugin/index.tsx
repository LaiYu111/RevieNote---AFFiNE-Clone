import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {useEffect} from "react";
import {debounce} from "lodash";
import {useAppDispatch} from "@/redux/store.ts";
import {getTimestamp} from "@/utils.ts";
import {updatePageAsync} from "@/redux/slices/pageSlice.ts";

interface AutoSavedPluginProps {
	pageId: string
	workspaceId: string
}

function AutoSavedPlugin({pageId, workspaceId}: AutoSavedPluginProps){
	const [editor] = useLexicalComposerContext();
	const dispatch = useAppDispatch()

	useEffect(() => {
		const saveContent = debounce(() => {
			editor.getEditorState().read(() => {
				const serializedState = JSON.stringify(editor.getEditorState().toJSON());
				dispatch(updatePageAsync({
					pageId: pageId,
					workspaceId: workspaceId,
					editorStatus: serializedState,
					updatedAt: getTimestamp()
				}))
			});
		}, 25);

		return editor.registerUpdateListener(() => {
			saveContent();
		});
	}, [editor]);
	return null
}


export default AutoSavedPlugin
