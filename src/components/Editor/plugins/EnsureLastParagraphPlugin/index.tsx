// 确保永远有最后一段（自动添加最后一段）
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {useEffect, useRef} from "react";
import {
	$createParagraphNode,
	$getRoot,
	$getSelection,
	$isRangeSelection,

} from "lexical";

function EnsureLastParagraphPlugin(){
	const [editor] = useLexicalComposerContext();
	const hasInsertedRef = useRef<boolean>(false); // 标志，防止多次插入

	useEffect(() => {
		return editor.registerUpdateListener(({ editorState }) => {
			editorState.read(() => {
				const selection = $getSelection();
				if (!$isRangeSelection(selection)) {
					return;
				}

				const root = $getRoot();
				const children = root.getChildren();

				if (children.length === 0) {
					return;
				}

				const lastNode = children[children.length - 1];
				const lastNodeKey = lastNode.getKey();

				const anchorKey = selection.anchor.key;

				if (anchorKey === lastNodeKey) {
					// 当用户选择了最后一段，插入新段落
					if (!hasInsertedRef.current) {
						editor.update(() => {
							const root = $getRoot();
							const newParagraph = $createParagraphNode();
							root.append(newParagraph);
						});
						hasInsertedRef.current = true;
					}
				} else {
					// 用户离开最后一段，重置标志
					hasInsertedRef.current = false;
				}
			});
		});
	}, [editor]);
	return null
}

export default EnsureLastParagraphPlugin
