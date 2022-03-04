import { useFetch, usePost } from "../../../utils";
import { pathToUrl } from "../../../utils/router";
import { RegalPosition } from "../types";

const mainUrl = "regals/:regalId/positions";

export const useGetRegalPositions = (regalId: number) =>
  useFetch<RegalPosition[]>(pathToUrl(mainUrl, { regalId }));

export const useAddRegalPosition = (
  regalId: number,
  updater: (oldData: RegalPosition[], newData: RegalPosition) => RegalPosition[]
) =>
  usePost<RegalPosition[], RegalPosition>(
    pathToUrl(mainUrl, { regalId }),
    undefined,
    updater
  );
