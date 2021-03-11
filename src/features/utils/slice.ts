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
  const entity = Object.values(entities).find((item) => {
    if (hasOwnProperty(item, 'id') && typeof item.id === 'number') {
      return item.id === itemId
    }
    return false
  })

  const index = getIndex(items, itemId)

  if (index === -1) {
    return [...items, entity]
  } else {
    return [
      ...items.slice(0, index),
      entity,
      ...items.slice(index + 1),
    ]
  }

}

export const entitiesSuccess = (entities: Object): Object[] => {
  return Object.values(entities)
}

export const entityRemove = (items: Array<Object>, itemId: number): Array<Object> => {
  return items.filter(item => {
    if (hasOwnProperty(item, 'id') && typeof item.id === 'number') {
      return item.id !== itemId
    }
    return false
  })
}
