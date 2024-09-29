import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {JSX, useCallback, useEffect, useState} from "react";
import './index.css'
import {Bold, Code, ItalicIcon, LinkIcon, Lock, Redo2, Underline, Undo2, Unlock} from "lucide-react";
import IconButton from "@/components/IconButton";
import {
	FORMAT_TEXT_COMMAND,
	LexicalEditor,
	REDO_COMMAND,
	UNDO_COMMAND,
	$getSelection,
	SELECTION_CHANGE_COMMAND,
	COMMAND_PRIORITY_CRITICAL,
	BaseSelection,
	$isRangeSelection,
	$isRootOrShadowRoot, ElementNode, LexicalNode, $isParagraphNode
} from "lexical";
import {
	$getSelectionStyleValueForProperty,
} from '@lexical/selection';
import Divider from "@/components/Divider";
import ParagraphDropdown from "@/components/Editor/plugins/ToolbarPlugin/ParagraphDropdown.tsx";
import {blockTypeToBlockName, rootTypeToRootName} from "@/components/Editor/types.ts";
import { $isHeadingNode } from '@lexical/rich-text'
import FontColorPickerDropdown from "@/components/Editor/plugins/ToolbarPlugin/FontColorPickerDropdown.tsx";
import BgColorPickerDropdown from "@/components/Editor/plugins/ToolbarPlugin/BgColorPickerDropdown.tsx";
import {$isLinkNode, TOGGLE_LINK_COMMAND} from '@lexical/link';
import {
	$isListNode,
	ListNode
} from '@lexical/list';
import {
	$findMatchingParent,
	$getNearestNodeOfType,
} from '@lexical/utils';
import {
	$isCodeNode,
	CODE_LANGUAGE_MAP,
} from '@lexical/code';


function ToolbarPlugin(): JSX.Element  {
	const [editor] = useLexicalComposerContext()
	const [activeEditor, setActiveEditor] = useState<LexicalEditor>(editor)
	const [blockType, setBlockType] = useState<keyof typeof blockTypeToBlockName>('paragraph')
	const [rootType, setRootType] = useState<keyof typeof rootTypeToRootName>('root')

	const [isEditable, setIsEditable] = useState<boolean>(() => editor.isEditable())
	const [canUndo, setCanUndo] = useState<boolean>(false);
	const [canRedo, setCanRedo] = useState<boolean>(false);
	const [isBold, setIsBold] = useState<boolean>(false)
	const [isItalic, setIsItalic] = useState<boolean>(false)
	const [isUnderline, setIsUnderline] = useState<boolean>(false)
	const [isInlineCode, setIsInlineCode] = useState<boolean>(false)
	const [bgColor, setBgColor] = useState<string>('#fff');
	const [fontColor, setFontColor] = useState<string>('#000')
	const [isLink, setIsLink] = useState<boolean>(false)
	const [codeLanguage, setCodeLanguage] = useState<string>('')

	const $updateToolbar = useCallback(() => {
		const selection: BaseSelection | null = $getSelection()

		if ($isRangeSelection(selection)){
			// 获取 HTML DOM
			const anchorNode = selection.anchor.getNode();

			let element= anchorNode.getKey() === 'root'
				? anchorNode
				: $findMatchingParent(anchorNode, (e: LexicalNode) => {
					const parent: ElementNode | null = e.getParent();
					return parent !== null && $isRootOrShadowRoot(parent);
				});
			if (element === null) {
				element = anchorNode.getTopLevelElementOrThrow()
			}

			const elementKey = element.getKey();
			const elementDOM = activeEditor.getElementByKey(elementKey);

			setIsBold(selection.hasFormat('bold'))
			setIsItalic(selection.hasFormat('italic'))
			setIsUnderline(selection.hasFormat('underline'))
			setIsInlineCode(selection.hasFormat('code'))

			if (elementDOM){
				// 更新 blockType
				if ($isHeadingNode(element)){
					setBlockType(element.getTag())
				}
				else if($isParagraphNode(element)){
					setBlockType(element.getType() as 'paragraph')
				}
				else if($isListNode(element)){
					// list 类型
					const parentList = $getNearestNodeOfType<ListNode>(
						anchorNode,
						ListNode
					)
					const type = parentList ? parentList.getListType(): element.getListType()
					if (type in blockTypeToBlockName){
						setBlockType(type as keyof typeof  blockTypeToBlockName)
					}
				}
				else if ($isCodeNode(element)){
					const language =
						element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
					setCodeLanguage(
						language ? CODE_LANGUAGE_MAP[language] || language : '',
					);
					setBlockType("code")
				}
			}

			// Links
			const parent = anchorNode.getParent()
			if ($isLinkNode(anchorNode) || $isLinkNode(parent)){
				setIsLink(true)
			}else{
				setIsLink(false)
			}

			// Colors
			const fontColor = $getSelectionStyleValueForProperty(selection, 'color', '#000')
			setFontColor(fontColor)

			// bg color
			const bgColor = $getSelectionStyleValueForProperty(selection, 'background-color', '#fff')
			setBgColor(bgColor)

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


	const handleSetIsEditable = (status: boolean) => {
		editor.setEditable(status)
		setIsEditable(status)
	}

	const insertLink = useCallback(() => {
		if (!isLink) {
			const url = prompt('https://')
			activeEditor.dispatchCommand(
				TOGGLE_LINK_COMMAND,
				`https://${url}`,
			);
		} else {
			activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
		}
	}, [activeEditor, isLink]);


	return (
		<div className={'flex flex-row border-2 p-1 gap-1 rounded-lg h-10 items-center text-gray-700 bg-white sticky top-3 z-20'}>
			<div className={'flex flex-row justify-between w-full'}>
			{
				isEditable? (
					<>
						<div className={'flex flex-row gap-1 items-center'}>
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

							<IconButton
								className={`toolbar-icon ${isLink && 'toolbar-icon-selected'}`}
								icon={<LinkIcon size={isLink? 16: 14} strokeWidth={isLink ? '3px' : '2.5px'}/>}
								type={'button'}
								disabled={!isEditable}
								onClick={insertLink}
							/>

							<FontColorPickerDropdown activeEditor={activeEditor} colorValue={fontColor} />
							<BgColorPickerDropdown activeEditor={activeEditor} colorValue={bgColor} />
							<Divider direction={'Vertical'} />
						</div>

						<div className={'flex flex-row gap-1'}>
							<Divider direction={'Vertical'} />
							<IconButton
								className={'toolbar-icon'}
								icon={<Unlock size={16}/>}
								type={'button'}
								onClick={() => handleSetIsEditable(false)}
							/>
						</div>
					</>
				):(
					<>
						<div></div>
						<div className={'flex flex-row gap-1'}>
							<Divider direction={'Vertical'} />
							<IconButton
								className={'toolbar-icon'}
								icon={<Lock size={16}/>}
								type={'button'}
								onClick={() => handleSetIsEditable(true)}
							/>
						</div>
					</>
				)
			}
			</div>

		</div>
	)
}

export default ToolbarPlugin
