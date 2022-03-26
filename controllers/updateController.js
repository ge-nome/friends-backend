const Post = require("../model/Post");

const updateController = {
	updateUserPost: async (req,res) => {
		const { id } = req.params;
		try{

			const findUser = await Post.findByIdAndUpdate({ _id: id },{
				message: req.body.msg
			})
			if(!findUser) return res.status(403).send("Error");

			return res.status(200).send("Post Updated!");

		} catch(error){
			return res.status(503).send(error);
		}
	}
}

module.exports = updateController