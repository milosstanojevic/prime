import React, {
  forwardRef,
  HTMLAttributes,
  useRef,
  cloneElement, useMemo, useCallback, ReactElement, useState, useEffect, MouseEvent,
} from "react";
import classnames from "classnames";
import useForkRef from "../../../hooks/useForkRef";
import createChainedFunction from "../../../utils/createChainedFunction";
import {Overlay, Window} from "../../atomic";

interface IModal {
  disableFocusLock?: boolean;
  disableScrollLock?: boolean;
  open?: boolean;
  disableBackgroundClick?: boolean;
  disableBackgroundColor?: boolean;
  onClose?: () => void;
  children: ReactElement;
}

const getHasTransition = (children: any): boolean => {
  return children.props ? Object.prototype.hasOwnProperty.call(children.props, "in") : false;
}

export const Modal = forwardRef<HTMLDivElement, IModal & HTMLAttributes<HTMLDivElement>>((
  {
    children,
    disableFocusLock = false,
    disableScrollLock = false,
    disableBackgroundClick = false,
    disableBackgroundColor = false,
    open: defaultOpen = false,
    onClose,
    ...rest
  },
  ref
) => {
  const [open, setOpen] = useState(defaultOpen);
  const [exited, setExited] = useState(true);
  const innerRef = useRef<HTMLDivElement>(null);
  const handleRef = useForkRef(innerRef, ref);

  const hasTransition = useMemo(() => {
    return getHasTransition(children)
  }, [children])

  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
    if (!hasTransition) {
      typeof onClose === "function" && onClose();
    }
  }, [hasTransition, onClose]);

  const handleBackgroundClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (!disableBackgroundClick) {
        event.preventDefault();
        handleClose();
      }
    },
    [disableBackgroundClick, handleClose]
  );

  const handleEnter = useCallback(() => {
    setExited(false);
  }, []);

  const handleExited = useCallback(() => {
    setExited(true);
    typeof onClose === "function" && onClose();
  }, [onClose]);

  const childProps = useMemo(() => {
    let props = {};

    // It's a Transition like component
    if (hasTransition && children) {
      props = {
        onEnter: createChainedFunction(handleEnter, children.props.onEnter),
        onExited: createChainedFunction(handleExited, children.props.onExited),
        in: open,
      }
    }

    return props
  }, [children, handleEnter, handleExited, hasTransition, open])

  if (!open && (!hasTransition || exited)) {
    return null;
  }

  return (
    <Window
      {...rest}
      ref={handleRef}
      onClose={handleClose}
      disableFocusLock={disableFocusLock}
      disableScrollLock={disableScrollLock}
    >
      <Overlay
        onClick={handleBackgroundClick}
        className={classnames({
          "tw-hidden": !open,
          "ac-modal__background": !disableBackgroundColor,
        })}
      />
      {cloneElement(children, childProps)}
    </Window>
  );
});
