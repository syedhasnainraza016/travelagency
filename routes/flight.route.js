const express = require("express");
const router = express.Router();

const flight_controller = require("../controllers/flight.controller");


router.get("/add", flight_controller.add);
router.post("/add", flight_controller.create);

router.get("/all", flight_controller.all);
router.get("/:id", flight_controller.details);
router.get("/update/:id", flight_controller.update);
router.post("/update/:id", flight_controller.updateFlight);
router.get("/delete/:id", flight_controller.delete);

router.get("/report/all", flight_controller.allReport);


module.exports = router;
