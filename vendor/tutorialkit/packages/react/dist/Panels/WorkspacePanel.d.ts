import type { TutorialStore } from '@tutorialkit/runtime';
import { type ComponentProps } from 'react';
import { DialogProvider } from '../core/Dialog.js';
import type { Theme } from '../core/types.js';
interface Props {
    tutorialStore: TutorialStore;
    theme: Theme;
    dialog: NonNullable<ComponentProps<typeof DialogProvider>['value']>;
}
/**
 * This component is the orchestrator between various interactive components.
 */
export declare function WorkspacePanel({ tutorialStore, theme, dialog }: Props): import("react/jsx-runtime").JSX.Element;
export {};
