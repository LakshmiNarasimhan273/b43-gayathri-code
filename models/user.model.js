const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema(
    {
    userName:{
        type: String,
      required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength:8,
    },
},
{ timeatamps: true}
);

const User = mongoose.model("users",userSchema);
module.exports = userSchema;

