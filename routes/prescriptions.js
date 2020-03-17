const express = require('express');
const router = express.Router();
const {getPrescriptions, addPrescription, deletePrescription} = require('../controllers/prescriptions')

router
    .route('/')
    .get(getPrescriptions)
    .post(addPrescription);

router
    .route('/:id')
    .delete(deletePrescription);

module.exports = router;