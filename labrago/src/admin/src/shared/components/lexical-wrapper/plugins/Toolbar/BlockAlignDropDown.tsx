import DropDown, { DropDownItem } from '@/shared/components/toolbar/drop-down';
import { Divider, SvgIcon } from '@mui/material';
import { ElementFormatType, FORMAT_ELEMENT_COMMAND, INDENT_CONTENT_COMMAND, LexicalEditor, OUTDENT_CONTENT_COMMAND } from 'lexical';
import TextLeft from '../../icons/text-left';
import TextCenter from '../../icons/text-center';
import TextRight from '../../icons/text-right';
import Justify from '../../icons/justify';
import Indent from '../../icons/indent';
import Outdent from '../../icons/outdent';

export const elementFormatOptions = {
    left: 'Left Align',
    center: 'Center Align',
    right: 'Right Align',
    justify: 'Justify Align',
    start: 'Start',
    end: 'End',
    '': 'Left'
};

export function BlockAlignDropDown({
    editor,
    value,
    disabled = false,
}: {
    value: ElementFormatType;
    editor: LexicalEditor;
    disabled?: boolean;
}): JSX.Element {

    return (
        <DropDown
            disabled={disabled}
            //buttonClassName="toolbar-item block-controls"
            // buttonIconClassName={'icon block-type ' + blockType}
            buttonLabel={elementFormatOptions[value]}
            buttonAriaLabel="Formatting options for text style">
            <DropDownItem
                // className={'item ' + dropDownActiveClass(blockType === 'paragraph')}
                title="Left Align"
                onClick={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
                }}
                icon={
                    <SvgIcon fontSize='small'>
                        <TextLeft />
                    </SvgIcon>
                }>
            </DropDownItem>
            <DropDownItem
                // className={'item ' + dropDownActiveClass(blockType === 'paragraph')}
                title="Center Align"
                onClick={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
                }}
                icon={  
                    <SvgIcon fontSize='small'>
                        <TextCenter />
                    </SvgIcon>
                }>
            </DropDownItem>
            <DropDownItem
                // className={'item ' + dropDownActiveClass(blockType === 'paragraph')}
                title="Right Align"
                onClick={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
                }}
                icon={  
                    <SvgIcon fontSize='small'>
                        <TextRight />
                    </SvgIcon>
                }>
            </DropDownItem>
            <DropDownItem
                // className={'item ' + dropDownActiveClass(blockType === 'paragraph')}
                title="Justify Align"
                onClick={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
                }}
                icon={  
                    <SvgIcon fontSize='small'>
                        <Justify />
                    </SvgIcon>
                }>
            </DropDownItem>
            <Divider />
            <DropDownItem
                title="Start Align"
                onClick={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'start');
                }}
                icon={  
                    <SvgIcon fontSize='small'>
                        <TextLeft />
                    </SvgIcon>
                }>
            </DropDownItem>
            <DropDownItem
                title="End Align"
                onClick={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'end');
                }}
                icon={  
                    <SvgIcon fontSize='small'>
                        <TextRight />
                    </SvgIcon>
                }>
            </DropDownItem>
            <Divider />
            <DropDownItem
                title="Indent"
                onClick={() => {
                    editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
                }}
                icon={  
                    <SvgIcon fontSize='small'>
                        <Indent />
                    </SvgIcon>
                }>
            </DropDownItem>
            <DropDownItem
                title="Outdent"
                onClick={() => {
                    editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
                }}
                icon={  
                    <SvgIcon fontSize='small'>
                        <Outdent />
                    </SvgIcon>
                }>
            </DropDownItem>
        </DropDown>
        
    )
};