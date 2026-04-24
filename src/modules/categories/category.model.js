const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {type: String,required: [true, "Category name is required"],trim: true,minlength: 2,maxlength: 50},
    userId: {type: mongoose.Schema.Types.ObjectId,ref: "User",index: true},
    isDefault: {type: Boolean,default: false, index: true}},
  { timestamps: true }
);
categorySchema.index({ name: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Category", categorySchema);