import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["income", "expense", "salary", "sales"], required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false },
});

export default mongoose.model("Transaction", transactionSchema);
