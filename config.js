import dotenv from "dotenv"
dotenv.config()
const config={
    PORT: process.env.PORT||3000,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    DB_HOST: process.env.DATABASE_HOST,
    DB_USER:process.env.DATABASE_USER,
    DB_PASSWORD:process.env.DATABASE_PASSWORD,
    DB_NAME: process.env.DATABASE_NAME

}

export default config;