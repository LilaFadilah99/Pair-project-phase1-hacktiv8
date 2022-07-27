const router = require("express").Router();
const ProductController = require("../controllers/productController");


router.get("/:id/detail", ProductController.detailProduct);
router.use((req, res, next) => {
  if (!req.session.userId) {
    const error = "please login first!";
    res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
});
router.get("/:id/thank", ProductController.thankYouPage);
router.get("/:id/category", ProductController.productCategory);
router.get("/:id/buy", ProductController.buyProducts);
router.use((req, res, next) => {
  if (req.session.userId && req.session.role !== "admin") {
    const error = "You have no accsess";
    res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
});
router.get("/add", ProductController.addProducts);
router.post("/add", ProductController.submitNewProduct);
router.get("/emptyList", ProductController.emptyListProducts);
router.get("/:id/restock", ProductController.restockProduct);
router.post("/:id/restock", ProductController.submitNewEmptyStock);
router.get("/:id/delete", ProductController.deleteEmptyListProduct);

module.exports = router;
