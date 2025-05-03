import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { classNames } from './utils/classnames.js';
export const Button = forwardRef(({ className, variant = 'primary', ...props }, ref) => {
    return (_jsx("button", { ref: ref, ...props, className: classNames(className, 'flex items-center font-500 text-sm px-4 py-1 rounded-md disabled:opacity-32', variant === 'primary' &&
            'bg-tk-elements-primaryButton-backgroundColor text-tk-elements-primaryButton-textColor', !props.disabled &&
            variant === 'primary' &&
            'hover:bg-tk-elements-primaryButton-backgroundColorHover hover:text-tk-elements-primaryButton-textColorHover', variant === 'secondary' &&
            'bg-tk-elements-secondaryButton-backgroundColor text-tk-elements-secondaryButton-textColor', !props.disabled &&
            variant === 'secondary' &&
            'hover:bg-tk-elements-secondaryButton-backgroundColorHover hover:text-tk-elements-secondaryButton-textColorHover') }));
});
