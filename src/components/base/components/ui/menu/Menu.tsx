import React, {
  useRef,
  FC,
  ReactNode,
  MouseEvent,
  useState,
  useCallback,
  useEffect,
  ReactElement,
  Ref,
} from "react";
import { Placement } from "@popperjs/core";
import useForkRef from "../../../hooks/useForkRef";
import {Popper} from "../../atomic/popper";
import {Overlay, Window} from "../../atomic";

interface ElementWithRef<T> extends ReactElement {
  ref?: Ref<T>;
}

export type MenuMode = "normal" | "wider" | "tiny";

interface IMenu {
  /** Menu content */
  children: ReactNode;
  /** Handle scroll bar */
  handleScroll?: boolean;
  /** Disable Focus Lock */
  disableFocusLock?: boolean;
  /** Should menu be open when it's mounted */
  open?: boolean;
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
}

export const Menu: FC<IMenu> = ({
  children,
  disableFocusLock = false,
  handleScroll = true,
  open: defaultOpen = false,
  onOpen,
  onClose,
  onBeforeClose,
  position = 'bottom-start',
  target,
  popperClassName,
  backgroundElementClass,
}) => {
  const [open, setOpen] = useState(defaultOpen)
  const [childNode, setChildNode] = useState<Element | null>();
  const elementRef = useRef<Element | null>(null);

  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen])

  const handleRefRef = useForkRef(target ? target.ref : undefined, setChildNode)
  const handleRef = useForkRef(handleRefRef, elementRef);

  const handleOpen = useCallback(
    (event: Pick<MouseEvent<Element>, "preventDefault">) => {
      event && event.preventDefault();
      setOpen(true);
      typeof onOpen === 'function' && onOpen();
    },
    [onOpen]
  );

  const handleClose = useCallback(
    () => {
      if (typeof onBeforeClose === "function" && !onBeforeClose()) {
        return
      }
      setOpen(false);
      typeof onClose === 'function' && onClose()
    },
    [onClose, onBeforeClose]
  );

  const childProps = {
    forceClose: handleClose,
  }

  const targetProps = {
    open,
    ref: handleRef,
    onClick: handleOpen,
  };

  return (
    <>
      {target && React.cloneElement(target, targetProps)}
      {open ? (
        <Window
          onClose={handleClose}
          disableScrollLock={!handleScroll}
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
            {typeof children === 'function' ? children(childProps) : children}
          </Popper>
        </Window>
      ): null}
    </>
  )
};
