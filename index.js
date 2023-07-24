const express = require("express");
const http = require("http");
const { mongoDBConnection } = require("./connection/databaseConnection");
const userRouter = require("./routes/user");
const productRoute = require("./routes/product")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const globalErrorHandler = require("./middleware/globalMiddlewareHandler.js")
const bodyparser = require("body-parser")


const app = express(http);
const PORT = process.env.PORT || 5544;

// require("dotenv").config({path : "server/config/.env"})

app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(express.json({ extended: true, limit: "25mb" }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}))

app.use(cors({
    credentials : true,
    // origin : "http://localhost:3000"
    origin : ["https://shopnow-ruby.vercel.app", "http://localhost:3000"]
}));

app.options("/", (req, res, next)=>{
    res.setHeader("Access-control-allow-origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.setHeader("Access-Control-Max-Age", "3600");
    res.setHeader("Access-Control-Allow-Headers","Content-Type, Accept, X-Requested-With, Authorization");
    return next()
})

app.use("/website_ecommerce/app/api", userRouter); 
app.use("/website_ecommerce/app/api", productRoute);


app.use(globalErrorHandler)

mongoDBConnection("mongodb+srv://website_ecommerce:18May1994@cluster0.5qgqh.mongodb.net/website_ecommerce?retryWrites=true&w=majority")

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})