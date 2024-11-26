const express = require("express");
const {
  addExpense,
  editExpense,
  deleteExpense,
  getExpenses,
} = require("../controllers/expenseController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addExpense);
router.patch("/:id",  editExpense);
router.delete("/:id", deleteExpense);
router.get("/", authMiddleware, getExpenses);

module.exports = router;
