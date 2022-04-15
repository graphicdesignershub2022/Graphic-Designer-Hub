const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database")
const cloudinary = require("cloudinary");

//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down the server due to Uncaught Exception`);
    process.exit(1);
})



//Config
dotenv.config({path:"backend/config/config.env"});

//connectin to database
connectDatabase();


//Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on https://localhost:${process.env.PORT}`)
});




//UnHandled Promise Rejection
//for mongod worng connectionstring
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down this Server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });
});