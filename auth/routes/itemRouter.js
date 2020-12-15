const router = require("express").Router();
const Item = require("../models/itemModel");
const {v4: uuidv4}= require("uuid");

//List Item Post Request
router.post("/list", async (req, res) => {
    try {
        let { boughtPrice, seller } = req.body;
        
        //Validation
        if( !seller )
            return res
                .status(400)
                .json({msg: "Error no logged in user, when making request."});
        if( !boughtPrice )
            return res
                .status(400)
                .json({msg: "Purchased price not recieved."});

        const itemId = uuidv4();
        const existingItem = await Item.findOne({id:itemId});
        if( existingItem )
            return res
                .status(400)
                .json({msg:"Item already exists with this item id."});

        //20 Percent Markup
        const newPrice = (boughtPrice * 0.2) + boughtPrice;

        const newItem = new Item({
            id: itemId,
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
        let { id, buyer } = req.body;
        if ( !buyer )
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

        let savedItem = await Item.findOneAndUpdate({id:id}, {listed: false, buyer: buyer});
        res.json(savedItem);

    }   catch(err) {
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