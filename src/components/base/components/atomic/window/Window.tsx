import React from 'react';
import classnames from 'classnames';
import FocusLock from 'react-focus-lock';
import styles from './Window.module.css';
import { RemoveScroll } from 'react-remove-scroll';
import useForkRef from '../../../hooks/useForkRef';
import { Portal } from '..';

interface IWindow {
    onClose?: () => void;
    disableFocusLock?: boolean;
    disableScrollLock?: boolean;
}

const returnFocus = { preventScroll: true };

export const Window = React.forwardRef<
    HTMLDivElement,
    IWindow & React.HTMLAttributes<HTMLDivElement>
>(
    (
        {
            children,
            onClose,
            className,
            style,
            onKeyDown,
            disableFocusLock = false,
            disableScrollLock = false,
            ...rest
        },
        ref
    ) => {
        const innerRef = React.useRef<HTMLDivElement>(null);
        const handleRef = useForkRef(innerRef, ref);

        const handleKeyDown = React.useCallback(
            (event: React.KeyboardEvent<HTMLDivElement>) => {
                if (!event.defaultPrevented && (event.key === 'Esc' || event.key === 'Escape')) {
                    event.preventDefault();
                    if (onClose) {
                        onClose();
                    }
                }
                if (typeof onKeyDown === 'function') {
                    onKeyDown(event);
                }
            },
            [onClose, onKeyDown]
        );

        return (
            <Portal>
                <FocusLock returnFocus={returnFocus} disabled={disableFocusLock}>
                    <RemoveScroll forwardProps ref={handleRef} enabled={!disableScrollLock}>
                        <div
                            {...rest}
                            style={{ ...style }}
                            onKeyDown={handleKeyDown}
                            tabIndex={0}
                            className={classnames(`${styles.window}`, className)}
                        >
                            {children}
                        </div>
                    </RemoveScroll>
                </FocusLock>
            </Portal>
        );
    }
);

Window.displayName = 'Window';
