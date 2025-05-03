import { type ReactNode } from 'react';
interface Props {
    /** Title of the dialog */
    title: string;
    /** Text for the confirmation button */
    confirmText: string;
    /** Callback invoked when dialog is closed */
    onClose: () => void;
    /** Content of the dialog */
    children: ReactNode;
}
export declare const DialogProvider: import("react").Provider<typeof Dialog>;
export declare function useDialog(): typeof Dialog;
export default function Dialog({ title, confirmText, onClose, children }: Props): import("react/jsx-runtime").JSX.Element;
export {};
