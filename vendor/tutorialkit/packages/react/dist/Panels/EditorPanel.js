import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { CodeMirrorEditor, } from '../core/CodeMirrorEditor/index.js';
import { FileTree } from '../core/FileTree.js';
import resizePanelStyles from '../styles/resize-panel.module.css';
import { isMobile } from '../utils/mobile.js';
const DEFAULT_FILE_TREE_SIZE = 25;
export function EditorPanel({ theme, id, files, i18n, hideRoot, fileTreeScope, showFileTree = true, helpAction, editorDocument, selectedFile, allowEditPatterns, onEditorChange, onEditorScroll, onHelpClick, onFileSelect, onFileTreeChange, }) {
    const fileTreePanelRef = useRef(null);
    useEffect(() => {
        const { current: fileTreePanel } = fileTreePanelRef;
        if (!fileTreePanel) {
            return;
        }
        if (showFileTree) {
            if (fileTreePanel.isCollapsed()) {
                fileTreePanel.resize(DEFAULT_FILE_TREE_SIZE);
            }
        }
        else if (!showFileTree) {
            fileTreePanel.collapse();
        }
    }, [id]);
    return (_jsxs(PanelGroup, { className: "bg-tk-elements-panel-backgroundColor", direction: "horizontal", children: [_jsxs(Panel, { className: "flex flex-col", collapsible: true, defaultSize: 0, minSize: 10, ref: fileTreePanelRef, children: [_jsx("div", { className: "panel-header border-r border-b border-tk-elements-app-borderColor", children: _jsxs("div", { className: "panel-title", children: [_jsx("div", { className: "panel-icon i-ph-tree-structure-duotone shrink-0" }), _jsx("span", { className: "text-sm", children: i18n.filesTitleText })] }) }), _jsx(FileTree, { className: "flex flex-col flex-grow py-2 border-r border-tk-elements-app-borderColor text-sm overflow-y-auto overflow-x-hidden", i18n: i18n, selectedFile: selectedFile, hideRoot: hideRoot ?? true, files: files, scope: fileTreeScope, allowEditPatterns: allowEditPatterns, onFileSelect: onFileSelect, onFileChange: onFileTreeChange })] }), _jsx(PanelResizeHandle, { disabled: !showFileTree, className: resizePanelStyles.PanelResizeHandle, hitAreaMargins: { fine: 8, coarse: 8 } }), _jsxs(Panel, { className: "flex flex-col", defaultSize: 100, minSize: 10, children: [_jsx(FileTab, { i18n: i18n, editorDocument: editorDocument, onHelpClick: onHelpClick, helpAction: helpAction }), _jsx("div", { className: "h-full flex-1 overflow-hidden", children: _jsx(CodeMirrorEditor, { className: "h-full", theme: theme, id: id, doc: editorDocument, autoFocusOnDocumentChange: !isMobile(), onScroll: onEditorScroll, onChange: onEditorChange }) })] })] }));
}
function FileTab({ i18n, editorDocument, helpAction, onHelpClick }) {
    const filePath = editorDocument?.filePath;
    const fileName = filePath?.split('/').at(-1) ?? '';
    const icon = fileName ? getFileIcon(fileName) : '';
    return (_jsxs("div", { className: "panel-header border-b border-tk-elements-app-borderColor flex justify-between", children: [_jsxs("div", { className: "panel-title", children: [_jsx("div", { className: `panel-icon scale-125 ${icon}` }), _jsx("span", { className: "text-sm", children: fileName })] }), !!helpAction && (_jsxs("button", { onClick: onHelpClick, disabled: !onHelpClick, className: "panel-button px-2 py-0.5 -mr-1 -my-1", children: [helpAction === 'solve' && _jsx("div", { className: "i-ph-lightbulb-duotone text-lg" }), helpAction === 'solve' && i18n.solveButtonText, helpAction === 'reset' && _jsx("div", { className: "i-ph-clock-counter-clockwise-duotone" }), helpAction === 'reset' && i18n.resetButtonText] }))] }));
}
function getFileIcon(fileName) {
    const extension = fileName.split('.').at(-1);
    if (!extension) {
        console.error('Cannot infer file type');
        return null;
    }
    switch (extension) {
        case 'ts': {
            return 'i-languages-ts?mask';
        }
        case 'cjs':
        case 'mjs':
        case 'js': {
            return 'i-languages-js?mask';
        }
        case 'html': {
            return 'i-languages-html?mask';
        }
        case 'css': {
            return 'i-languages-css?mask';
        }
        case 'scss':
        case 'sass': {
            return 'i-languages-sass?mask';
        }
        case 'md': {
            return 'i-languages-markdown?mask';
        }
        case 'json': {
            return 'i-languages-json?mask';
        }
        case 'gif':
        case 'jpg':
        case 'jpeg':
        case 'png': {
            return 'i-ph-image';
        }
        default: {
            return null;
        }
    }
}
