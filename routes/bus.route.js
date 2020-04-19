const express = require("express");
const router = express.Router();

const bus_controller = require("../controllers/bus.controller");


router.get("/add", bus_controller.add);
router.post("/add", bus_controller.create);

router.get("/all", bus_controller.all);
router.get("/:id", bus_controller.details);
router.get("/update/:id", bus_controller.update);
router.post("/update/:id", bus_controller.updateBus);
router.get("/delete/:id", bus_controller.delete);

router.get("/report/all", bus_controller.allReport);

module.exports = router;
