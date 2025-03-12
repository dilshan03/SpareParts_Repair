import mongoose from 'mongoose';

const quotationSchema = mongoose.Schema(
    {
        customerName: { type: String, required: true },
        items: [
            {
                partName: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true }
            }
        ],
        totalCost: { type: Number, required: true }
    },
    { timestamps: true }
);

export default mongoose.model('Quotation', quotationSchema);
