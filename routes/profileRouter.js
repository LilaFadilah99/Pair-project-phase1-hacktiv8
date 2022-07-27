const router = require("express").Router();
const ProfileController = require("../controllers/profileController");

router.get("/", ProfileController.profile);
router.get("/:id/add", ProfileController.addProfile);
router.post("/:id/add", ProfileController.submitUserProfile);
router.get("/:id/edit", ProfileController.editProfile);
router.post("/:id/edit", ProfileController.submitEditProfile);

module.exports = router;
