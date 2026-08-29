const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
    title:{
        type: String,
        requires: true,
    },
    category:{
        type: String,
        requires: true,
        enum:["Programming","Design","Marketing","Bussiness","Photography","Music","Other"],
    },
    level:{
        type: String,
        requires: true,
        enum:["Beginner","Intermediate","Advanced"],
    },
    duration:{
        type: String,
        requires: true,
    },
    instructor:{
        type: String,
        requires: true,
    },  
    price:{
        type: Number,
        requires: true,
    },
    image:{
        type: String,
        requires: true, 
    },
    status:{
        type: String,
        requires: true,
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Skill", skillSchema);