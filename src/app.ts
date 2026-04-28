import express from "express"
import { errorHandler } from "./middlewares/error-handler"
import { notFound } from "./middlewares/not-found"
import cors from "cors"
import cookieParser from "cookie-parser"
import { router } from "./routes"

const app = express()

app.use(cookieParser())

const allowedOrigins = process.env.FRONTEND_URL!.split(",")
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    }),
)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use("/api", router)

app.use(notFound)
app.use(errorHandler)

export default app
