const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

//Express Setup
const webApp = express();
const mobileApp = express();
webApp.use(express.json());
webApp.use(cors());
mobileApp.use(express.json());
mobileApp.use(cors());

const webPORT = process.env.PORT || 5000;
const mobilePORT = process.env.PORT || 5001;

webApp.listen(webPORT, () => console.log(`Web App listening on port: ${webPORT}`));
mobileApp.listen(mobilePORT, () => console.log(`Mobile App listening on port: ${mobilePORT}`));

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
mobileApp.use("/users", require("./routes/userRouter"));