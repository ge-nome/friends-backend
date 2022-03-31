const mongoose = require("mongoose");
const { Schema } = mongoose;
const ConversationSchema = new Schema({
	members:[
	   {
	   	 type: mongoose.Schema.Types.ObjectId,
		 ref: "User"
	   }
	]
},{ timestamps: true });

module.exports = mongoose.model("Conversation",ConversationSchema);