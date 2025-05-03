import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as Accordion from '@radix-ui/react-accordion';
import { interpolateString } from '@tutorialkit/types';
import { AnimatePresence, cubicBezier, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useOutsideClick } from './hooks/useOutsideClick.js';
import navStyles from './styles/nav.module.css';
import { classNames } from './utils/classnames.js';
const dropdownEasing = cubicBezier(0.4, 0, 0.2, 1);
export function Nav({ lesson: currentLesson, navList }) {
    const menuRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const { prev, next } = currentLesson;
    const activeItems = [
        currentLesson.part?.id || currentLesson.id,
        currentLesson.chapter?.id || currentLesson.id,
        currentLesson.id,
    ];
    useOutsideClick(menuRef, () => setShowDropdown(false));
    return (_jsxs("header", { className: "grid grid-cols-1 sm:grid-cols-[auto_minmax(0,1fr)_auto] h-[82px] gap-0.5 py-4 px-1 text-sm", children: [_jsx("a", { className: classNames('hidden sm:flex cursor-pointer h-full items-center justify-center w-[40px] text-tk-elements-breadcrumbs-navButton-iconColor', !prev ? 'opacity-32 pointer-events-none' : 'hover:text-tk-elements-breadcrumbs-navButton-iconColorHover'), "aria-disabled": !prev, href: prev?.href, children: _jsx("span", { className: "i-ph-arrow-left scale-120" }) }), _jsx("div", { className: "relative", children: _jsxs("div", { "data-state": `${showDropdown ? 'open' : 'closed'}`, className: classNames(navStyles.NavContainer, 'absolute mx-4 sm:mx-0 z-1 left-0 right-0 rounded-[8px] border overflow-hidden z-50'), ref: menuRef, children: [_jsxs("button", { className: classNames(navStyles.ToggleButton, 'flex-1 flex items-center text-left py-3 px-3 w-full overflow-hidden'), onClick: () => setShowDropdown(!showDropdown), children: [_jsxs("div", { className: "flex items-center gap-1 font-light truncate", children: [currentLesson.part && (_jsxs(_Fragment, { children: [_jsx("span", { className: "hidden sm:inline", children: currentLesson.part.title }), _jsx("span", { className: classNames('hidden sm:inline', navStyles.Divider), children: "/" })] })), currentLesson.chapter && (_jsxs(_Fragment, { children: [_jsx("span", { className: "hidden sm:inline", children: currentLesson.chapter.title }), _jsx("span", { className: classNames('hidden sm:inline', navStyles.Divider), children: "/" })] })), _jsx("strong", { className: "font-semibold", children: currentLesson.data.title })] }), _jsx("div", { className: classNames(navStyles.ToggleButtonIcon, 'ml-auto w-[30px]', {
                                        'i-ph-caret-up-bold': showDropdown,
                                        'i-ph-caret-down-bold': !showDropdown,
                                    }) })] }), _jsx(AnimatePresence, { children: showDropdown && (_jsx(motion.nav, { initial: { height: 0, y: 0 }, animate: { height: 'auto', y: 0 }, exit: { height: 0, y: 0 }, transition: { duration: 0.2, ease: dropdownEasing }, className: " overflow-hidden transition-theme bg-tk-elements-breadcrumbs-dropdown-backgroundColor", children: _jsx(NavListComponent, { className: "py-5 pl-5 border-t border-tk-elements-breadcrumbs-dropdown-borderColor overflow-auto max-h-[60dvh]", items: navList, activeItems: activeItems, i18n: currentLesson.data.i18n, level: 0 }) })) })] }) }), _jsx("a", { className: classNames('hidden sm:flex cursor-pointer h-full items-center justify-center w-[40px] text-tk-elements-breadcrumbs-navButton-iconColor', !next ? 'opacity-32 pointer-events-none' : 'hover:text-tk-elements-breadcrumbs-navButton-iconColorHover'), "aria-disabled": !next, href: next?.href, children: _jsx("span", { className: "i-ph-arrow-right scale-120" }) })] }));
}
function NavListComponent({ items, level, activeItems, className, i18n, }) {
    return (_jsx(Accordion.Root, { asChild: true, collapsible: true, type: "single", defaultValue: `${level}-${activeItems[level]}`, children: _jsx("ul", { className: classNames(className), children: items.map((item, index) => (_jsx(NavListItem, { ...item, index: index, level: level, activeItems: activeItems, i18n: i18n }, item.id))) }) }));
}
function NavListItem({ level, type, index, i18n, activeItems, id, title, href, sections }) {
    const isActive = activeItems[level] === id;
    if (!sections) {
        return (_jsx("li", { className: "mr-3 pl-4.5", children: _jsx("a", { className: classNames('w-full inline-block border border-transparent pr-3 transition-theme text-tk-elements-breadcrumbs-dropdown-lessonTextColor hover:text-tk-elements-breadcrumbs-dropdown-lessonTextColorHover px-3 py-1 rounded-1', isActive
                    ? 'font-semibold text-tk-elements-breadcrumbs-dropdown-lessonTextColorSelected bg-tk-elements-breadcrumbs-dropdown-lessonBackgroundColorSelected'
                    : 'bg-tk-elements-breadcrumbs-dropdown-lessonBackgroundColor'), href: href, children: title }) }));
    }
    return (_jsx(Accordion.Item, { asChild: true, value: `${level}-${id}`, children: _jsxs("li", { className: "mt-1.5", children: [_jsxs(Accordion.Trigger, { className: classNames(navStyles.AccordionTrigger, 'flex items-center gap-1 w-full hover:text-primary-700', {
                        [`font-semibold ${navStyles.AccordionTriggerActive}`]: isActive,
                    }), children: [_jsx("span", { className: `${navStyles.AccordionTriggerIcon} i-ph-caret-right-bold scale-80 text-gray-300` }), _jsx("span", { children: type === 'part' ? interpolateString(i18n.partTemplate, { index: index + 1, title }) : title })] }), _jsx(Accordion.Content, { className: navStyles.AccordionContent, children: _jsx(NavListComponent, { className: "mt-1.5 pl-4.5", items: sections, activeItems: activeItems, i18n: i18n, level: level + 1 }) })] }) }));
}
