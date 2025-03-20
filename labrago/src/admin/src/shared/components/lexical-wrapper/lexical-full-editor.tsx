"use client";

import { Box } from '@mui/material';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import './style/PlaygroundEditorTheme.css'
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { AsHTMLInputElementPlugin } from '@/shared/components/lexical-wrapper/plugins/AsHTMLInputElementPlugin';
import { OnChangePlugin } from '@/shared/components/lexical-wrapper/plugins/OnChangePlugin';
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { ListNode, ListItemNode } from "@lexical/list";
import CodeHighlightPlugin from '@/shared/components/lexical-wrapper/plugins/CodeHighlightPlugin';
import { CheckListPlugin } from '@/shared/components/lexical-wrapper/plugins/LexicalCheckListPlugin';
import ExampleTheme, { EditorContainer } from './style/ExampleTheme';
import ToolbarPlugin from './plugins/Toolbar/ToolbarPlugin';
import LexicalAutoLinkPlugin from './plugins/AutoLinkPlugin';

interface RichTextInputProps{
    id?: string;
    value?: string;
    onChange?: (jsonValue: string) => void;
    placeholder?: string;
    htmlInputElementRef?: React.RefObject<HTMLInputElement>;
}

export const LexicalFullEditor = forwardRef((props: RichTextInputProps, ref) => {

    const { id, value, onChange, placeholder, htmlInputElementRef } = props;

    const editorConfig = {
        namespace: 'React.js Demo',
        nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            AutoLinkNode,
            LinkNode,
            // TableNode,
            // TableCellNode,
            // TableRowNode,
            // AutoLinkNode,
            // LinkNode
          ],
        // Handling of errors during update
        onError(error: Error) {
            throw error;
        },
        // The editor theme
        theme: ExampleTheme,
    };


    return (
        <LexicalComposer
        initialConfig={editorConfig}>

        <EditorContainer id={id}>
            <ToolbarPlugin />

            <div className="">
                <RichTextPlugin

                    contentEditable={
                        <Box className="editor">
                            
                            <ContentEditable
                                className='ContentEditable__root'
                                aria-placeholder={placeholder ?? ''}
                                placeholder={
                                    <div className='ContentEditable__placeholder'>
                                    {placeholder}
                                    </div>
                                }
                                />
                        </Box> 
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
                
                <CodeHighlightPlugin />
                <ListPlugin />
                <CheckListPlugin />
                <HistoryPlugin />
                <LexicalAutoLinkPlugin />
                <OnChangePlugin value={value} onChange={(e) => {
                    onChange?.(e)
                }} />
                <AsHTMLInputElementPlugin ref={htmlInputElementRef} />
                {/* <AutoFocusPlugin /> */}

            </div>
        </EditorContainer>
    </LexicalComposer>
    )
});

LexicalFullEditor.displayName = 'LexicalFullEditor';