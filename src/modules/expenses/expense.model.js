const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    amount: {type: Number,required: [true, "Amount is required"],min: [1, "Amount must be greater than 0"]},
    categoryId: {type: mongoose.Schema.Types.ObjectId,ref: "Category",required: true,index: true},
    userId: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true,index: true},
    date: {type: Date,required: true},
    notes: {type: String,trim: true,maxlength: 200,},
  },
  { timestamps: true }
);
module.exports = mongoose.model("Expense", expenseSchema);