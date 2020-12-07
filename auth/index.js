const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

//Express Setup
const webApp = express();
webApp.use(express.json());
webApp.use(cors());

const webPORT = process.env.PORT || 5000;

webApp.listen(webPORT, () => console.log(`Web App listening on port: ${webPORT}`));

//Mongoose Setup
mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
    }, 
    (err) => {
        if (err) throw err;
        console.log("MongoDB connection established.")
    }
);

//Routes Setup
webApp.use("/users", require("./routes/userRouter"));
webApp.use("/items", require("./routes/itemRouter"));