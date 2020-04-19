const express = require("express");
const router = express.Router();

const hotel_controller = require("../controllers/hotel.controller");


router.get("/add", hotel_controller.add);
router.post("/add", hotel_controller.create);

router.get("/all", hotel_controller.all);
router.get("/:id", hotel_controller.details);
router.get("/update/:id", hotel_controller.update);
router.post("/update/:id", hotel_controller.updateHotel);
router.get("/delete/:id", hotel_controller.delete);

router.get("/report/all", hotel_controller.allReport);


module.exports = router;
