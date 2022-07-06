import React, { FC, ReactElement, cloneElement } from 'react';
import { Transition } from 'react-transition-group';
import { TransitionProps } from '../types';

interface IFadeProps extends Omit<TransitionProps, 'timeout'> {
    children: ReactElement;
    timeout?: number;
}

const defaultStyle = (duration: number): Partial<{ transition: string; opacity: number }> => ({
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0
});

const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
};

export const Fade: FC<IFadeProps> = ({
    in: inProp = false,
    onEnter,
    onExited,
    children,
    style,
    timeout = 500
}) => (
    <Transition appear in={inProp} timeout={timeout} onEnter={onEnter} onExited={onExited}>
        {(state): ReactElement => {
            return cloneElement(children, {
                style: {
                    visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
                    ...defaultStyle(timeout),
                    // @ts-ignore
                    ...transitionStyles[state],
                    ...style,
                    ...children.props.style
                }
            });
        }}
    </Transition>
);

Fade.displayName = 'Fade';
