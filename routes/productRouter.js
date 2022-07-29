const router = require("express").Router();
const ProductController = require("../controllers/productController");
const isLoginMiddleWare = require("../middleware/loginMiddleware");
const isAdminMiddleware = require("../middleware/isAdminMiddleware");

router.get("/:id/detail", ProductController.detailProduct);
router.get("/:id/category", ProductController.productCategory);
router.use(isLoginMiddleWare);
router.get("/:id/thank", ProductController.thankYouPage);
router.get("/:id/buy", ProductController.buyProducts);
router.use(isAdminMiddleware);
router.get("/add", ProductController.addProducts);
router.post("/add", ProductController.submitNewProduct);
router.get("/emptyList", ProductController.emptyListProducts);
router.get("/:id/restock", ProductController.restockProduct);
router.post("/:id/restock", ProductController.submitNewEmptyStock);
router.get("/:id/delete", ProductController.deleteEmptyListProduct);

module.exports = router;
