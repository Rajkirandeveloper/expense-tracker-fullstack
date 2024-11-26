const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  month: { type: String, required: true },
  amount: { type: Number, required: true },
  locked: { type: Boolean, default: false },
});

module.exports = mongoose.model("Income", IncomeSchema);
