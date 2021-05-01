import { schema } from 'normalizr'

const transportDestinationArticleSchema = new schema.Entity('transport_destination_articles')

export const schemas = {
  TRANSPORT_DESTINATION_ARTICLE: transportDestinationArticleSchema,
  TRANSPORT_DESTINATION_ARTICLES: [transportDestinationArticleSchema],
  transportDestinationArticleSchema,
}
