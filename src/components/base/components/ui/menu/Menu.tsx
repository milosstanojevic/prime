import React, {
    useRef,
    FC,
    ReactNode,
    MouseEvent,
    useState,
    useCallback,
    useEffect,
    useMemo
} from 'react';
import { Placement } from '@popperjs/core';
import useForkRef from '../../../hooks/useForkRef';
import { Popper } from '../../atomic/popper';
import { Overlay, Window } from '../../atomic';
import { ElementWithRef } from './types';
import { useToggle } from '../../../hooks';

interface IMenu {
    /** Menu content */
    children: ReactNode;
    /** Handle scroll bar */
    disableScrollLock?: boolean;
    /** Disable Focus Lock */
    disableFocusLock?: boolean;
    /** Callback triggered when modal has been opened */
    onOpen?: () => void;
    /** Callback triggered when modal has been closed */
    onClose?: () => void;
    /** Before close callback */
    onBeforeClose?: () => boolean;
    /** Position Menu */
    position?: Placement;
    /** Target element */
    target?: ElementWithRef<Element>;
    /** Popper class name*/
    popperClassName?: string;
    /** Background style for clickable element after the menu is open (opacity, color, etc...) */
    backgroundElementClass?: string;
    /** External controls */
    externalControls?: [boolean, (state: boolean) => void];
}

export const Menu: FC<IMenu> = ({
    children,
    disableFocusLock = false,
    disableScrollLock = true,
    onOpen,
    onClose,
    onBeforeClose,
    position = 'bottom-start',
    target,
    popperClassName,
    backgroundElementClass,
    externalControls = []
}) => {
    const [externalState, setExternalState] = externalControls;
    const usesExternalState = externalState !== undefined;
    const [isOpen, handleInternalOpen, handleInternalClose] = useToggle(
        usesExternalState ? externalState : false
    );
    const [childNode, setChildNode] = useState<Element | null>();
    const elementRef = useRef<Element | null>(null);

    const handleRefRef = useForkRef(target ? target.ref : undefined, setChildNode);
    const handleRef = useForkRef(handleRefRef, elementRef);

    const handleOpen = useCallback(
        (event: Pick<MouseEvent<Element>, 'preventDefault'>) => {
            event && event.preventDefault();
            handleInternalOpen();
            setExternalState && setExternalState(true);
            typeof onOpen === 'function' && onOpen();
        },
        [onOpen, handleInternalOpen, setExternalState]
    );

    const handleClose = useCallback(() => {
        if (typeof onBeforeClose === 'function' && !onBeforeClose()) {
            return;
        }
        handleInternalClose();
        setExternalState && setExternalState(false);
        typeof onClose === 'function' && onClose();
    }, [onClose, onBeforeClose, handleInternalClose, setExternalState]);

    const childProps = {
        forceClose: handleClose
    };

    useEffect(() => {
        if (usesExternalState) {
            externalState ? handleInternalOpen() : handleInternalClose();
        }
    }, [usesExternalState, externalState, handleInternalClose, handleInternalOpen]);

    const open = useMemo(() => {
        return externalState !== undefined ? externalState : isOpen;
    }, [externalState, isOpen]);

    const targetProps = {
        open,
        ref: handleRef,
        onClick: handleOpen
    };

    return (
        <>
            {target && React.cloneElement(target, targetProps)}
            {open ? (
                <Window
                    onClose={handleClose}
                    disableScrollLock={!disableScrollLock}
                    disableFocusLock={disableFocusLock}
                >
                    <Overlay
                        className={backgroundElementClass}
                        onClick={handleClose}
                        tabIndex={-1}
                    />
                    <Popper
                        anchorEl={childNode}
                        open={childNode ? open : false}
                        placement={position}
                        className={popperClassName}
                        tabIndex={-1}
                    >
                        {typeof children === 'function'
                            ? React.cloneElement(children, [childProps])
                            : children}
                    </Popper>
                </Window>
            ) : null}
        </>
    );
};
