import { schema } from 'normalizr'

const userSchema = new schema.Entity('users')

export const schemas = {
  USER: userSchema,
  USERS: [userSchema],
  userSchema,
}
