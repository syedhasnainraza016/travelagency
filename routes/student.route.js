const express = require("express");
const router = express.Router();

const student_controller = require("../controllers/student.controller");


router.get("/add", student_controller.add);
router.post("/add", student_controller.create);

router.get("/all", student_controller.all);
router.get("/:id", student_controller.details);
router.get("/update/:id", student_controller.update);
router.post("/update/:id", student_controller.updateStudent);
router.get("/delete/:id", student_controller.delete);
<<<<<<< HEAD
router.get("/app", student_controller.app);
=======
>>>>>>> 1c018a2b3648d894018b81306578b374efb2523d


module.exports = router;
