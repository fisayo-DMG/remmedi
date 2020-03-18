const Prescription = require("../models/Prescription");
// @desc Get all prescriptions
// @route GET /api/v1/transactions
// @access Public

exports.getPrescriptions = async (req, res, next) => {
  try {
    const prescriptions = await Prescription.find();
    return res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

// @desc add prescription
// @route POST /api/v1/transactions
// @access Public

exports.addPrescription = async (req, res, next) => {
  try {
    const {
      name,
      numOfTablets,
      numOfTimesPerDay,
      startDate,
      endDate,
      completedDosage
    } = req.body;
    const prescription = await Prescription.create(req.body);
    return res.status(201).json({
      success: true,
      data: prescription
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error"
      });
    }
  }
};

// @desc delete prescriptions
// @route DELETE /api/v1/transactions/:id
// @access Public

exports.deletePrescription = async (req, res, next) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      return res.status(404).json({
        success: false,
        error: "No prescription was found"
      });
    }

    await prescription.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

// @desc update prescriptions
// @route UPDATE /api/v1/transactions/:id
// @access Public

exports.completeDosage = async (req, res, next) => {
  const {completedDosage, id} = req.body
  try {
    const prescription = await Prescription.findOneAndUpdate(
      { _id: id },
      { completedDosage: completedDosage },
      { new: true }
    );
    if (!prescription) {
      return res.status(404).json({
        success: false,
        error: "No prescription was found"
      });
    }

    return res.status(200).json({
      success: true,
      data: prescription
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};
