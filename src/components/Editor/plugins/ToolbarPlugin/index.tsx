import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import React, {JSX, useCallback, useEffect, useState} from "react";
import './index.css'
import {Bold, Code, ItalicIcon, Lock, Redo2, Underline, Undo2, Unlock} from "lucide-react";
import IconButton from "@/components/IconButton";
import {
	FORMAT_TEXT_COMMAND,
	LexicalEditor,
	REDO_COMMAND,
	UNDO_COMMAND,
	$getSelection,
	SELECTION_CHANGE_COMMAND, COMMAND_PRIORITY_CRITICAL, BaseSelection, $isRangeSelection, type EditorState
} from "lexical";
import Divider from "@/components/Divider";
import Dropdown from "@/components/Dropdown";
import ParagraphDropdown from "@/components/Editor/plugins/ToolbarPlugin/ParagraphDropdown.tsx";
import {blockTypeToBlockName, rootTypeToRootName} from "@/components/Editor/types.ts";
import {OnChangePlugin} from "@lexical/react/LexicalOnChangePlugin";

function ToolbarPlugin(): JSX.Element  {
	const [editor] = useLexicalComposerContext()
	const [activeEditor, setActiveEditor] = useState<LexicalEditor>(editor)
	const [blockType, setBlockType] = useState<keyof typeof blockTypeToBlockName>('paragraph')
	const [rootType, setRootType] = useState<keyof typeof rootTypeToRootName>('root')

	const [isEditable, setIsEditable] = useState<boolean>(() => editor.isEditable())
	const [fontSize, setFontSize] = useState<string>('16px')
	const [canUndo, setCanUndo] = useState<boolean>(false);
	const [canRedo, setCanRedo] = useState<boolean>(false);
	const [isBold, setIsBold] = useState<boolean>(false)
	const [isItalic, setIsItalic] = useState<boolean>(false)
	const [isUnderline, setIsUnderline] = useState<boolean>(false)
	const [isInlineCode, setIsInlineCode] = useState<boolean>(false)
	const [isLink, setIsLine] = useState<boolean>(false)

	const $updateToolbar = useCallback(() => {
		const selection: BaseSelection | null = $getSelection()

		if ($isRangeSelection(selection)){

			setIsBold(selection.hasFormat('bold'))
			setIsItalic(selection.hasFormat('italic'))
			setIsUnderline(selection.hasFormat('underline'))
			setIsInlineCode(selection.hasFormat('code'))
		}

	}, [activeEditor, editor])


	useEffect(() => {
		return editor.registerCommand(
			SELECTION_CHANGE_COMMAND,
			(_payload, newEditor) => {
				setActiveEditor(newEditor);
				$updateToolbar();
				return false;
			},
			COMMAND_PRIORITY_CRITICAL,
		);
	}, [editor, $updateToolbar]);




	return (
		<div className={'flex flex-row border-2 p-1 gap-1 rounded-lg h-10 items-center text-gray-700 bg-white sticky top-3 z-20'}>
			{/*<IconButton*/}
			{/*	className={'toolbar-icon'}*/}
			{/*	icon={<Lock size={16}/>}*/}
			{/*	type={'button'}*/}
			{/*/>*/}

			<IconButton
				className={'toolbar-icon'}
				icon={<Undo2 size={16}/>}
				type={'button'}
				disabled={!canUndo || !isEditable}
				onClick={() => {
					activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
				}}
			/>
			<IconButton
				className={'toolbar-icon'}
				disabled={!canRedo || !isEditable}
				icon={<Redo2 size={16}/>}
				type={'button'}
				onClick={() => {
					activeEditor.dispatchCommand(REDO_COMMAND, undefined);
				}}
			/>
			<Divider direction={'Vertical'} className={'h-full'} />

			{
				blockType in blockTypeToBlockName  && activeEditor === editor && (
					<ParagraphDropdown rootType={rootType} blockType={blockType} editor={activeEditor} />
				)
			}

			<Divider direction={'Vertical'} />

			<IconButton
				className={`toolbar-icon ${isBold && 'toolbar-icon-selected'}`}
				icon={<Bold size={isBold? 16: 14} strokeWidth={isBold? '3px' : '2.5px'}  />}
				type={'button'}
				disabled={!isEditable}
				onClick={()=>{
					activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
				}}
			/>

			<IconButton
				className={`toolbar-icon ${isItalic && 'toolbar-icon-selected'}`}
				icon={<ItalicIcon size={isItalic? 16: 14} strokeWidth={isItalic? '3px' : '2.5px'} />}
				type={'button'}
				disabled={!isEditable}
				onClick={()=>{
					activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
				}}
			/>

			<IconButton
				className={`toolbar-icon ${isUnderline && 'toolbar-icon-selected'}`}
				icon={<Underline size={isUnderline? 16: 14} strokeWidth={isUnderline? '3px' : '2.5px'} />}
				type={'button'}
				disabled={!isEditable}
				onClick={()=>{
					activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
				}}
			/>

			<IconButton
				className={`toolbar-icon ${isInlineCode && 'toolbar-icon-selected'}`}
				icon={<Code size={isInlineCode? 16: 14} strokeWidth={isInlineCode? '3px' : '2.5px'}/>}
				type={'button'}
				disabled={!isEditable}
				onClick={() => {
					activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')
				}}
			/>
			<Divider direction={'Vertical'} />
		</div>
	)
}

export default ToolbarPlugin
