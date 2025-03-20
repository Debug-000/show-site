import { Autocomplete, FilterOptionsState, Popper, TextField } from "@mui/material";
import {
    $createParagraphNode,
    $getSelection,
    $isRangeSelection,
    LexicalEditor,
} from 'lexical';
import { $patchStyleText } from '@lexical/selection';
import { useCallback, useEffect, useState } from "react";
import { PopperProps } from "@mui/material/Popper/BasePopper.types";

const DEFAULT_FONT_SIZE = 15;

const options = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];

const CustomPopper = (props: PopperProps) => {
    return (
        <Popper
            {...props}
            style={{
                width: '70px', // Adjust the width as needed
            }}
            placement="bottom-end"
        />
    );
};

export const FontSizeOptions = ({
    selectionFontSize,
    disabled,
    editor,
}: {
    selectionFontSize: string;
    disabled: boolean;
    editor: LexicalEditor;
}) => {

    const [inputValue, setInputValue] = useState<string>(selectionFontSize);

    const updateFontSizeInSelection = useCallback((newFontSize: number | null) => {

        editor.update(() => {
            if (editor.isEditable()) {
                const selection = $getSelection();
                if (selection !== null) {
                    $patchStyleText(selection, {
                        'font-size': `${newFontSize || DEFAULT_FONT_SIZE}px`,
                    });
                }
            }
        });
    }, [editor]);

    useEffect(() => {
        setInputValue(selectionFontSize);
    }, [selectionFontSize]);

    // Custom filter function to show all options
    const filterOptions = (options: string[], state: FilterOptionsState<string>) => {
        return options;
    };

    return (
        <Autocomplete
            freeSolo
            disableClearable
            options={options.map((option) => option.toString())}
            inputValue={inputValue}
            onChange={(e, newValue) => {
                updateFontSizeInSelection(+newValue)
            }}
            filterOptions={filterOptions}
            PopperComponent={CustomPopper}
            renderInput={(params) => (
                <TextField
                    {...params}
                    type="number"
                    value={inputValue}
                    InputProps={{
                        ...params.InputProps,
                        inputMode: 'numeric'

                    }}
                    inputProps={{
                        ...params.inputProps,
                        sx: {
                            padding: 0, // Remove padding from the Input
                        },
                    }}
                    sx={{
                        '& .MuiInputBase-root': {
                            padding: "0 0 0 10px", // Remove padding from the Input
                        },
                    }}
                />
            )}
            sx={{
                width: 50,
                padding: 0
            }}
        />
    )
}