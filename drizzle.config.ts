import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "src/schemas/",
  dialect: 'postgresql',
  dbCredentials: {
    host: "ep-floral-meadow-a1ljgwim-pooler.ap-southeast-1.aws.neon.tech",
    database: "storygenerator-db",
    user: "storygenerator-db_owner",
    password: "26JTHozdnIgF",
    ssl: 'require',
  },
  verbose: true,
  strict: true,
})