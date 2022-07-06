import { useCallback, useState } from 'react';

export type UseToggle = (show?: boolean) => [boolean, () => void, () => void];
export const useToggle: UseToggle = (show = false) => {
    const [isToggled, setToggle] = useState<boolean>(show);

    const startToggle = useCallback(() => setToggle(true), []);
    const endToggle = useCallback(() => setToggle(false), []);

    return [isToggled, startToggle, endToggle];
};
