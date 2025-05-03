import { Compartment, type Extension } from '@codemirror/state';
import '../../styles/cm.css';
import type { Theme } from '../types.js';
import type { EditorSettings } from './index.js';
export declare const darkTheme: Extension;
export declare const themeSelection: Compartment;
export declare function getTheme(theme: Theme, settings?: EditorSettings): Extension;
export declare function reconfigureTheme(theme: Theme): import("@codemirror/state").StateEffect<unknown>;
