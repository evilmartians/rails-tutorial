import { Terminal as XTerm } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import { type ComponentProps } from 'react';
import '../../styles/terminal.css';
export interface TerminalRef {
    reloadStyles: () => void;
}
export interface TerminalProps extends ComponentProps<'div'> {
    theme: 'dark' | 'light';
    readonly?: boolean;
    onTerminalReady?: (terminal: XTerm) => void;
    onTerminalResize?: (cols: number, rows: number) => void;
}
export declare const Terminal: import("react").ForwardRefExoticComponent<Omit<TerminalProps, "ref"> & import("react").RefAttributes<TerminalRef>>;
export default Terminal;
