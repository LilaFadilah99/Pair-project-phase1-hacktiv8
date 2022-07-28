const router = require("express").Router();
const productRouter = require("./productRouter");
const profileRouter = require("./profileRouter");
const HomeController = require("../controllers/homeController");

router.get("/register", HomeController.registerForm);
router.post("/register", HomeController.submitRegister);
router.get("/login", HomeController.loginForm);
router.post("/login", HomeController.submitLoginUser);
router.get("/", HomeController.homePage);
router.use("/products", productRouter);

router.use((req, res, next) => {
  // console.log(req.session.userId);
  if (!req.session.userId) {
    const error = "please login first!";
    res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
});

router.use("/profile", profileRouter);
router.get("/logout", HomeController.getlogout);

module.exports = router;
