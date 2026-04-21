const mongoose = require("mongoose");

const summarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    month: Number,
    year: Number,
    totalSpend: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Summary", summarySchema);