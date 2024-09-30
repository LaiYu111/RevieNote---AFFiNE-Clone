import './LexicalEditorTheme.css'
import type {EditorThemeClasses} from 'lexical';

export const LexicalEditorTheme: EditorThemeClasses = {
	paragraph: 'LexicalEditorTheme__textParagraph',
	text: {
		bold: 'LexicalEditorTheme__textBold',
		italic: 'LexicalEditorTheme__textItalic',
		underline: 'LexicalEditorTheme__textUnderline',
		code: 'LexicalEditorTheme__textInlineCode',
	},
	heading: {
		h1: 'LexicalEditorTheme__headerH1',
		h2: 'LexicalEditorTheme__headerH2',
		h3: 'LexicalEditorTheme__headerH3'
	},
	link: 'LexicalEditorTheme__link',
	list: {
		checklist: 'LexicalEditorTheme__checkList',
		listitem: 'LexicalEditorTheme__listItem',
		listitemChecked: 'LexicalEditorTheme__listItemChecked',
		listitemUnchecked: 'LexicalEditorTheme__listItemUnchecked',
		olDepth: [
			'LexicalEditorTheme__o1',
			'LexicalEditorTheme__o2',
			'LexicalEditorTheme__o3',
		],
		ul: 'LexicalEditorTheme__ul',
		ulDepth: [
			'LexicalEditorTheme__ul1',
			'LexicalEditorTheme__ul2',
			'LexicalEditorTheme__ul3',
		],
		nested: {
			listitem: 'LexicalEditorTheme__nestedListItem',
		},
	}
}
