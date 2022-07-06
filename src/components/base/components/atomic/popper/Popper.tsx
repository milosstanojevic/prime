import React, {
    forwardRef,
    useCallback,
    useRef,
    useEffect,
    useState,
    CSSProperties,
    HTMLAttributes
} from 'react';
import { createPopper, Instance, State } from '@popperjs/core';
import { Placement } from './Placement';
import useForkRef from '../../../hooks/useForkRef';

interface TransitionProps {
    in: boolean;
    onEnter: () => void;
    onExited: () => void;
}
interface IChildProps {
    placement: Placement;
    transitionProps: Partial<TransitionProps>;
}

interface PopperProps {
    /** Anchor Element. */
    anchorEl?: Element | null;
    /** Open */
    open?: boolean;
    /** Inline style */
    style?: CSSProperties;
    /** Child with transition */
    transition?: boolean;
    /** Placement */
    placement?: Placement;
}

export const Popper = forwardRef<HTMLDivElement, PopperProps & HTMLAttributes<HTMLDivElement>>(
    (
        {
            children,
            anchorEl,
            open = false,
            style,
            transition = false,
            placement: initialPlacement = 'bottom',
            ...rest
        },
        ref
    ) => {
        const [exited, setExited] = useState(true);
        const [placement, setPlacement] = useState(initialPlacement);
        const ownRef = useRef<HTMLDivElement | null>(null);
        const popperRef = useRef<Instance>();

        const handleInnerRef = useForkRef(ownRef, ref);

        const handlePopperUpdate = (data: Partial<State>): void => {
            setPlacement(data.placement || 'bottom');
        };

        const handleOpen = useCallback(() => {
            if (!ownRef.current || !anchorEl || !open) {
                return;
            }

            if (popperRef.current) {
                popperRef.current.destroy();
            }

            popperRef.current = createPopper(anchorEl, ownRef.current, {
                placement,
                onFirstUpdate: handlePopperUpdate
            });
        }, [anchorEl, open, placement]);

        const handleClose = (): void => {
            if (!popperRef.current) {
                return;
            }

            popperRef.current.destroy();
        };

        const handleRef = useCallback(
            (node: HTMLDivElement) => {
                handleInnerRef(node);
                handleOpen();
            },
            [handleOpen, handleInnerRef]
        );

        const handleEnter = (): void => {
            setExited(false);
        };

        const handleExited = (): void => {
            setExited(true);
            handleClose();
        };

        useEffect(() => {
            return (): void => {
                handleClose();
            };
        }, []);

        useEffect(() => {
            if (!open && !transition) {
                handleClose();
            }
        }, [open, transition]);

        useEffect(() => {
            if (popperRef.current) {
                popperRef.current.update();
            }
        });

        if (!open && (!transition || exited)) {
            return null;
        }

        const childProps: Partial<IChildProps> = { placement };

        if (transition) {
            childProps.transitionProps = {
                in: open,
                onEnter: handleEnter,
                onExited: handleExited
            };
        }

        return (
            <div
                ref={handleRef}
                {...rest}
                style={{
                    ...style
                }}
            >
                {typeof children === 'function'
                    ? React.cloneElement(children, [childProps])
                    : children}
            </div>
        );
    }
);

Popper.displayName = 'Popper';
