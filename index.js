const express = require("express");
const http = require("http");
const { mongoDBConnection } = require("./connection/databaseConnection");
const userRouter = require("./routes/user");
const productRoute = require("./routes/product")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const globalErrorHandler = require("./middleware/globalMiddlewareHandler")
const bodyparser = require("body-parser")


const app = express(http);
const PORT = process.env.PORT || 5544;

require("dotenv").config({path : "config/.env"})

app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(express.json({ extended: true, limit: "25mb" }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}))

app.use(cors({
    credentials : true,
    // origin : "http://localhost:3000"
    origin : ["https://shopnow-ruby.vercel.app", process.env.FRONTEND_URL]
}));

if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }

app.options("/", (req, res, next)=>{
    res.setHeader("Access-control-allow-origin", process.env.FRONTEND_URL);
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.setHeader("Access-Control-Max-Age", "3600");
    res.setHeader("Access-Control-Allow-Headers","Content-Type, Accept, X-Requested-With, Authorization");
    return next()
})

app.use("/website_ecommerce/app/api", userRouter); 
app.use("/website_ecommerce/app/api", productRoute);


app.use(globalErrorHandler)

mongoDBConnection(process.env.MONGO_DB_CONNECTION_URL)

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})