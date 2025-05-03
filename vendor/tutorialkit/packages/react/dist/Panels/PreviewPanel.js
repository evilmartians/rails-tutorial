import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useStore } from '@nanostores/react';
import { reloadPreview } from '@webcontainer/api/utils';
import { createElement, forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { BootScreen } from '../BootScreen.js';
import resizePanelStyles from '../styles/resize-panel.module.css';
import { classNames } from '../utils/classnames.js';
const previewsContainer = globalThis.document ? document.getElementById('previews-container') : {};
export const PreviewPanel = memo(forwardRef(({ showToggleTerminal, toggleTerminal, i18n, tutorialStore }, ref) => {
    const expectedPreviews = useStore(tutorialStore.previews);
    const iframeRefs = useRef([]);
    const onResize = useCallback(() => {
        for (const { ref, container } of iframeRefs.current) {
            if (!ref || !container) {
                continue;
            }
            const { left, top, width, height } = container.getBoundingClientRect();
            ref.style.left = `${left}px`;
            ref.style.top = `${top}px`;
            ref.style.height = `${height}px`;
            ref.style.width = `${width}px`;
        }
    }, []);
    const activePreviewsCount = expectedPreviews.reduce((count, preview) => (preview.ready ? count + 1 : count), 0);
    const hasPreviews = activePreviewsCount > 0;
    useImperativeHandle(ref, () => ({
        reload: () => {
            for (const iframe of iframeRefs.current) {
                if (iframe.ref) {
                    iframe.ref.src = iframe.ref.src;
                }
            }
        },
    }), []);
    useEffect(() => {
        // we update the iframes position at max fps if we have any
        if (hasPreviews) {
            const cancel = requestAnimationFrameLoop(onResize);
            previewsContainer.style.display = 'block';
            return () => {
                previewsContainer.style.display = 'none';
                cancel();
            };
        }
        return undefined;
    }, [hasPreviews]);
    adjustLength(iframeRefs.current, activePreviewsCount, newIframeRef);
    preparePreviewsContainer(activePreviewsCount);
    // update preview refs
    for (const [index, iframeRef] of iframeRefs.current.entries()) {
        if (!iframeRef.ref) {
            iframeRef.ref = previewsContainer.children.item(index);
        }
    }
    if (!hasPreviews) {
        return (_jsxs("div", { className: "panel-container transition-theme bg-tk-elements-panel-backgroundColor text-tk-elements-panel-textColor", children: [_jsxs("div", { className: "panel-header border-b border-tk-elements-app-borderColor justify-between", children: [_jsxs("div", { className: "panel-title", children: [_jsx("div", { className: "panel-icon i-ph-lightning-duotone" }), _jsx("span", { className: "text-sm", children: i18n.prepareEnvironmentTitleText })] }), showToggleTerminal && (_jsxs("button", { className: "panel-button px-2 py-0.5 -mr-1 -my-1", title: "Toggle Terminal", onClick: () => toggleTerminal?.(), children: [_jsx("span", { className: "panel-button-icon i-ph-terminal-window-duotone" }), _jsx("span", { className: "text-sm", children: i18n.toggleTerminalButtonText })] }))] }), _jsx(BootScreen, { tutorialStore: tutorialStore })] }));
    }
    const previews = expectedPreviews.filter((preview) => preview.ready);
    const defaultSize = 100 / previews.length;
    const minSize = 20;
    const children = [];
    for (const [index, preview] of previews.entries()) {
        children.push(_jsx(Panel, { defaultSize: defaultSize, minSize: minSize, children: _jsx(Preview, { iframe: iframeRefs.current[index], preview: preview, previewCount: previews.length, first: index === 0, last: index === previews.length - 1, toggleTerminal: toggleTerminal, i18n: i18n }) }));
        if (index !== previews.length - 1) {
            children.push(_jsx(PanelResizeHandle, { className: resizePanelStyles.PanelResizeHandle }));
        }
    }
    return createElement(PanelGroup, { direction: 'horizontal' }, ...children);
}));
PreviewPanel.displayName = 'PreviewPanel';
function Preview({ preview, iframe, previewCount, first, last, toggleTerminal, i18n }) {
    const previewContainerRef = useRef(null);
    useEffect(() => {
        if (!iframe.ref) {
            return;
        }
        iframe.container = previewContainerRef.current;
        if (preview.url) {
            iframe.ref.src = preview.url;
        }
        if (preview.title) {
            iframe.ref.title = preview.title;
        }
    }, [preview.url, iframe.ref]);
    function reload() {
        if (iframe.ref) {
            reloadPreview(iframe.ref);
        }
    }
    return (_jsxs("div", { className: "panel-container", children: [_jsxs("div", { className: classNames('panel-header border-b border-tk-elements-app-borderColor justify-between', {
                    'border-l border-tk-elements-app-borderColor': !first,
                }), children: [_jsxs("div", { className: "panel-title", children: [_jsx("button", { onClick: reload, title: i18n.reloadPreviewTitle, className: "panel-button rounded-full p-1.5 -my-1.5 -ml-2", children: _jsx("div", { className: "panel-icon i-ph-arrow-clockwise" }) }), _jsx("span", { className: "text-sm truncate", children: previewTitle(preview, previewCount, i18n) })] }), last && (_jsxs("button", { className: "panel-button px-2 py-0.5 -mr-1 -my-1", title: "Toggle Terminal", onClick: () => toggleTerminal?.(), children: [_jsx("div", { className: "panel-button-icon i-ph-terminal-window-duotone" }), _jsx("span", { className: "text-sm", children: i18n.toggleTerminalButtonText })] }))] }), _jsx("div", { ref: previewContainerRef, className: classNames('h-full w-full flex justify-center items-center', {
                    'border-l border-tk-elements-previews-borderColor': !first,
                }) })] }));
}
function requestAnimationFrameLoop(loop) {
    let handle;
    const callback = () => {
        loop();
        handle = requestAnimationFrame(callback);
    };
    handle = requestAnimationFrame(callback);
    return () => {
        cancelAnimationFrame(handle);
    };
}
function previewTitle(preview, previewCount, i18n) {
    if (preview.title) {
        return preview.title;
    }
    if (previewCount === 1) {
        return i18n.defaultPreviewTitleText;
    }
    return `Preview on port ${preview.port}`;
}
function preparePreviewsContainer(previewCount) {
    while (previewsContainer.childElementCount < previewCount) {
        const iframe = document.createElement('iframe');
        iframe.className = 'absolute z-10';
        iframe.allow =
            document.featurePolicy?.allowedFeatures().join('; ') ??
                'magnetometer; accelerometer; gyroscope; geolocation; microphone; camera; payment; autoplay; serial; xr-spatial-tracking; cross-origin-isolated';
        previewsContainer.appendChild(iframe);
    }
    for (let i = 0; i < previewsContainer.childElementCount; i++) {
        const preview = previewsContainer.children.item(i);
        if (i < previewCount) {
            preview.classList.remove('hidden');
        }
        else {
            preview.classList.add('hidden');
        }
    }
}
function newIframeRef() {
    return { ref: undefined, container: undefined };
}
function adjustLength(array, expectedSize, newElement) {
    while (array.length < expectedSize) {
        array.push(newElement());
    }
    while (array.length > expectedSize) {
        array.pop();
    }
}
