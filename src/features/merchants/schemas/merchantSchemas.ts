import { schema } from 'normalizr'

const merchantSchema = new schema.Entity('merchants')

export const schemas = {
  MERCHANT: merchantSchema,
  MERCHANTS: [merchantSchema],
  merchantSchema,
}
