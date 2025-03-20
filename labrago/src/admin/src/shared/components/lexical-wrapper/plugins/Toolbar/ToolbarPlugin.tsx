/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Box, Button, Divider, Stack, styled, SvgIcon, TextField } from '@mui/material';

import {
    $isCodeNode,
    CODE_LANGUAGE_MAP,
} from '@lexical/code';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import {
    $getNodeByKey,
    $getSelection,
    $isElementNode,
    $isRangeSelection,
    $isRootOrShadowRoot,
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    COMMAND_PRIORITY_CRITICAL,
    ElementFormatType,
    FORMAT_TEXT_COMMAND,
    NodeKey,
    SELECTION_CHANGE_COMMAND,
} from 'lexical';
import {
    $isListNode,
    ListNode,
} from '@lexical/list';
import {
    $isHeadingNode,
} from '@lexical/rich-text';
import {
    $getSelectionStyleValueForProperty
} from '@lexical/selection';
import { $isTableNode, $isTableSelection } from '@lexical/table';
import {
    $findMatchingParent,
    $getNearestNodeOfType,
    mergeRegister,
} from '@lexical/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ToolbarBtn } from '@/shared/components/toolbar/styles';
import { getSelectedNode } from '../../utils/getSelectedNode';
import TypeBold from '../../icons/type-bold';
import TypeItalic from '../../icons/type-italic';
import TypeUnderline from '../../icons/type-underline';
import TypeStrikethrough from '../../icons/type-strikethrough';
import { BlockFormatDropDown, blockTypeToBlockName, rootTypeToRootName } from './BlockFormatDropDown';
import { BlockAlignDropDown } from './BlockAlignDropDown';
import { AdditionalFormatDropDown } from './AdditionalFormatDropDown';
import { FontSizeOptions } from './FontSizeDropDown';

const LowPriority = 1;



// function dropDownActiveClass(active: boolean) {
//     if (active) {
//         return 'active dropdown-item-active';
//     } else {
//         return '';
//     }
// }





