const User = require("../model/User");
const Post = require("../model/Post");

const getController = {
	// Users On the platform
	indexPage: async (req,res) => {
		const users = await User.find();
		try{
			return res.status(200).send(users);
		} catch(err){
			return res.status(501).send(err);
		}
	},
	// profile page base on user
	profileFile: async (req,res) => {
		const { id } = req.params 	
		try{
			const user = await User.findById({ _id: id });
			if(!user) return res.status(403).send("Empty!");
			return res.status(200).send(user);
			// const { password,...others } = userId._doc;
			// return res.status(200).send(user);
			// return console.log(others);
		} catch(err){
			return res.status(501).send(err);
		}
	},
	// Fetch post and display it to the user(s)
	fetchPost: async (req,res) => {
		const posts = await Post.find().sort({ createdAt: -1});
		try{
			return res.status(200).send(posts);

		} catch(error){
			return res.status(503).send(error);
		}
	},
	fetchPostBaseOnUser: async (req,res) => {
		const myId = await Post.findOne({ userId: req.params.id });
		if(!myId) return res.status(403).send("Empty!");

		return res.status(200).send(myId);
	}
}

module.exports = getController;