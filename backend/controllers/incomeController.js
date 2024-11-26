const Income = require("../models/Income");

// Add Income
const addIncome = async (req, res) => {
  console.log("here")
  const { month, amount } = req.body;
  try {
    const existingIncome = await Income.findOne({ user: req.user.id, month });
    if (existingIncome) {
      return res.status(400).json({ message: "Income for this month already exists." });
    }

    const income = await Income.create({
      user: req.user.id,
      month,
      amount,
    });

    res.status(201).json(income);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Lock Monthly Income
const lockIncome = async (req, res) => {
  console.log("called")

  const { month } = req.body;
  try {
    const income = await Income.findOne({ user: req.user.id, month });
    // const income = await Income.findOne({ month });
    console.log("income",income)
    // if (!income) return res.status(404).json({ message: "Income not found." });

    income.locked = true;
    await income.save();

    res.status(200).json({ message: "Income locked successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Income for the User
const getIncome = async (req, res) => {
  try {
    const income = await Income.find({ user: req.user.id });
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addIncome, lockIncome, getIncome };
