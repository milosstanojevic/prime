import { ReactElement, Ref } from 'react';

export interface ElementWithRef<T> extends ReactElement {
    ref?: Ref<T>;
}
