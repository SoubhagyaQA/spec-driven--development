const mongoose = require("mongoose");
const Expense = require("../expenses/expense.model");

//Monthly Summary
const getMonthlySummary = async (userId, month, year) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  const result = await Expense.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        date: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: "$category" },
    {
      $group: {
        _id: "$category.name",
        total: { $sum: "$amount" },
      },
    },
    {
      $group: {
        _id: null,
        totalSpend: { $sum: "$total" },
        categories: {
          $push: {
            name: "$_id",
            total: "$total",
          },
        },
      },
    },
  ]);

  return result[0] || { totalSpend: 0, categories: [] };
};

//Trends (last 6 months)
const getTrends = async (userId) => {
  const result = await Expense.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
        },
        total: { $sum: "$amount" },
      },
    },
    {
      $sort: {
        "_id.year": -1,
        "_id.month": -1,
      },
    },
    { $limit: 6 },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        total: 1,
      },
    },
  ]);

  return result;
};

module.exports = {
  getMonthlySummary,
  getTrends,
};