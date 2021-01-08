import { schema } from 'normalizr'

const warehouseSchema = new schema.Entity('warehouses')

export const schemas = {
  WAREHOUSE: warehouseSchema,
  WAREHOUSES: [warehouseSchema],
  warehouseSchema,
}
