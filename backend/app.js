import express from "express";

let app = express();

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/errors.js";
import path from "path";

 import { fileURLToPath } from "url";

let __filename = fileURLToPath(import.meta.url)
let __dirname = path.dirname(__filename);

// handle uncaught exceptions

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err}`);
    console.log("server rejected");
    server.close(() => {
        process.exit(1);
    })
})

if (process.env.NODE_ENV !== "PRODUCTION") {
    
dotenv.config({ path: "backend/config/config.env" });
}



//connecting to database
connectDatabase()

// Middleware to parse incoming JSON requests
app.use(express.json({limit: '10mb', verify:(req, res, buf)=>{
    req.rawBody = buf.toString()
}}));
app.use(cookieParser());


//import all routes 
import productRoutes from "./routes/product.js";
import authRoutes from "./routes/auth.js";
//import orderRoutes from "./routes/order.js";
import orderRoutes from "./routes/order.js";
import paymentRoutes from "./routes/payment.js";



app.use('/api', productRoutes);
app.use("/api", authRoutes);
//app.use("/api", orderRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);

if (process.env.NODE_ENV === "PRODUCTION") {
    app.use(express.static(path.join(__dirname, "../frontend/build")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
    })
}

app.use(errorMiddleware);

let server = app.listen(process.env.PORT, () => {
    console.log(`server started on port:${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
});

// Unhandled promise rejection

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err}`);
    console.log("server rejected");
    server.close(() => {
        process.exit(1);
    })
})