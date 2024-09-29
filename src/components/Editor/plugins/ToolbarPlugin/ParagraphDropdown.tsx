import Dropdown from "@/components/Dropdown";
import {$createParagraphNode, $getSelection, $isRangeSelection, LexicalEditor} from "lexical";
import {$setBlocksType} from '@lexical/selection'
import {
	$createHeadingNode,
	HeadingTagType
} from '@lexical/rich-text';
import {blockTypeToBlockName, rootTypeToRootName} from "@/components/Editor/types.ts";
import {Heading1, Heading2, Heading3, List, ListOrdered, ListTodo, TextIcon} from "lucide-react";
import DropdownItem from "@/components/Dropdown/DropdownItem";
import {
	INSERT_CHECK_LIST_COMMAND,
	INSERT_ORDERED_LIST_COMMAND,
	INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';


interface ParagraphDropdownProps {
	editor: LexicalEditor
	blockType: keyof typeof blockTypeToBlockName
	rootType: keyof typeof rootTypeToRootName
}

function ParagraphDropdown({editor, blockType}: ParagraphDropdownProps){

	const formatParagraph = () => {
		editor.update(() => {
			const selection = $getSelection()
			if ($isRangeSelection(selection)){
				$setBlocksType(selection, () => $createParagraphNode())
			}
		})
	}

	const formatHeading = (headingSize: HeadingTagType) => {
		if (blockType !== headingSize) {
			editor.update(() => {
				const selection = $getSelection();
				$setBlocksType(selection, () => $createHeadingNode(headingSize));
			});
		}
	};

	const formatBulletList = () =>{
		if (blockType !== 'bullet') {
			editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
		} else {
			formatParagraph();
		}
	}

	const formatOrderList = () => {
		if (blockType !== 'number') {
			editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
		} else {
			formatParagraph();
		}
	}

	const formatCheckList = () => {
		if (blockType !== 'check') {
			editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
		} else {
			formatParagraph();
		}
	}

	return (
		<Dropdown className={`pr-2 text-base`} title={blockTypeToBlockName[blockType]} value={blockTypeToBlockName[blockType]}>
			<DropdownItem id={blockTypeToBlockName.paragraph} icon={<TextIcon />} text={blockTypeToBlockName.paragraph} onClick={formatParagraph}/>
			<DropdownItem id={blockTypeToBlockName.h1} icon={<Heading1 />} text={blockTypeToBlockName.h1} onClick={() => formatHeading('h1')}/>
			<DropdownItem id={blockTypeToBlockName.h2} icon={<Heading2 />} text={blockTypeToBlockName.h2} onClick={() => formatHeading('h2')}/>
			<DropdownItem id={blockTypeToBlockName.h3} icon={<Heading3 />} text={blockTypeToBlockName.h3} onClick={() => formatHeading('h3')}/>
			<DropdownItem id={blockTypeToBlockName.bullet} icon={<List />} text={blockTypeToBlockName.bullet} onClick={formatBulletList} />
			<DropdownItem id={blockTypeToBlockName.number} icon={<ListOrdered />} text={blockTypeToBlockName.number} onClick={formatOrderList} />
			<DropdownItem id={blockTypeToBlockName.check} icon={<ListTodo />} text={blockTypeToBlockName.check} onClick={formatCheckList} />
		</Dropdown>
	)
}

export default ParagraphDropdown
