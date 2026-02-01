import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        connectionString: env.get('DATABASE_URL'),
        ssl: {
          rejectUnauthorized: false, // Autorise les certificats auto-signés d'Aiven
        },
      },
      pool: {
        min: 0, // Libère les connexions dès qu'elles sont inutilisées
        max: 2, // Limite pour ne pas saturer les plans gratuits
        acquireTimeoutMillis: 90000, // Laisse 90s pour établir la connexion
      },
    },
  },
})

export default dbConfig
