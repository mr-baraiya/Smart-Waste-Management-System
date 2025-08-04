const express = require("express");
const router = express.Router();
const controller = require("../controllers/wasteClassificationHistory.controller");
const auth = require("../middlewares/auth");

// Protected routes
router.post("/", auth, controller.createClassification);
router.get("/", auth, controller.getMyClassifications);
router.delete("/:id", auth, controller.deleteClassificationById);
router.delete("/", auth, controller.clearMyClassifications);

module.exports = router;
