const router = require("express").Router();
const productRouter = require("./productRouter");
const HomeController = require("../controllers/homeController");

router.get("/", HomeController.homePage);
router.use("/products", productRouter);

module.exports = router;
