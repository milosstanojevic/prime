import { schema } from 'normalizr'

const orderSchema = new schema.Entity('orders')

export const schemas = {
  ORDER: orderSchema,
  ORDERS: [orderSchema],
  orderSchema,
}
