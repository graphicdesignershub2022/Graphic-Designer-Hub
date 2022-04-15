const express = require("express");
const app = express();

const bodyParser=require ("body-Parser");
const fileupload=require("express-fileupload");


const errorMiddleware = require("./middleware/error")
app.use(express.json())

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser());
app.use(fileupload());


//Route imports
const designer = require("./routes/designerRoute");

app.use("/api/v1",designer);

//user route
const user = require("./routes/userRoute");
app.use("/api/v1",user);

//order route
const  order = require("./routes/orderRoute");
app.use("/api/v1",order);






//MiddleWare For Error
app.use(errorMiddleware);

module.exports = app
