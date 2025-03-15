import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  bankSlip: { type: String, required: true },
  status: { type: String, enum: ["pending", "verified"], default: "pending" },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Payment", paymentSchema);
