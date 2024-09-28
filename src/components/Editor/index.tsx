import {InitialConfigType, LexicalComposer} from "@lexical/react/LexicalComposer";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "@/components/Editor/plugins/ToolbarPlugin";
import LexicalContentEditable from "@/components/Editor/ui/ContentEditable.tsx";
import {LexicalEditorTheme} from "@/components/Editor/themes/LexicalEditorTheme.ts";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import AutoSavedPlugin from "@/components/Editor/plugins/AutoSavedPlugin";
import {TextNode} from "lexical";



function loadContent(){
	return localStorage.getItem('editorContent')
}


function onError(error: Error){
	console.error(error)
}

function Editor(){
	const initialConfig: InitialConfigType = {
		namespace: 'MyEditor',
		theme: LexicalEditorTheme,
		onError: onError,
		editorState: loadContent(),
		nodes: [
			HeadingNode,
			TextNode,
			QuoteNode,
		],
	}


	return (
		<LexicalComposer initialConfig={initialConfig}>
			<AutoSavedPlugin />

			<ToolbarPlugin/>
			<HistoryPlugin />

			<div className={'relative'}>
				<RichTextPlugin
					contentEditable={<LexicalContentEditable placeholder={'hello'} />}
					ErrorBoundary={LexicalErrorBoundary} />
			</div>

		</LexicalComposer>
	)
}


export default Editor
