import { useLayoutEffect } from 'react';
import { useWindow } from "context/windowContext";

/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} that sets
 * an attribute on the document element indicating that scrolling should be
 * locked. This is performed with a layout effect (before paint).
 *
 * @kind function
 *
 * @param {Boolean} locked Whether scrolling should be locked.
 */
export const useScrollLock = locked => {
    const { document } = useWindow();

    useLayoutEffect(() => {
        document.documentElement.dataset.scrollLock = locked || '';
    }, [locked]);
};
