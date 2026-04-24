const mongoose = require("mongoose");

const summarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    month: Number,
    year: Number,
    totalSpend: Number,
  },
  { timestamps: true }
);

summarySchema.index({ userId: 1, year: 1, month: 1 }, { unique: true });

module.exports = mongoose.model("Summary", summarySchema);