import { RootState } from "../../../app";
import { createSelector } from "reselect";

export const getAllTransports = (state: RootState) => state.transports.items;
export const getTransportIds = (state: RootState) => state.transports.itemIds;

export const makeGetTransportById = (id: number) => {
  return createSelector(getAllTransports, (transports) => {
    const transport = transports.find((transport) => transport.id === id);
    if (transport) {
      return { ...transport };
    }
    return {};
  });
};
