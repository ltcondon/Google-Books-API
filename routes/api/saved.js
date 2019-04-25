const router = require("express").Router();
const savedController = require("../../controllers/savedController");

router.route("/")
  .get(savedController.findAll)
  .post(savedController.create);

router
  .route("/:id")
  .delete(savedController.remove);

module.exports = router;