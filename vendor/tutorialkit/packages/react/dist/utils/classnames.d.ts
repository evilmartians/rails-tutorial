/**
 * Copyright (c) 2018 Jed Watson.
 * Licensed under the MIT License (MIT), see:
 *
 * @link http://jedwatson.github.io/classnames
 */
type ClassNamesArg = undefined | false | string | Record<string, boolean> | ClassNamesArg[];
/**
 * A simple JavaScript utility for conditionally joining classNames together.
 *
 * @param args A series of classes or object with key that are class and values
 * that are interpreted as boolean to decide whether or not the class
 * should be included in the final class.
 */
export declare function classNames(...args: ClassNamesArg[]): string;
export {};
