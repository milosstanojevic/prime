import { schema } from 'normalizr'

const merchantArticleSchema = new schema.Entity('merchant_articles')

export const schemas = {
  MERCHANT_ARTICLE: merchantArticleSchema,
  MERCHANT_ARTICLES: [merchantArticleSchema],
  merchantArticleSchema,
}
