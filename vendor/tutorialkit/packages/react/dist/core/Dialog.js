import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as RadixDialog from '@radix-ui/react-dialog';
import { createContext, useContext } from 'react';
import { Button } from '../Button.js';
const context = createContext(Dialog);
export const DialogProvider = context.Provider;
export function useDialog() {
    return useContext(context);
}
export default function Dialog({ title, confirmText, onClose, children }) {
    return (_jsx(RadixDialog.Root, { open: true, onOpenChange: (open) => !open && onClose(), children: _jsxs(RadixDialog.Portal, { children: [_jsx(RadixDialog.Overlay, { className: "fixed z-11 inset-0 opacity-50 bg-black" }), _jsx(RadixDialog.Content, { className: "fixed z-11 top-50% left-50% transform-translate--50% w-90vw max-w-450px max-h-85vh rounded-xl text-tk-text-primary bg-tk-background-primary", children: _jsxs("div", { className: "relative p-10", children: [_jsx(RadixDialog.Title, { className: "text-6", children: title }), _jsx("div", { className: "my-4", children: children }), _jsx(RadixDialog.Close, { asChild: true, children: _jsx(Button, { className: "min-w-20 justify-center", children: confirmText }) })] }) })] }) }));
}
