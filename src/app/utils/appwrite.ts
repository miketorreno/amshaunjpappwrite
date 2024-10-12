import { Client, Databases } from 'appwrite'

export const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('670a5029002b9cc2cd0e')

export const databases = new Databases(client)
