module.exports = {
  development: {
    // username: process.env.DATABASE_USER,
    // password: process.env.DATABASE_PASSWORD,
    // database: process.env.DATABASE_DB,
    // host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true
    },
    use_env_variable: "DATABASE_URL"
  },
  test: {
    // username: process.env.DATABASE_USER,
    // password: process.env.DATABASE_PASSWORD,
    // database: process.env.DATABASE_DB,
    // host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true
    },
    use_env_variable: "DATABASE_URL"
  },
  production: {
    // username: process.env.DATABASE_USER,
    // password: process.env.DATABASE_PASSWORD,
    // database: process.env.DATABASE_DB,
    // host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true
    },
    use_env_variable: "DATABASE_URL"
  }
}
