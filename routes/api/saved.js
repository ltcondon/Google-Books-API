const router = require("express").Router();
const savedController = require("../../controllers/savedController");

router.route("/saved")
  .get(savedController.findAll)
  .post(savedController.create);

router
  .route("/saved/:id")
  .delete(savedController.remove);

module.exports = router;