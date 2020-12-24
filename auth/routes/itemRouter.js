const router = require("express").Router();
const Item = require("../models/itemModel");
const User = require("../models/userModel");
const {v4: uuidv4}= require("uuid");

//List Item Post Request
router.post("/list", async (req, res) => {
    try {
        let boughtPrice = req.body.price;
        let seller = req.body.userId;
        let name = req.body.name;
        let condition = req.body.condition;
        let file = req.body.file;
        
        //Validation
        if( !seller )
            return res
                .status(400)
                .json({msg: "Error no logged in user, when making request."});
        if( !boughtPrice )
            return res
                .status(400)
                .json({msg: "Purchased price not recieved."});
        if( !name || !condition)
            return res
                .status(400)
                .json({msg: "Not all fields have been entere."});
        if( name.length > 20 || condition.length > 20 )
            return res
                .status(400)
                .json({msg: "Condition or Name is too long."});


        const itemId = uuidv4();
        const existingItem = await Item.findOne({id:itemId});
        if( existingItem )
            return res
                .status(400)
                .json({msg:"Item already exists with this item id."});

        //20 Percent Markup
        const newPrice = (boughtPrice * 0.2) + boughtPrice;
        let newUser = await User.findOneAndUpdate({_id:seller},{$inc: {amountSold: boughtPrice}});
        const newItem = new Item({
            id: itemId,
            name,
            condition,
            listed: true,
            boughtPrice,
            sellPrice: newPrice,
            seller,
            buyer: undefined,
        });
        const savedItem = await newItem.save();
        res.json(savedItem);

    }   catch (err) {
        res.status(500).json({error: err.message});
    }   
});

//Buy item Post Request
router.post("/buy", async (req, res) => {
    try {
        let id = req.body.productId;
        let buyerId = req.body.userId;
        if ( !buyerId )
            return res
                .status(400)
                .json({msg: "Error no logged in user, when making request."});
        if ( !id )
            return res
                .status(400)
                .json({msg: "Item's Id not recieved in request."});


        const existingItem = await Item.findOne({id:id});
        if( !existingItem )
            return res
                .status(400)
                .json({msg: "No item exists with this identifier."});
        if(!existingItem.listed)
            return res
                .status(400)
                .json({msg:"Can not sell a non-listed item."});
                
        

        let savedItem = await Item.findOneAndUpdate({id:id}, {listed: false, buyer: buyerId},{new: true});
        let newUser = await User.findOneAndUpdate({_id:buyerId},{$inc: {amountBought: savedItem.sellPrice}},{new: true});
        res.json(savedItem);

    }   catch(err) {
        res.status(500).json({error: err.message});
    }
});


router.get("/sold",  async (req, res) => {
    try{
        let sellerId = req.query.id;
        if(!sellerId)
            return res
                .status(400)
                .json({msg: "Seller id missing."})
        const items = await Item.find({seller: sellerId});
        if(!items){
            return res
                    .status(400)
                    .json({msg:"No items found."});
        }
        const itemMap = {};
        items.forEach((item) => {
            itemMap[item._id] = item;
        });
        res.json({
            items: itemMap,
        });
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.get("/bought",  async (req, res) => {
    try{
        let buyerId = req.query.id;
        if(!buyerId)
            return res
                .status(400)
                .json({msg: "Buyer id missing."})
        const items = await Item.find({listed: false, buyer: buyerId});
        if(!items){
            return res
                    .status(400)
                    .json({msg:"No items found."});
        }
        const itemMap = {};
        items.forEach((item) => {
            itemMap[item._id] = item;
        });
        res.json({
            items: itemMap,
        });
    }catch(err){
        res.status(500).json({error: err.message});
    }

});

//Get Database of listed items
router.get("/",  async (req, res) => {
    const items = await Item.find({listed: true});
    if(!items){
        return res
                .status(400)
                .json({msg:"No items found."});
    }
    const itemMap = {};
    items.forEach((item) => {
        itemMap[item._id] = item;
    });
    res.json({
        items: itemMap,
    });
});

module.exports = router;