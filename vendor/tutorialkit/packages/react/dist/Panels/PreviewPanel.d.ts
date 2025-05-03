import type { TutorialStore } from '@tutorialkit/runtime';
import type { I18n } from '@tutorialkit/types';
interface Props {
    showToggleTerminal?: boolean;
    toggleTerminal?: () => void;
    tutorialStore: TutorialStore;
    i18n: I18n;
}
export type ImperativePreviewHandle = {
    reload: () => void;
};
export declare const PreviewPanel: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<ImperativePreviewHandle>>>;
declare global {
    interface Document {
        featurePolicy: {
            allowedFeatures(): string[];
        } | undefined;
    }
}
export {};
