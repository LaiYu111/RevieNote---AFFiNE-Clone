import './LexicalEditorTheme.css'
import type {EditorThemeClasses} from 'lexical';

export const LexicalEditorTheme: EditorThemeClasses = {
	text: {
		bold: 'LexicalEditorTheme__textBold',
		italic: 'LexicalEditorTheme__textItalic',
		underline: 'LexicalEditorTheme__textUnderline',
		code: 'LexicalEditorTheme__textInlineCode'
	},
	heading: {
		h1: 'LexicalEditorTheme__headerH1',
		h2: 'LexicalEditorTheme__headerH2',
		h3: 'LexicalEditorTheme__headerH3'
	}
}
