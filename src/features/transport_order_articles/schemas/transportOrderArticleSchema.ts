import { schema } from 'normalizr'

const transportOrderArticle = new schema.Entity('transport_order_articles')

export const schemas = {
  TRANSPORT_ORDER_ARTICLE: transportOrderArticle,
  TRANSPORT_ORDER_ARTICLES: [transportOrderArticle],
  transportOrderArticle,
}
