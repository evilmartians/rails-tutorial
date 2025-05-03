import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';
import { classNames } from './utils/classnames.js';
export function BootScreen({ className, tutorialStore }) {
    const steps = useStore(tutorialStore.steps);
    const { startWebContainerText, noPreviewNorStepsText } = tutorialStore.lesson?.data.i18n ?? {};
    const bootStatus = useStore(tutorialStore.bootStatus);
    // workaround to prevent the hydration error caused by bootStatus always being 'unknown' server-side
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    return (_jsx("div", { className: classNames('flex-grow w-full flex justify-center items-center text-sm', className), children: isClient && bootStatus === 'blocked' ? (_jsx(Button, { onClick: () => tutorialStore.unblockBoot(), children: startWebContainerText })) : steps ? (_jsx("ul", { className: "space-y-1", children: steps.map((step, index) => (_jsxs("li", { className: "flex items-center", children: [step.status === 'idle' ? (_jsx("div", { className: "inline-block mr-2 i-ph-circle-duotone scale-120 text-tk-elements-status-disabled-iconColor" })) : step.status === 'running' ? (_jsx("div", { className: "inline-block mr-2 i-svg-spinners-90-ring-with-bg scale-105 text-tk-elements-status-active-iconColor" })) : step.status === 'completed' ? (_jsx("div", { className: "inline-block mr-2 i-ph-check-circle-duotone scale-120 text-tk-elements-status-positive-iconColor" })) : step.status === 'failed' ? (_jsx("div", { className: "inline-block mr-2 i-ph-x-circle-duotone scale-120 text-tk-elements-status-negative-iconColor" })) : (_jsx("div", { className: "inline-block mr-2 i-ph-minus-circle-duotone scale-120 text-tk-elements-status-skipped-iconColor" })), _jsx("span", { className: toTextColor(step.status), children: step.title })] }, index))) })) : (noPreviewNorStepsText) }));
}
function toTextColor(status) {
    switch (status) {
        case 'completed': {
            return 'text-tk-elements-status-positive-textColor';
        }
        case 'failed': {
            return 'text-tk-elements-status-negative-textColor';
        }
        case 'idle': {
            return 'text-tk-elements-status-disabled-textColor';
        }
        case 'running': {
            return 'text-tk-elements-status-active-textColor';
        }
        case 'skipped': {
            return 'text-tk-elements-status-skipped-textColor';
        }
    }
}
function Button({ children, onClick }) {
    return (_jsx("button", { className: "flex font-500 disabled:opacity-32 items-center text-sm ml-2 px-4 py-1 rounded-md bg-tk-elements-bootScreen-primaryButton-backgroundColor text-tk-elements-bootScreen-primaryButton-textColor hover:bg-tk-elements-bootScreen-primaryButton-backgroundColorHover hover:text-tk-elements-bootScreen-primaryButton-textColorHover", onClick: onClick, children: children }));
}
