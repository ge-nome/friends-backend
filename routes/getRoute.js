const router = require("express").Router();
const getController = require("../controllers/getController");
// Page not found
const pageNotFound = require("../controllers/pageNotFound");

// fetch all the users on the plateform
router.route("/")
      .get(getController.indexPage)

// Fetch user profile
router.route("/profile/:id")
      .get(getController.profileFile)

// fetch all the post on the plateform
router.route("/posts")
      .get(getController.fetchPost)

// Page not found!
router.route("*")
      .get(pageNotFound.error)


module.exports = router;