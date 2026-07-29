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
    description:{
        type: String,
        requires: true,
    },
    level:{
        type: String,
        requires: true,
        enum:["Beginner","Intermediate","Advanced"],
    },
    price:{
        type: Number,
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