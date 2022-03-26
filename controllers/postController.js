const User = require("../model/User");
const Post = require("../model/Post");
const bcrypt = require("bcrypt");

const postController = {
	logAuth: async (req,res) => {
		const { username,password: p } = req.body;
		if(username === "") return res.status(403).send("Username is required!");
		if(p === "") return res.status(403).send("Password is required!");

		try{
			const user = await User.findOne({ username });

			if(!user) return res.status(403).send("Username or password is not correct!");

			const pass = await bcrypt.compare(p,user.password);
			if(!pass) return res.status(403).send("Username or password is not correct!");
            
            const { password, ...others } = user._doc;
            // console.log(user);
			return res.status(200).send(others);
		} catch(error){
			return res.status(501).send(error);
		}
		
	},
	createAcount: async (req,res) => {
		const { username,email,password } = req.body;
		if(username === "") return res.status(403).send("Username is required!");
		if(email === "") return res.status(403).send("Email is required!");
		if(password === "") return res.status(403).send("Password is required!");

		const hashedPassword = await bcrypt.hash(password,13);

		try{
			await new User({
			username,
			email,
			password: hashedPassword
		})
		 .save()
		 .then(data => {
		 	return res.status(200).send("Data saved!")
		 })
		 .catch(error => console.log(error))

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
				message: "Test testing"
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