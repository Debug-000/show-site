import DropDown, { DropDownItem } from "@/shared/components/toolbar/drop-down";
import { Divider, SvgIcon } from "@mui/material";
import TypeH3 from "../../icons/type-h3";
import TypeH2 from "../../icons/type-h2";
import TypeH1 from "../../icons/type-h1";
import TextParagraph from "../../icons/text-paragraph";
import {
    $createParagraphNode,
    $getSelection,
    $isRangeSelection,
    LexicalEditor,
} from 'lexical';
import {
    $setBlocksType,
} from '@lexical/selection';
import {
    $createHeadingNode,
    $createQuoteNode,
    HeadingTagType,
} from '@lexical/rich-text';
import {
    INSERT_CHECK_LIST_COMMAND,
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    ListNode,
} from '@lexical/list';
import {
    $createCodeNode,
} from '@lexical/code';
import ListUl from "../../icons/list-ul";
import ListOl from "../../icons/list-ol";
import SquareCheck from "../../icons/square-check";
import ChatSquareQuote from "../../icons/chat-square-quote";
import { Code } from "@mui/icons-material";

export const blockTypeToBlockName = {
    bullet: 'Bulleted List',
    check: 'Check List',
    code: 'Code Block',
    h1: 'Heading 1',
    h2: 'Heading 2',
    h3: 'Heading 3',
    h4: 'Heading 4',
    h5: 'Heading 5',
    h6: 'Heading 6',
    number: 'Numbered List',
    paragraph: 'Normal',
    quote: 'Quote',
};

export const rootTypeToRootName = {
    root: 'Root',
    table: 'Table',
};

export function BlockFormatDropDown({
    editor,
    blockType,
    rootType,
    disabled = false,
}: {
    blockType: keyof typeof blockTypeToBlockName;
    rootType: keyof typeof rootTypeToRootName;
    editor: LexicalEditor;
    disabled?: boolean;
}): JSX.Element {
    const formatParagraph = () => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createParagraphNode());
            }
        });
    };

    const formatHeading = (headingSize: HeadingTagType) => {
        if (blockType !== headingSize) {
            editor.update(() => {
                const selection = $getSelection();
                $setBlocksType(selection, () => $createHeadingNode(headingSize));
            });
        }
    };

    const formatBulletList = () => {
        if (blockType !== 'bullet') {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        } else {
            formatParagraph();
        }
    };

    const formatCheckList = () => {
        if (blockType !== 'check') {
            editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
        } else {
            formatParagraph();
        }
    };

    const formatNumberedList = () => {
        if (blockType !== 'number') {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        } else {
            formatParagraph();
        }
    };

    const formatQuote = () => {
        if (blockType !== 'quote') {
            editor.update(() => {
                const selection = $getSelection();
                $setBlocksType(selection, () => $createQuoteNode());
            });
        }
    };

    const formatCode = () => {
        if (blockType !== 'code') {
            editor.update(() => {
                let selection = $getSelection();

                if (selection !== null) {
                    if (selection.isCollapsed()) {
                        $setBlocksType(selection, () => $createCodeNode());
                    } else {
                        const textContent = selection.getTextContent();
                        const codeNode = $createCodeNode();
                        selection.insertNodes([codeNode]);
                        selection = $getSelection();
                        if ($isRangeSelection(selection)) {
                            selection.insertRawText(textContent);
                        }
                    }
                }
            });
        }
    };

    return (
        <DropDown
            disabled={disabled}
            //buttonClassName="toolbar-item block-controls"
            //buttonIconClassName={'icon block-type ' + blockType}
            buttonLabel={blockTypeToBlockName[blockType]}
            buttonAriaLabel="Formatting options for text style">
            <DropDownItem
                title="Normal"
                onClick={formatParagraph}
                icon={
                    <SvgIcon fontSize='small'>
                        <TextParagraph />
                    </SvgIcon>
                }>
            </DropDownItem>
            <DropDownItem
                title="Heading 1"
                onClick={() => formatHeading('h1')}
                icon={
                    <SvgIcon fontSize='small'>
                        <TypeH1 />
                    </SvgIcon>
                }>
            </DropDownItem>
            <DropDownItem
                title="Heading 2"
                onClick={() => formatHeading('h2')}
                icon={
                    <SvgIcon fontSize='small'>
                        <TypeH2 />
                    </SvgIcon>
                }>
            </DropDownItem>
            <DropDownItem
                title="Heading 3"
                onClick={() => formatHeading('h3')}
                icon={
                    <SvgIcon fontSize='small'>
                        <TypeH3 />
                    </SvgIcon>
                }>
            </DropDownItem>
            <Divider />
            <DropDownItem
                title="Bullet List"
                onClick={formatBulletList}
                icon={
                    <SvgIcon fontSize='small'>
                        <ListUl />
                    </SvgIcon>
                }>
            </DropDownItem>
            <DropDownItem
                title="Numbered List"
                onClick={formatNumberedList}
                icon={
                    <SvgIcon fontSize='small'>
                        <ListOl />
                    </SvgIcon>
                }>
            </DropDownItem>
            <DropDownItem
                title="Check List"
                onClick={formatCheckList}
                icon={
                    <SvgIcon fontSize='small'>
                        <SquareCheck />
                    </SvgIcon>
                }>
            </DropDownItem>
            <Divider />
            <DropDownItem
                title="Quote"
                onClick={formatQuote}
                icon={
                    <SvgIcon fontSize='small'>
                        <ChatSquareQuote />
                    </SvgIcon>
                }>
            </DropDownItem>
            <DropDownItem
                title="Code Block"
                onClick={formatCode}
                icon={
                    <SvgIcon fontSize='small'>
                        <Code />
                    </SvgIcon>
                }>
            </DropDownItem>
        </DropDown>
    );
}