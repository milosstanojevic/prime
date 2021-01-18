import { schema } from 'normalizr'

const articleSchema = new schema.Entity('articles')

export const schemas = {
  ARTICLE: articleSchema,
  ARTICLES: [articleSchema],
  articleSchema,
}
