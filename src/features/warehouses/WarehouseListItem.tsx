import React from 'react'

interface IWarehouseListItem {
  name: string,
  description?: string,
  address?: string,
}

export default function WarehouseListItem({ name, address, description }: IWarehouseListItem) {
  return (
    <li>
      {name} | {description} | {address}
    </li>
  )
}
