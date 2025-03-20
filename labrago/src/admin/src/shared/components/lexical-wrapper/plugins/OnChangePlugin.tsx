import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { StepperClassKey } from "@mui/material";
import { useEffect } from "react";
import {
    $getRoot,
} from 'lexical';

interface OnChangePluginProps {
    value?: string;
    onChange: (jsonValue: string) => void;
}
export const OnChangePlugin = (props: OnChangePluginProps) => {
    const { value, onChange } = props;
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {

            const value = editorState.toJSON();

            const editorStateTextString = editorState.read(() => $getRoot().getTextContent());

            const valueWithRawText = {
                ...value,
                rawText: editorStateTextString
            }
            onChange(JSON.stringify(valueWithRawText));
        });
    }, [editor, onChange]);

    useEffect(() => {
        editor.update(() => {

            if (!value) {
                return;
            }

            if (value == JSON.stringify(editor.getEditorState().toJSON())) {
                return;
            }

            var editorState = editor.parseEditorState(JSON.parse(value));
            editor.setEditorState(editorState);
        });
    }, [editor, value]);

    return null;
}