export default function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();
    const [activeEditor, setActiveEditor] = useState(editor);
    const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null);
    const toolbarRef = useRef(null);

    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [fontSize, setFontSize] = useState<string>('15px');
    const [blockType, setBlockType] = useState<keyof typeof blockTypeToBlockName>('paragraph');
    const [rootType, setRootType] = useState<keyof typeof rootTypeToRootName>('root');
    const [isEditable, setIsEditable] = useState(() => editor.isEditable());
    const [codeLanguage, setCodeLanguage] = useState<string>('');
    const [elementFormat, setElementFormat] = useState<ElementFormatType>('left');
    const [isLink, setIsLink] = useState(false);

    const $updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {


            const anchorNode = selection.anchor.getNode();
            let element = anchorNode.getKey() === 'root'
                ? anchorNode
                : $findMatchingParent(anchorNode, (e) => {
                    const parent = e.getParent();
                    return parent !== null && $isRootOrShadowRoot(parent);
                });

            if (element === null) {
                element = anchorNode.getTopLevelElementOrThrow();
            }

            const elementKey = element.getKey();
            const elementDOM = activeEditor.getElementByKey(elementKey);
            if (elementDOM !== null) {
                setSelectedElementKey(elementKey);
                if ($isListNode(element)) {
                    const parentList = $getNearestNodeOfType<ListNode>(
                        anchorNode,
                        ListNode,
                    );
                    const type = parentList
                        ? parentList.getListType()
                        : element.getListType();
                    setBlockType(type);
                } else {
                    const type = $isHeadingNode(element)
                        ? element.getTag()
                        : element.getType();
                    if (type in blockTypeToBlockName) {
                        setBlockType(type as keyof typeof blockTypeToBlockName);
                    }
                    if ($isCodeNode(element)) {
                        const language =
                            element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
                        setCodeLanguage(
                            language ? CODE_LANGUAGE_MAP[language] || language : '',
                        );
                        return;
                    }
                }
            }

            // Update links
            const node = getSelectedNode(selection);
            const parent = node.getParent();
            if ($isLinkNode(parent) || $isLinkNode(node)) {
                setIsLink(true);
            } else {
                setIsLink(false);
            }

            const tableNode = $findMatchingParent(node, $isTableNode);
            if ($isTableNode(tableNode)) {
                setRootType('table');
            } else {
                setRootType('root');
            }

            if ($isRangeSelection(selection) || $isTableSelection(selection)) {
                // Update text format
                setIsBold(selection.hasFormat('bold'));
                setIsItalic(selection.hasFormat('italic'));
                setIsUnderline(selection.hasFormat('underline'));
                setIsStrikethrough(selection.hasFormat('strikethrough'));

                setFontSize(
                    $getSelectionStyleValueForProperty(selection, 'font-size', '15px'),
                );
            }

            let matchingParent;
            if ($isLinkNode(parent)) {
                // If node is a link, we need to fetch the parent paragraph node to set format
                matchingParent = $findMatchingParent(
                    node,
                    (parentNode) => $isElementNode(parentNode) && !parentNode.isInline(),
                );
            }

            // If matchingParent is a valid node, pass it's format type
            setElementFormat(
                $isElementNode(matchingParent)
                    ? matchingParent.getFormatType()
                    : $isElementNode(node)
                        ? node.getFormatType()
                        : parent?.getFormatType() || 'left',
            );
        }
    }, []);

    useEffect(() => {
        return editor.registerCommand(SELECTION_CHANGE_COMMAND,
            (_payload, newEditor) => {
                setActiveEditor(newEditor);
                $updateToolbar();
                return false;
            }, COMMAND_PRIORITY_CRITICAL);
    }, [editor, $updateToolbar]);

    useEffect(() => {
        activeEditor.getEditorState().read(() => {
            $updateToolbar();
        });
    }, [activeEditor, $updateToolbar]);

    useEffect(() => {
        return mergeRegister(
            editor.registerEditableListener((editable) => {
                setIsEditable(editable);
            }),

            activeEditor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    $updateToolbar();
                });
            }),

            activeEditor.registerCommand(
                CAN_UNDO_COMMAND,
                (payload) => {
                    setCanUndo(payload);
                    return false;
                },
                COMMAND_PRIORITY_CRITICAL,
            ),
            activeEditor.registerCommand(
                CAN_REDO_COMMAND,
                (payload) => {
                    setCanRedo(payload);
                    return false;
                },
                COMMAND_PRIORITY_CRITICAL,
            ),
        );
    }, [$updateToolbar, activeEditor, editor]);

    const onCodeLanguageSelect = useCallback((value: string) => {
        activeEditor.update(() => {
            if (selectedElementKey !== null) {
                const node = $getNodeByKey(selectedElementKey);
                if ($isCodeNode(node)) {
                    node.setLanguage(value);
                }
            }
        });
    }, [activeEditor, selectedElementKey]);

    return (
        <Box
            sx={{
                overflowX: 'auto'
            }}>
            <Stack direction="row" ref={toolbarRef} alignItems="center" gap={1}>
                {/* <ToolbarBtn
                    type="button"
                    disabled={!canUndo}
                    onClick={() => {
                        activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
                    }}
                    aria-label="Undo">
                    <UndoIcon />
                </ToolbarBtn>
                <ToolbarBtn
                    type="button"
                    disabled={!canRedo}
                    onClick={() => {
                        activeEditor.dispatchCommand(REDO_COMMAND, undefined);
                    }}
                    aria-label="Redo">
                    <RedoIcon />
                </ToolbarBtn>
                <Divider orientation="vertical" flexItem /> */}
                {blockType in blockTypeToBlockName && activeEditor === editor && (
                    <>
                        <BlockFormatDropDown
                            disabled={!isEditable}
                            blockType={blockType}
                            rootType={rootType}
                            editor={activeEditor}
                        />
                        <Divider orientation="vertical" flexItem />
                    </>
                )}


                <FontSizeOptions
                    selectionFontSize={fontSize.slice(0, -2)}
                    editor={activeEditor}
                    disabled={!isEditable} />

                <ToolbarBtn
                    type="button"
                    onClick={() => {
                        activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
                    }}
                    className={(isBold ? 'active' : '')}
                    aria-label="Format Bold">
                    <SvgIcon fontSize='small'>
                        <TypeBold />
                    </SvgIcon>
                </ToolbarBtn>
                <ToolbarBtn
                    type="button"
                    onClick={() => {
                        activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
                    }}
                    className={(isItalic ? 'active' : '')}
                    aria-label="Format Italics">
                    <SvgIcon fontSize='small'>
                        <TypeItalic />
                    </SvgIcon>
                </ToolbarBtn>
                <ToolbarBtn
                    type="button"
                    onClick={() => {
                        activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
                    }}
                    className={(isUnderline ? 'active' : '')}
                    aria-label="Format Underline">
                    <SvgIcon fontSize='small'>
                        <TypeUnderline />
                    </SvgIcon>
                </ToolbarBtn>
                <Divider orientation="vertical" flexItem />
                <AdditionalFormatDropDown
                    disabled={!isEditable}
                    editor={activeEditor}
                />
                <Divider orientation="vertical" flexItem />
                <BlockAlignDropDown
                    disabled={!isEditable}
                    value={elementFormat}
                    // blockType={blockType}
                    // rootType`={rootType}
                    editor={activeEditor}
                />
            </Stack>

            <Divider />
        </Box>
    );
}