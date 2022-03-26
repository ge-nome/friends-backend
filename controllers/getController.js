const User = require("../model/User");
const Post = require("../model/Post");

const getController = {
	// Users On the plateform
	indexPage: async (req,res) => {
		const users = await User.find();
		try{
			// const { password, ...others } = users._doc;
			return res.status(200).send(users);
		} catch(err){
			return res.status(501).send(err);
		}
	},
	// profile page base on user
	profileFile: async (req,res) => {
		const { id } = req.params 	
		try{
			const userId = await User.findById({ _id: id}) && await Post.findById({ userId: id});
			if(!userId) return res.status(403).send("User does not Exist");
			const { password,...others } = userId._doc;
			// return res.status(200).send(others);
			return console.log(others);

		} catch(err){
			return res.status(501).send(err);
		}
	},
	// Fetch post and display it to the user(s)
	fetchPost: async (req,res) => {
		const posts = await Post.find();
		try{
			return res.status(200).send(posts);

		} catch(error){
			return res.status(503).send(error);
		}
	}
}

module.exports = getController;