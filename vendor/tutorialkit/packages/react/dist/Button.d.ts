import { type ComponentProps } from 'react';
interface Props extends ComponentProps<'button'> {
    variant?: 'primary' | 'secondary';
}
export declare const Button: import("react").ForwardRefExoticComponent<Omit<Props, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
export {};
