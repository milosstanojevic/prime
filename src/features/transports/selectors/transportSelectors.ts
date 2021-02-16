import {RootState} from "../../../app";
import {createSelector} from "reselect";

export const getAllTransports = (state: RootState) => state.transports.items

export const getAllTransportIds = (state: RootState) => state.transports.items
  .reduce((acc: number[], transport) => {
    if (transport && transport.id) {
      acc.push(transport.id)
    }
    return acc
  }, [])

export const makeGetTransportById = () => {
  return createSelector(
    getAllTransports,
    (state: RootState, id: number) => id,
    (transports, id) => {
      const transport = transports.find((transport) => transport.id === id)
      if (transport) {
        return { ...transport }
      }
      return {}
    }
  )
}
