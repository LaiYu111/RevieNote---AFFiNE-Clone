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
import {AutoLinkNode, LinkNode} from '@lexical/link';
import {ListItemNode, ListNode} from '@lexical/list';
import {ListPlugin} from "@lexical/react/LexicalListPlugin";
import {CheckListPlugin} from "@lexical/react/LexicalCheckListPlugin";
import {LinkPlugin} from "@lexical/react/LexicalLinkPlugin";
import {CodeHighlightNode, CodeNode} from '@lexical/code';
import EnsureLastParagraphPlugin from "@/components/Editor/plugins/EnsureLastParagraphPlugin";
import {MarkdownShortcutPlugin} from "@lexical/react/LexicalMarkdownShortcutPlugin";
import {HorizontalRuleNode} from "@lexical/react/LexicalHorizontalRuleNode";
import {TabIndentationPlugin} from "@lexical/react/LexicalTabIndentationPlugin";
import CodeHighlightPlugin from "@/components/Editor/plugins/CodeHighlightPlugin";
import PastePlugin from "@/components/Editor/plugins/PastePlugin";


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
			LinkNode,
			AutoLinkNode,
			HeadingNode,
			TextNode,
			QuoteNode,
			ListNode,
			ListItemNode,
			CodeNode,
			CodeHighlightNode,
			HorizontalRuleNode
		],
	}


	return (
		<LexicalComposer initialConfig={initialConfig}>
			<AutoSavedPlugin />
			<ToolbarPlugin />
			<HistoryPlugin />
			<ListPlugin />
			<CheckListPlugin />
			<LinkPlugin />
			<TabIndentationPlugin />
			<CodeHighlightPlugin />
			<MarkdownShortcutPlugin />
			<PastePlugin />
			<div className={'relative'}>
				<EnsureLastParagraphPlugin />
				<RichTextPlugin
					contentEditable={<LexicalContentEditable placeholder={'hello'} />}
					ErrorBoundary={LexicalErrorBoundary} />
			</div>
		</LexicalComposer>
	)
}


export default Editor
