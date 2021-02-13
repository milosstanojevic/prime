import { schema } from 'normalizr'

const regalSchema = new schema.Entity('regals')

export const schemas = {
  REGAL: regalSchema,
  REGALS: [regalSchema],
  regalSchema,
}
