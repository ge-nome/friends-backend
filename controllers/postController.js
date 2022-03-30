const User = require("../model/User");
const Post = require("../model/Post");
const bcrypt = require("bcrypt");

const postController = {
	logAuth: async (req,res) => {
		const { email,password: p } = req.body;
		if(email === "") return res.status(403).send("Email is required!");
		if(p === "") return res.status(403).send("Password is required!");

		try{
			const user = await User.findOne({ email });

			if(!user) return res.status(403).send("Email or password is not correct!");

			const pass = await bcrypt.compare(p,user.password);
			if(!pass) return res.status(403).send("Email or password is not correct!");
			
			return res.status(200).send(user);

		} catch(error){
			return res.status(501).send(error);
		}
		
	},
	createAcount: async (req,res) => {
		const { username,email,number,password } = req.body;
		if(username === "") return res.status(403).send("Full name is required!");
		if(email === "") return res.status(403).send("Email is required!");
		if(number === "") return res.status(403).send("Number is required!");
		if(password === "") return res.status(403).send("Password is required!");

		try{

			const checkIfEmailExit = await User.findOne({ email });
			if(checkIfEmailExit) return res.status(403).send("Email Already Exist!");

			const hashedPassword = await bcrypt.hash(password,13);

			await new User({
				username,
				email,
				number,
				password: hashedPassword
			})
			  .save()
			  .then(data => {
			  	return res.status(200).send("Account created!")
			  })
			   .catch(error => {
			   	return res.status(403).send(error)
			   })
		} catch(error){
			return res.status(503).send(error)
		}
	},
	// POST METHODS
	userPost: async (req,res) => {
		const { id } = req.params;
		try{
			const userInfo = await User.findById({ _id: id });
			if(!userInfo) return res.status(403).send("Invalid User ID");

			await new Post({
				userId: userInfo._id,
				username: userInfo.username,
				profileImage: userInfo.profileImage,
				message: req.body.message,
				emoji: req.body.emoji
			})
			 .save()
			 .then(data => {
			 	return res.status(200).send("Posted!")
			 })
			 .catch(error => {
			 	return res.status(403).send(error)
			 })


		} catch(error){
			return res.status(503).send(error);
		}
	}
}

module.exports = postController;