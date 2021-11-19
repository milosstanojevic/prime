import { RootState } from "../../../app";
import { createSelector } from "@reduxjs/toolkit";

export const getAllRegalPositions = (state: RootState) =>
  state.regal_positions.items;
export const getRegalPositionIds = (state: RootState) =>
  state.regal_positions.itemIds;

export const getAllRegalPositionIds = (state: RootState) =>
  state.regal_positions.items.reduce((acc: number[], regalPosition) => {
    if (regalPosition && regalPosition.id) {
      acc.push(regalPosition.id);
    }
    return acc;
  }, []);

export const makeGetRegalPositionById = (id: number) => {
  return createSelector(getAllRegalPositions, (regalPositions) => {
    const regalPosition = regalPositions.find(
      (regalPosition) => regalPosition.id === id
    );
    if (regalPosition) {
      return { ...regalPosition };
    }
    return {};
  });
};

export const makeGetRegalPositionIdsByRegalId = (id: number) => {
  return createSelector(getAllRegalPositions, (regalPositions) => {
    let data: number[] = [];

    regalPositions.forEach((regalPosition) => {
      if (regalPosition && regalPosition.id && regalPosition.regalId === id) {
        data.push(regalPosition.id);
      }
    });

    return data;
  });
};
