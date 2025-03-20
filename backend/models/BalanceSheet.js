import mongoose from "mongoose";

const balanceSheetSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now, // Automatically sets the date when created
    },
    assets: {
      type: Number,
      required: true,
    },
    liabilities: {
      type: Number,
      required: true,
    },
    equity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "", // Optional field for additional details
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

const BalanceSheet = mongoose.model("BalanceSheet", balanceSheetSchema);

export default BalanceSheet;
