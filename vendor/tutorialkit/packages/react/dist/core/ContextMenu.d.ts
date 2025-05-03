import { type FileDescriptor, type I18n } from '@tutorialkit/types';
import { type ComponentProps } from 'react';
interface FileChangeEvent {
    type: FileDescriptor['type'];
    method: 'add' | 'remove' | 'rename';
    value: string;
}
interface FileRenameEvent extends FileChangeEvent {
    method: 'rename';
    oldValue: string;
}
interface Props extends ComponentProps<'div'> {
    /** Callback invoked when file is changed. This callback should throw errors with {@link FilesystemError} messages. */
    onFileChange?: (event: FileChangeEvent | FileRenameEvent) => Promise<void>;
    /** Glob patterns for paths that allow editing files and folders. Disabled by default. */
    allowEditPatterns?: string[];
    /** Directory of the clicked file. */
    directory: string;
    /** Whether to render new files/directories before or after the trigger element. Defaults to `'before'`. */
    position?: 'before' | 'after';
    /** Localized texts for menu. */
    i18n?: Pick<I18n, 'fileTreeCreateFileText' | 'fileTreeCreateFolderText' | 'fileTreeActionNotAllowedText' | 'fileTreeAllowedPatternsText' | 'fileTreeFileExistsAlreadyText' | 'confirmationText'>;
    /** Props for trigger wrapper. */
    triggerProps?: ComponentProps<'div'> & {
        'data-testid'?: string;
    };
}
export declare function ContextMenu({ onFileChange, allowEditPatterns, directory, i18n, position, children, triggerProps, ...props }: Props): string | number | boolean | import("react/jsx-runtime").JSX.Element | Iterable<import("react").ReactNode> | null | undefined;
export {};
