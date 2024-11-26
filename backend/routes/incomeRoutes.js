const express = require("express");
const { addIncome, lockIncome, getIncome } = require("../controllers/incomeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/", authMiddleware, addIncome);
router.patch("/lock", authMiddleware, lockIncome);
router.get("/", authMiddleware, getIncome);

module.exports = router;
