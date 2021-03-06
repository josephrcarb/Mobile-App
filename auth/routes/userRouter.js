const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

//Register Post Requests
router.post("/register", async (req, res) => {
    try {
        let {email, password, passwordCheck, displayName } = req.body;

        //Validation
        //All fields have been entered
        if(!email || !password || !passwordCheck)
            return res
                .status(400)
                .json({msg: "Not all fields have been entered."});
        
        //Password is correct length
        if(password.length < 5)
            return res
                .status(400)
                .json({msg: "Password is not at least 5 characters long."});

        //Passwords match
        if(password !== passwordCheck)
            return res
                .status(400)
                .json({msg: "Passwords do not match."});

        //No existing User exists
        const existingUser = await User.findOne({email: email});
        if(existingUser)
            return res
                .status(400)
                .json({msg: "Already existing user with given email."});

        //Is displayname field empty
        if(!displayName) displayName = email;
        
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);


        //Register a new User
        const newUser = new User({
            email,
            password: passwordHash,
            displayName,
            amountBought: 0,
            amountSold: 0,
        });
        const savedUser = await newUser.save();
        res.json(savedUser);

    }   catch (err) {
        res.status(500).json({error: err.message});
    }
});

//Login Post Requests
router.post("/login", async(req, res) => {
    try{
        const { email, password } = req.body;

        //Validation
        //All fields inputted.
        if(!email || !password)
            return res
                .status(400)
                .json({msg: "Not all fields have been entered."});
        
        //User exists with the given email.
        const user = await User.findOne({email : email});
        if(!user)
            return res
                .status(400)
                .json({msg:"No account found with this email."});
        
        //Credentials work
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res
                .status(400)
                .json({msg: "Invalid user credentials."});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            token,
            user:{
                id: user._id,
                displayName: user.displayName,
            },
        })
        
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

//Delete Account Request
router.delete("/delete", auth, async (req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

//Verify Token Request
router.post("/tokenIsValid", async( req, res) => {
    try {
        const token = req.header("x-auth-token");
        if(!token)
            return res
                .json(false);
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified)
            return res
                .json(false);
        const user = await User.findById(verified.id);
        if(!user)
            return res
                .json(false);

        return res.json(true);

    } catch(err){
        res.status(500).json({error: err.message});
    }
});

//Get User Data Request
router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        displayName: user.displayName,
        id: user._id,
        amountBought: user.amountBought,
        amountSold: user.amountSold,
    });
});

module.exports = router;