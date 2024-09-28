import {InitialConfigType, LexicalComposer} from "@lexical/react/LexicalComposer";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "@/components/Editor/plugins/ToolbarPlugin";
import LexicalContentEditable from "@/components/Editor/ui/ContentEditable.tsx";
import {LexicalEditorTheme} from "@/components/Editor/themes/LexicalEditorTheme.ts";
import {HeadingNode} from '@lexical/rich-text'
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import React from "react";
import {OnChangePlugin} from "@lexical/react/LexicalOnChangePlugin";
import type {EditorState, LexicalEditor} from "lexical";


function onError(error: Error){
	console.error(error)
}

function Editor(){
	const initialConfig: InitialConfigType = {
		namespace: 'MyEditor',
		theme: LexicalEditorTheme,
		onError: onError,
		nodes: [HeadingNode]
	}


	return (
		<LexicalComposer initialConfig={initialConfig}>
			<ToolbarPlugin />
			<HistoryPlugin />

			<div className={'relative'}>
				<RichTextPlugin
					contentEditable={
					<LexicalContentEditable placeholder={'hello'} />
				}
					ErrorBoundary={LexicalErrorBoundary} />
			</div>

		</LexicalComposer>
	)
}


export default Editor
