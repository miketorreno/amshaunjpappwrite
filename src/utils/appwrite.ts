import { Client, Databases } from 'appwrite'

export const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('670a4f65002c2aa263bd') // [PROJECT_ID]

export const databases = new Databases(client)
