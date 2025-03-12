import mongoose from 'mongoose';

const financeSchema = mongoose.Schema(
    {
        type: { type: String, enum: ['income', 'expense'], required: true },
        amount: { type: Number, required: true },
        description: { type: String }
    },
    { timestamps: true }
);

export default mongoose.model('Finance', financeSchema);
