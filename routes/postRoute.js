// POST ROUTE
const router = require("express").Router();
const postController = require("../controllers/postController");

// login auth
router.route("/log/auth")
      .post(postController.logAuth)

// sign up
router.route("/create/user/auth")
      .post(postController.createAcount)

// Post Route
router.route("/post/user/:id")
      .post(postController.userPost)

module.exports = router;