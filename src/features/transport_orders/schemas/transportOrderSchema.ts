import { schema } from 'normalizr'

const transportOrderSchema = new schema.Entity('transport_orders')

export const schemas = {
  TRANSPORT_ORDER: transportOrderSchema,
  TRANSPORT_ORDERS: [transportOrderSchema],
  transportOrderSchema,
}
