import React, { FC, ReactElement, cloneElement } from 'react';
import { Transition } from 'react-transition-group';
import { TransitionProps } from '../types';

interface ISlideFromTop extends Omit<TransitionProps, 'timeout'> {
    children: ReactElement;
    timeout?: number;
}

const defaultStyle = {
    transitionProperty: 'opacity, transform',
    transitionTimingFunction: 'linear ease-out',
    transform: 'translateY(-100%)',
    opacity: 0
};

const transitionStyles = {
    entering: { opacity: 1, transform: 'translateY(0)', transitionDuration: '.3s' },
    entered: { opacity: 1, transform: 'translateY(0)', transitionDuration: '.3s' },
    exiting: { opacity: 0, transform: 'translateY(-100%)', transitionDuration: '.2s' },
    exited: { opacity: 0, transform: 'translateY(-100%)', transitionDuration: '.2s' }
};

export const SlideFromTop: FC<ISlideFromTop> = ({
    in: inProp = false,
    onEnter,
    onExited,
    children,
    style,
    timeout = 400
}) => (
    <Transition appear in={inProp} timeout={timeout} onEnter={onEnter} onExited={onExited}>
        {(state): ReactElement => {
            return cloneElement(children, {
                style: {
                    visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
                    ...defaultStyle,
                    // @ts-ignore
                    ...transitionStyles[state],
                    ...style,
                    ...children.props.style
                }
            });
        }}
    </Transition>
);

SlideFromTop.displayName = 'SlideFromTop';
