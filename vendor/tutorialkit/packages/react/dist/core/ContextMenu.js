import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Root, Portal, Content, Item, Trigger } from '@radix-ui/react-context-menu';
import { DEFAULT_LOCALIZATION } from '@tutorialkit/types';
import picomatch from 'picomatch/posix';
import { useRef, useState } from 'react';
import { classNames } from '../utils/classnames.js';
import { useDialog } from './Dialog.js';
export function ContextMenu({ onFileChange, allowEditPatterns, directory, i18n, position = 'before', children, triggerProps, ...props }) {
    const [state, setState] = useState('idle');
    const inputRef = useRef(null);
    const Dialog = useDialog();
    if (!allowEditPatterns?.length) {
        return children;
    }
    async function onFileNameEnd(event) {
        if (state !== 'add_file' && state !== 'add_folder') {
            return;
        }
        const name = event.currentTarget.value;
        if (name) {
            const value = `${directory}/${name}`;
            const isAllowed = picomatch.isMatch(value, allowEditPatterns);
            if (!isAllowed) {
                return setState('add_failed_not_allowed');
            }
            try {
                await onFileChange?.({
                    value,
                    type: state === 'add_file' ? 'file' : 'folder',
                    method: 'add',
                });
            }
            catch (error) {
                const message = error?.message;
                if (message === 'FILE_EXISTS' || message === 'FOLDER_EXISTS') {
                    return setState('add_failed_exists');
                }
            }
        }
        setState('idle');
    }
    function onFileNameKeyPress(event) {
        if (event.key === 'Enter' && event.currentTarget.value !== '') {
            onFileNameEnd(event);
        }
    }
    function onCloseAutoFocus(event) {
        if ((state === 'add_file' || state === 'add_folder') && inputRef.current) {
            event.preventDefault();
            inputRef.current.focus();
        }
    }
    const element = (_jsx(Trigger, { asChild: true, children: _jsx("div", { ...triggerProps, children: children }) }));
    return (_jsxs(Root, { children: [position === 'before' && element, state !== 'idle' && (_jsxs("div", { className: "flex items-center gap-2 border-2 border-solid border-transparent", ...props, children: [_jsx("div", { className: `scale-120 shrink-0 ${state === 'add_file' ? 'i-ph-file-duotone' : 'i-ph-folder-duotone'}` }), _jsx("input", { ref: inputRef, autoFocus: true, type: "text", onBlur: onFileNameEnd, onKeyUp: onFileNameKeyPress, className: "text-current bg-transparent w-20 outline-var(--tk-border-accent)" })] })), position === 'after' && element, _jsx(Portal, { children: _jsxs(Content, { onCloseAutoFocus: onCloseAutoFocus, className: "border border-tk-border-brighter b-rounded-md bg-tk-background-brighter py-2", children: [_jsx(MenuItem, { icon: "i-ph-file-plus", onClick: () => setState('add_file'), children: i18n?.fileTreeCreateFileText || DEFAULT_LOCALIZATION.fileTreeCreateFileText }), _jsx(MenuItem, { icon: "i-ph-folder-plus", onClick: () => setState('add_folder'), children: i18n?.fileTreeCreateFolderText || DEFAULT_LOCALIZATION.fileTreeCreateFolderText })] }) }), (state === 'add_failed_not_allowed' || state === 'add_failed_exists') && (_jsx(Dialog, { title: i18n?.fileTreeActionNotAllowedText || DEFAULT_LOCALIZATION.fileTreeActionNotAllowedText, confirmText: i18n?.confirmationText || DEFAULT_LOCALIZATION.confirmationText, onClose: () => setState('idle'), children: state === 'add_failed_not_allowed' ? (_jsxs(_Fragment, { children: [i18n?.fileTreeAllowedPatternsText || DEFAULT_LOCALIZATION.fileTreeAllowedPatternsText, _jsx(AllowPatternsList, { allowEditPatterns: allowEditPatterns })] })) : (_jsx(_Fragment, { children: i18n?.fileTreeFileExistsAlreadyText || DEFAULT_LOCALIZATION.fileTreeFileExistsAlreadyText })) }))] }));
}
function MenuItem({ icon, children, ...props }) {
    return (_jsxs(Item, { ...props, className: "flex items-center gap-2 px-4 py-1 text-sm cursor-pointer ws-nowrap text-tk-elements-fileTree-folder-textColor hover:bg-tk-elements-fileTree-file-backgroundColorHover", children: [_jsx("span", { className: `${icon} scale-120 shrink-0` }), _jsx("span", { children: children })] }));
}
function AllowPatternsList({ allowEditPatterns }) {
    return (_jsx("ul", { className: classNames('mt-2', allowEditPatterns.length > 1 && 'list-disc ml-4'), children: allowEditPatterns.map((pattern) => (_jsx("li", { className: "mb-1", children: _jsx("code", { children: pattern }) }, pattern))) }));
}
