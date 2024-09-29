import Dropdown from "@/components/Dropdown";
import {$getSelection, LexicalEditor} from "lexical";
import {useCallback} from "react";
import { $patchStyleText } from '@lexical/selection';
import DropdownItem from "@/components/Dropdown/DropdownItem";
import ColorBlock from "@/components/ColorBlock";
import {colorTypes} from "@/components/Editor/types.ts";

interface ColorPickerDropdownProps {
	activeEditor: LexicalEditor
	colorValue: string
}

function FontColorPickerDropdown({activeEditor, colorValue}: ColorPickerDropdownProps){
	const applyStyleText = useCallback(
		(styles: Record<string, string>) => {
			activeEditor.update(
				() => {
					const selection = $getSelection();
					if (selection !== null) {
						$patchStyleText(selection, styles);

					}
				}
			);
		},
		[activeEditor],
	);

	const handleFontColorSelect = useCallback(
		(value: string) => {
			applyStyleText({color: value});
		},
		[applyStyleText],
	)

	return (
		<Dropdown showToggleIcon={false} className={`pr-2 text-base`} value={colorValue} title={<ColorBlock color={colorTypes.White}><b style={{color: colorValue}}>A</b></ColorBlock>}>
			{
				Object.entries(colorTypes).map(([colorName, colorValue], key) => (
					<DropdownItem
						key={key}
						icon={<ColorBlock color={colorTypes.White}><b style={{color: colorValue}}>A</b></ColorBlock>}
						id={colorValue}
						text={colorName}
						onClick={() => handleFontColorSelect(colorValue)}
					/>
				))
			}
		</Dropdown>
	)
}

export default FontColorPickerDropdown
