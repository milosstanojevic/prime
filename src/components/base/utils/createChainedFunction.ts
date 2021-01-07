export type ChainedFunction = ((...args: any[]) => void) | undefined | null;

export default function createChainedFunction(...functions: ChainedFunction[]): ChainedFunction {
  return functions.reduce(
    (acc, func) => {
      if (func === null) {
        return acc;
      }

      return function chainedFunction(this: void, ...args): void {
        acc && acc.apply(this, args);
        func && func.apply(this, args);
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {},
  );
}
