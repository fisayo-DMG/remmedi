const express = require("express");
const router = express.Router();
const {
  getPrescriptions,
  addPrescription,
  deletePrescription,
  completeDosage
} = require("../controllers/prescriptions");

router
  .route("/")
  .get(getPrescriptions)
  .post(addPrescription);

router.route("/update").post(completeDosage);

router
    .route("/:id")
    .delete(deletePrescription)
    .patch(completeDosage)

module.exports = router;
