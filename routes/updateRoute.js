// Update route file
const router = require("express").Router()
const updateController = require("../controllers/updateController");

router.route("/posts/update/:id")
      .put(updateController.updateUserPost)


module.exports = router;