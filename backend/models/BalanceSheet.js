import mongoose from 'mongoose';

const BalanceSheetSchema = new mongoose.Schema({
  assets: { type: Number, required: true },
  liabilities: { type: Number, required: true },
  equity: { type: Number, required: true },
}, { timestamps: true });

const BalanceSheet = mongoose.model('BalanceSheet', BalanceSheetSchema);
export default BalanceSheet;
