import {
  entitySuccess,
  entitiesSuccess,
  entityRemove,
  entityIdsSuccess,
  entityIdsRemove,
} from "./slice";

const entities = {
  "1": {
    id: 1,
    name: "Item 1",
  },
  "2": {
    id: 2,
    name: "Item 2",
  },
  "3": {
    id: 3,
    name: "Item 3",
  },
};

const items = [
  {
    id: 1,
    name: "Item 1",
  },
  {
    id: 2,
    name: "Item 2",
  },
  {
    id: 3,
    name: "Item 3",
  },
];

const newItem = {
  "4": {
    id: 4,
    name: "Item 4",
  },
};

const editedItem = {
  "2": {
    id: 2,
    name: "Edited Item 2",
  },
};

it("should return modified items on entitySuccess", () => {
  expect(entitySuccess(items, 2, editedItem)).toEqual([
    {
      id: 1,
      name: "Item 1",
    },
    {
      id: 2,
      name: "Edited Item 2",
    },
    {
      id: 3,
      name: "Item 3",
    },
  ]);
  expect(entitySuccess(items, 4, newItem)).toEqual([
    {
      id: 1,
      name: "Item 1",
    },
    {
      id: 2,
      name: "Item 2",
    },
    {
      id: 3,
      name: "Item 3",
    },
    {
      id: 4,
      name: "Item 4",
    },
  ]);
});

it("should return values on entitiesSuccess", () => {
  expect(entitiesSuccess(entities)).toEqual(items);
});

it("should return values on entityIdsSuccess", () => {
  expect(entityIdsSuccess([1, 2, 3], 4)).toEqual([1, 2, 3, 4]);
  expect(entityIdsSuccess([1, 2, 3], 3)).toEqual([1, 2, 3]);
});

it("should return values on entityIdsRemove", () => {
  expect(entityIdsRemove([1, 2, 3], 4)).toEqual([1, 2, 3]);
  expect(entityIdsRemove([1, 2, 3], 3)).toEqual([1, 2]);
});

it("should remove value on entityRemove", () => {
  expect(entityRemove(items, 2)).toEqual([
    {
      id: 1,
      name: "Item 1",
    },
    {
      id: 3,
      name: "Item 3",
    },
  ]);

  expect(entityRemove(items, 55)).toEqual([
    {
      id: 1,
      name: "Item 1",
    },
    {
      id: 2,
      name: "Item 2",
    },
    {
      id: 3,
      name: "Item 3",
    },
  ]);
});
