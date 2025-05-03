import type { I18n } from '@tutorialkit/types';
import { type ComponentProps } from 'react';
import { type EditorDocument, type OnChangeCallback as OnEditorChange, type OnScrollCallback as OnEditorScroll } from '../core/CodeMirrorEditor/index.js';
import { FileTree } from '../core/FileTree.js';
import type { Theme } from '../core/types.js';
interface Props {
    theme: Theme;
    id: unknown;
    files: ComponentProps<typeof FileTree>['files'];
    i18n: I18n;
    hideRoot?: boolean;
    fileTreeScope?: string;
    showFileTree?: boolean;
    helpAction?: 'solve' | 'reset';
    editorDocument?: EditorDocument;
    selectedFile?: string | undefined;
    allowEditPatterns?: ComponentProps<typeof FileTree>['allowEditPatterns'];
    onEditorChange?: OnEditorChange;
    onEditorScroll?: OnEditorScroll;
    onHelpClick?: () => void;
    onFileSelect?: (value?: string) => void;
    onFileTreeChange?: ComponentProps<typeof FileTree>['onFileChange'];
}
export declare function EditorPanel({ theme, id, files, i18n, hideRoot, fileTreeScope, showFileTree, helpAction, editorDocument, selectedFile, allowEditPatterns, onEditorChange, onEditorScroll, onHelpClick, onFileSelect, onFileTreeChange, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
