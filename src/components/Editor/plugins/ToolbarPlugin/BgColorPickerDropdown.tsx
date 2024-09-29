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

function BgColorPickerDropdown({activeEditor, colorValue}: ColorPickerDropdownProps){

	const applyStyleBackground = useCallback(
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

	const handleBgColorSelect = useCallback(
		(value: string) => {
			applyStyleBackground({'background-color': value});
		},
		[applyStyleBackground],
	)

	return (
		<Dropdown showToggleIcon={false} className={`pr-2 text-base`} value={colorValue} title={<ColorBlock color={colorValue}/>}>
			{
				Object.entries(colorTypes).map(([colorName, colorValue], key) => (
					<DropdownItem
						key={key}
						icon={<ColorBlock color={colorValue}/>}
						id={colorValue}
						text={colorName}
						onClick={() => handleBgColorSelect(colorValue)}
					/>
				))
			}
		</Dropdown>
	)
}

export default BgColorPickerDropdown
