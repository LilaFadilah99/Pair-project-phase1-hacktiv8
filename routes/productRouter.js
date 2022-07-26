const router = require("express").Router();
const ProductController = require("../controllers/productController");

router.get("/add", ProductController.addProducts);
router.post("/add", ProductController.submitNewProduct);
router.get("/emptyList", ProductController.emptyListProducts);
router.get("/:id/restock", ProductController.restockProduct);
router.post("/:id/restock", ProductController.submitNewEmptyStock);
router.get("/:id/delete", ProductController.deleteEmptyListProduct);
router.get("/:id/thank", ProductController.thankYouPage);
router.get("/:id/category", ProductController.productCategory);
router.get("/:id/detail", ProductController.detailProduct);
router.get("/:id/buy", ProductController.buyProducts);

module.exports = router;
