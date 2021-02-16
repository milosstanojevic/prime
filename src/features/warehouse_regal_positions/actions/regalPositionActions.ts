import { request } from "../../../api";
import { AppDispatch, AppThunk } from "../../../app";
import { RegalPosition } from "../types";
import { schemas } from "../schemas";
import { regalPositionSlice } from "../slices";

export interface NormalizerRegalPositionsRequest {
  result: number[];
  entities: {
    regal_positions: { [id: number]: RegalPosition },
  };
}

export interface NormalizerRegalPositionRequest {
  result: number;
  entities: {
    regal_positions: { [id: number]: RegalPosition },
  };
}

const { actions } = regalPositionSlice

export const addRegalPosition = (id: number, newRegalPosition: RegalPosition): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const response: Object = await request(`regals/${id}/positions`, {
      schema: schemas.REGAL_POSITION,
      method: 'POST',
      payload: newRegalPosition,
    })
    dispatch(actions.addRegalPosition(response as NormalizerRegalPositionRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const clearRegalPositions = () => (dispatch: AppDispatch) => {
  dispatch(actions.clearRegalPositions())
}

export const fetchRegalPositions = (id: number): AppThunk => async (dispatch:AppDispatch) => {
  dispatch(actions.startLoading())
  try {
    const response: Object = await request(`regals/${id}/positions`, {schema: schemas.REGAL_POSITIONS})
    dispatch(actions.regalPositionSuccess(response as NormalizerRegalPositionsRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}
