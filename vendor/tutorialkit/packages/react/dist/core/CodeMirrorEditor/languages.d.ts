import { LanguageDescription, LanguageSupport } from '@codemirror/language';
export declare const supportedLanguages: LanguageDescription[];
export declare function getLanguage(fileName: string): Promise<LanguageSupport | undefined>;
