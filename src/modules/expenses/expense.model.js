const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    amount: {type: Number,required: [true, "Amount is required"],min: [1, "Amount must be greater than 0"]},
    categoryId: {type: mongoose.Schema.Types.ObjectId,ref: "Category",required: true},
    userId: {type: mongoose.Schema.Types.ObjectId,ref: "User"},
    date: {type: Date,required: true, default: Date.now,},
    notes: {type: String,trim: true,maxlength: 200}},
  {timestamps: true}
);

//Fetch user expenses sorted by date (MOST COMMON QUERY)
expenseSchema.index({ userId: 1, date: -1 });
//Filter by category + user
expenseSchema.index({ userId: 1, categoryId: 1 });
//Filter by date range
expenseSchema.index({ date: -1 });
//Optional: search in notes (only if needed)
expenseSchema.index({ notes: "text" });

module.exports = mongoose.model("Expense", expenseSchema);