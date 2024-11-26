const Expense = require("../models/expense");
const Income = require("../models/Income");

// Add Expense
// const addExpense = async (req, res) => {
//   const { title, amount, category, date } = req.body;

//   try {
//     // Check if monthly income is locked
//     const income = await Income.findOne({ user: req.user.id, month: date.split("-")[1] });
//     if (!income) return res.status(400).json({ message: "No income set for this month." });
//     if (income.locked) return res.status(400).json({ message: "Income for this month is locked." });

//     const expense = await Expense.create({
//       user: req.user.id,
//       title,
//       amount,
//       category,
//       date,
//     });

//     res.status(201).json(expense);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };


const addExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;

 

  try {
    // Check if monthly income exists and is unlocked
    const income = await Income.findOne({ user: req.user.id, month: date.split("-")[1] });
    
    if (!income) {
      return res.status(400).json({ message: "No income set for this month." });
    }

    if (income.locked) {
      return res.status(400).json({ message: "Income for this month is locked." });
    }

    // Create a new expense
    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category,
      date,
    });

    // Return the created expense
    return res.status(201).json(expense);

  } catch (err) {
    console.error("Error creating expense:", err);
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};


// Edit Expense


const editExpense = async (req, res) => {
  console.log( req.params)
  const { id } = req.params;  // Extract the expense ID from the request params
  const { title, amount, category, date } = req.body;  // Extract new values from the request body

  try {
    // Find the expense in the database by its ID
    const expense = await Expense.findById(id);

    // If the expense is not found, return a 404 error
    if (!expense) {
      return res.status(404).json({ message: "Expense not found." });
    }

    
    // Update only the fields that were provided in the request
    if (title) expense.title = title;
    if (amount) expense.amount = amount;
    if (category) expense.category = category;
    if (date) expense.date = date;

    console.log("updated expense",expense)
    // Save the updated expense to the database
    const updatedExpense = await expense.save();

    // Return the updated expense in the response
    return res.status(200).json(updatedExpense);

  } catch (err) {
    // Log the error for debugging
    console.error("Error in editing expense:", err);

    // Check if it's a validation or database-related error
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: "Invalid data format." });
    }

    // Return a 500 error for server-side issues
    return res.status(500).json({ message: "Server Error. Please try again later." });
  }
};


// Delete Expense
const deleteExpense = async (req, res) => {

  const { id } = req.params;
  console.log("called, id",id)

  try {
    // const expense = await Expense.findById(id);
    // console.log("called, expense",expense)
    // if (!expense) return res.status(404).json({ message: "Expense not found." });

    // if (expense.user.toString() !== req.user.id)
    //   return res.status(401).json({ message: "Unauthorized action." });

    const expenseDeleted = await Expense.findByIdAndDelete(id);
    res.json({message: "Expense deleted successfully.",expenseDeleted})
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Expenses for a Month

const getExpenses = async (req, res) => {


  try {
    const expenses = await Expense.find({
      user: req.user.id,
      
    });
   
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};



module.exports = { addExpense, editExpense, deleteExpense, getExpenses };
