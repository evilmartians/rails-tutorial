import { EditorSelection } from '@codemirror/state';
import type { Theme } from '../types.js';
export interface EditorDocument {
    value: string | Uint8Array;
    loading: boolean;
    filePath: string;
    scroll?: ScrollPosition;
}
export interface EditorSettings {
    fontSize?: string;
    tabSize?: number;
}
export interface ScrollPosition {
    top: number;
    left: number;
}
export interface EditorUpdate {
    selection: EditorSelection;
    content: string;
}
export type OnChangeCallback = (update: EditorUpdate) => void;
export type OnScrollCallback = (position: ScrollPosition) => void;
interface Props {
    theme: Theme;
    id?: unknown;
    doc?: EditorDocument;
    debounceChange?: number;
    debounceScroll?: number;
    autoFocusOnDocumentChange?: boolean;
    onChange?: OnChangeCallback;
    onScroll?: OnScrollCallback;
    className?: string;
    settings?: EditorSettings;
}
export declare function CodeMirrorEditor({ id, doc, debounceScroll, debounceChange, autoFocusOnDocumentChange, onScroll, onChange, theme, settings, className, }: Props): import("react/jsx-runtime").JSX.Element;
export declare namespace CodeMirrorEditor {
    var displayName: string;
}
export default CodeMirrorEditor;
