import DropDown, { DropDownItem } from '@/shared/components/toolbar/drop-down';
import { Divider, SvgIcon } from '@mui/material';
import { $createParagraphNode, $getSelection, $isRangeSelection, $isTextNode, ElementFormatType, FORMAT_TEXT_COMMAND, INDENT_CONTENT_COMMAND, LexicalEditor, LexicalNode, OUTDENT_CONTENT_COMMAND } from 'lexical';
import TypeStrikethrough from '../../icons/type-strikethrough';
import TextAa from '../../icons/dropdown-more';
import { useCallback } from 'react';
import {
    $getNearestBlockElementAncestorOrThrow,
} from '@lexical/utils';
import {
    $isHeadingNode,
    $isQuoteNode,
} from '@lexical/rich-text';
import { $isDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';
import Trash from '../../icons/trash';

export function AdditionalFormatDropDown({
    editor,
    disabled = false,
}: {
    editor: LexicalEditor;
    disabled?: boolean;
}): JSX.Element {


    const clearFormatting = useCallback(() => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection) || $isRangeSelection(selection)) {
                const anchor = selection.anchor;
                const focus = selection.focus;
                const nodes = selection.getNodes();
                const extractedNodes = selection.extract();

                if (anchor.key === focus.key && anchor.offset === focus.offset) {
                    return;
                }

                nodes.forEach((node, idx) => {
                    // We split the first and last node by the selection
                    // So that we don't format unselected text inside those nodes
                    if ($isTextNode(node)) {
                        // Use a separate variable to ensure TS does not lose the refinement
                        let textNode = node;
                        if (idx === 0 && anchor.offset !== 0) {
                            textNode = textNode.splitText(anchor.offset)[1] || textNode;
                        }
                        if (idx === nodes.length - 1) {
                            textNode = textNode.splitText(focus.offset)[0] || textNode;
                        }
                        /**
                         * If the selected text has one format applied
                         * selecting a portion of the text, could
                         * clear the format to the wrong portion of the text.
                         *
                         * The cleared text is based on the length of the selected text.
                         */
                        // We need this in case the selected text only has one format
                        const extractedTextNode = extractedNodes[0];
                        if (nodes.length === 1 && $isTextNode(extractedTextNode)) {
                            textNode = extractedTextNode;
                        }

                        if (textNode.__style !== '') {
                            textNode.setStyle('');
                        }
                        if (textNode.__format !== 0) {
                            textNode.setFormat(0);
                            $getNearestBlockElementAncestorOrThrow(textNode).setFormat('');
                        }
                        node = textNode;
                    } else if ($isHeadingNode(node) || $isQuoteNode(node)) {
                        node.replace($createParagraphNode(), true);
                    } else if ($isDecoratorBlockNode(node)) {
                        node.setFormat('');
                    }
                });
            }
        });
    }, [editor]);




    return (
        <DropDown
            disabled={disabled}
            icon={
                <SvgIcon fontSize='small'>
                    <TextAa />
                </SvgIcon>
            }
            // buttonIconClassName={'icon block-type ' + blockType}
            // buttonLabel={elementFormatOptions[value]}
            buttonAriaLabel="Formatting options for text style">
            <DropDownItem
                // className={'item ' + dropDownActiveClass(blockType === 'paragraph')}
                title="Strikethrough"
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
                }}
                icon={
                    <SvgIcon fontSize='small'>
                        <TypeStrikethrough />
                    </SvgIcon>
                }>
            </DropDownItem>
            <DropDownItem
                // className={'item ' + dropDownActiveClass(blockType === 'paragraph')}
                title="Clear Formatting"
                onClick={clearFormatting}
                icon={
                    <SvgIcon fontSize='small'>
                        <Trash />
                    </SvgIcon>
                }>
            </DropDownItem>

        </DropDown>
    )
};

