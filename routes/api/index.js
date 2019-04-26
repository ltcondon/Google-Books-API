const router = require("express").Router();
const savedRoutes = require("./saved");

// Book routes
router.use("/books", savedRoutes);


module.exports = router;
