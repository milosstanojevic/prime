import React, {
    useCallback,
    useRef,
    useEffect,
    forwardRef,
    HTMLAttributes,
    KeyboardEvent
} from 'react';
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

export const Window = forwardRef<HTMLDivElement, IWindow & HTMLAttributes<HTMLDivElement>>(
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
        const innerRef = useRef<HTMLDivElement>(null);
        const handleRef = useForkRef(innerRef, ref);

        const handleKeyDown = useCallback(
            (event: KeyboardEvent<HTMLDivElement>) => {
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

        useEffect(() => {
            return (): void => {
                typeof onClose === 'function' && onClose();
            };
            // Dependency is empty because we only want to call onClose when component is unmounted
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

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
