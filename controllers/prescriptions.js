const Prescription = require("../models/Prescription");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
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

// exports.getPrescriptions = async (req, res, next) => {
//   try {
//     const prescriptions = await Prescription.find({email: req.body.email});
//     return res.status(200).json({
//       success: true,
//       count: prescriptions.length,
//       data: prescriptions
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       error: "Server Error"
//     });
//   }
// };

exports.getUserPrescriptions = async (req, res, next) => {
  try {
    const prescriptions = await Prescription.find({userID: req.params.id});
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
  // use middleware used to verify token to give req as userid property
  // use the id to get the email of user from the database
  // add userid to request body and email to mail body
  try {
    const {
      name,
      numOfTablets,
      numOfTimesPerDay,
      startDate,
      endDate,
      completedDosage,
      email
    } = req.body;
    const prescription = await Prescription.create(req.body);

    const transport = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "remmedi-app@hotmail.com",
        pass: process.env.USERPASS
      }
    });
    const mailOptions = {
      from: "remmedi-app@hotmail.com",
      to: email,
      subject: "Nodemailer Test",
      text: "This is a test message from Nodemailer"
    };

    let startTime = new Date(startDate);
    let endTime = new Date(endDate);
    // let startTime = new Date(Date.now() + 5000);
    // let endTime = new Date(startTime.getTime() + 180000);
    // let rule = "*/30 * * * * *";
    let rule = "30 15 * * *";
    let job = schedule.scheduleJob(
      {
        start: startTime,
        end: endTime,
        rule
      },
      () => {
        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("NOT ABLE TO SEND MAIL " + error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      }
    );

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
  const { completedDosage, id } = req.body;
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
