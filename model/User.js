const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
    username: {
    	type: String,
    	unique: true,
    	required: true
    },
    email: {
    	type: String
    },
    profileImage:{
        type: String,
        default: "default.png"
    },
    password: {
    	type: String,
    	required: true
    },
    friendsList: {
        type: Array
    }
});

module.exports = mongoose.model("User",UserSchema);