// Author: Saurav Navdhare
// Used MVC architecture

// Importing modules
const express = require("express"); // Import express
const app = express();
require("dotenv").config(); // load .env file
const cookieParser = require("cookie-parser");  // Import cookie parser to parse cookies
const mongoose = require("mongoose");   // Import mongoose to connect to database
const bodyParser = require("body-parser");  // Import body parser to parse body of POST request

const userRoutes = require("./routes/loginSystem"); // Import routes

// Setting up the server
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/", userRoutes);

// Connecting to the database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    const Port = process.env.PORT || 3000;
    // Starting the server
    app.listen(Port, () => {
        console.log(`Server running on port ${Port}`);
    });
}).catch((err)=>{
    throw err;
})
