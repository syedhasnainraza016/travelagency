const express = require("express");
const router = express.Router();

const hotel_controller = require("../controllers/hotel.controller");

router.get("/test", hotel_controller.test);

router.get("/add", hotel_controller.add);
router.post("/add", hotel_controller.create);

router.get("/all", admin.all);
router.get("/:id", hotel_controller.details);
router.get("/update/:id", hotel_controller.update);
router.post("/update/:id", hotel_controller.updateStudent);
router.get("/delete/:id", hotel_controller.delete);

router.get("/report/all", hotel_controller.allReport);

module.exports = router;
