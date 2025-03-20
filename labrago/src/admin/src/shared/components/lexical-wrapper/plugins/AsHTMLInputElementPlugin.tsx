import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { forwardRef, useEffect, useImperativeHandle } from "react";

export const AsHTMLInputElementPlugin = forwardRef((props, ref) => {


    const [editor] = useLexicalComposerContext();

    // Expose HTMLInputElement properties and methods
    useImperativeHandle(ref, () => ({
        focus: () => {
            return editor.focus()
        },
        blur: () => editor.blur(),
        // select: () => inputRef.current.select(),
        // setCustomValidity: (message) => inputRef.current.setCustomValidity(message),
        // reportValidity: () => inputRef.current.reportValidity(),
        get value() {
            return ""; //inputRef.current.value;
        },
        set value(val) {
            //inputRef.current.value = val;
        },
        get validity() {
            return true;
            //return inputRef.current.validity;
        },
        // Add more methods as needed to fulfill the HTMLInputElement interface
    }));


    // useEffect(() => {
    //     if (ref) {
    //         ref.current = editor;
    //     }
    // }, [ref, editor]);

    return <div />;
})

AsHTMLInputElementPlugin.displayName = 'AsHTMLInputElementPlugin';