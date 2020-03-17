const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  numOfTablets: {
    type: Number,
    required: true
  },
  numOfTimesPerDay: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  completedDosage: {
    type: Boolean,
    default: false
  },
  // duration: [
  //   {
  //     day: {
  //       type: String,
  //       required: true
  //     },
  //     morning: {
  //       type: Boolean,
  //       required: true
  //     },
  //     afternoon: Boolean,
  //     evenining: Boolean
  //   }
  // ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Prescription', TransactionSchema);
