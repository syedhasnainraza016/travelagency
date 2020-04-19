const express = require("express");
const router = express.Router();

const resturant_controller = require("../controllers/resturant.controller");


router.get("/add", resturant_controller.add);
router.post("/add", resturant_controller.create);

router.get("/all", resturant_controller.all);
router.get("/:id", resturant_controller.details);
router.get("/update/:id", resturant_controller.update);
router.post("/update/:id", resturant_controller.updateResturant);
router.get("/delete/:id", resturant_controller.delete);

router.get("/report/all", resturant_controller.allReport);


module.exports = router;
