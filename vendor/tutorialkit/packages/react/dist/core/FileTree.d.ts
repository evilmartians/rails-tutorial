import type { FileDescriptor } from '@tutorialkit/types';
import { type ComponentProps } from 'react';
import { ContextMenu } from './ContextMenu.js';
interface Props {
    files: FileDescriptor[];
    selectedFile?: string;
    onFileSelect?: (filePath: string) => void;
    onFileChange?: ComponentProps<typeof ContextMenu>['onFileChange'];
    allowEditPatterns?: ComponentProps<typeof ContextMenu>['allowEditPatterns'];
    i18n?: ComponentProps<typeof ContextMenu>['i18n'];
    hideRoot: boolean;
    scope?: string;
    hiddenFiles?: Array<string | RegExp>;
    className?: string;
}
export declare function FileTree({ files, onFileSelect, onFileChange, allowEditPatterns, selectedFile, hideRoot, scope, hiddenFiles, i18n, className, }: Props): import("react/jsx-runtime").JSX.Element;
export default FileTree;
export declare function sortFiles(fileA: FileDescriptor, fileB: FileDescriptor): 0 | 1 | -1;
