import { schema } from 'normalizr'

const warehouseArticleSchema = new schema.Entity('warehouse_articles')

export const schemas = {
  WAREHOUSE_ARTICLE: warehouseArticleSchema,
  WAREHOUSE_ARTICLES: [warehouseArticleSchema],
  warehouseArticleSchema,
}
