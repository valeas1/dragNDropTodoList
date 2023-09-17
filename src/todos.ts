export interface ITodo {
  _id?: string
  id?: string
  title: string
  completed: boolean
  index?: number
}

export const actions = {
  find: 'https://eu-central-1.aws.data.mongodb-api.com/app/data-qmioz/endpoint/data/v1/action/find',
  insertOne:
    'https://eu-central-1.aws.data.mongodb-api.com/app/data-qmioz/endpoint/data/v1/action/insertOne',
  deleteOne:
    'https://eu-central-1.aws.data.mongodb-api.com/app/data-qmioz/endpoint/data/v1/action/deleteOne',
  deleteMany:
    'https://eu-central-1.aws.data.mongodb-api.com/app/data-qmioz/endpoint/data/v1/action/deleteMany',
  updateOne:
    'https://eu-central-1.aws.data.mongodb-api.com/app/data-qmioz/endpoint/data/v1/action/updateOne'
}
