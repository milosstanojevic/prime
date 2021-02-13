import { schema } from 'normalizr'

const transportSchema = new schema.Entity('transports')

export const schemas = {
  TRANSPORT: transportSchema,
  TRANSPORTS: [transportSchema],
  transportSchema,
}
