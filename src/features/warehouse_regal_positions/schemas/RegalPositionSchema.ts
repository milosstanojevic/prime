import { schema } from 'normalizr'

const regalPositionSchema = new schema.Entity('regal_positions')

export const schemas = {
  REGAL_POSITION: regalPositionSchema,
  REGAL_POSITIONS: [regalPositionSchema],
  regalPositionSchema,
}
