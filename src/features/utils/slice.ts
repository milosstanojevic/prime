function hasOwnProperty<X extends {}, Y extends PropertyKey>(obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop)
}

const getIndex = (items: Array<Object>, itemId: number): number => {
  return items.findIndex((item) => {
    if (hasOwnProperty(item, 'id') && typeof item.id === 'number' ) {
      return item.id === itemId
    }
    return false
  })
}

export const entitySuccess = (items: Array<Object>, itemId: number, entities: Object): Array<Object> => {
  const entity = Object.values(entities)[itemId]
  const index = getIndex(items, itemId)

  return index === -1 ? [...items, entity] : items[index] = entity
}

export const entitiesSuccess = (entities: Object): Object[] => {
  return Object.values(entities)
}

export const entityAdd = (id: number, entities: Object): Object => {
  return Object.values(entities)[id]
}

export const entityRemove = (items: Array<Object>, itemId: number): Array<Object> => {
  const index = getIndex(items, itemId)
  if (index > 0) {
    items.splice(index, 1);
  }
  return items
}
