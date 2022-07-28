const router = require("express").Router();
const productRouter = require("./productRouter");
const profileRouter = require("./profileRouter");
const HomeController = require("../controllers/homeController");
const isLoginMiddleWare = require('../middleware/loginMiddleware')


router.get("/register", HomeController.registerForm);
router.post("/register", HomeController.submitRegister);
router.get("/login", HomeController.loginForm);
router.post("/login", HomeController.submitLoginUser);
router.get("/", HomeController.homePage);
router.use("/products", productRouter);

router.use(isLoginMiddleWare);


router.use("/profile", profileRouter);
router.get("/logout", HomeController.getlogout);

module.exports = router;
