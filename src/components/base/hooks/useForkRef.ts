import { useMemo, MutableRefObject } from "react";
import setRef from "../utils/setRef";

export default function useForkRef<T>(
  refA: MutableRefObject<T | null> | ((instance: T | null) => void) | null | undefined,
  refB: MutableRefObject<T | null> | ((instance: T | null) => void) | null | undefined
): ((instance: T | null) => void) {
  return useMemo(() => {
    return (refValue): void => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    }
  }, [refA, refB]);
}
