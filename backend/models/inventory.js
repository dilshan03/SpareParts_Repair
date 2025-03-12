import mongoose from 'mongoose';

const inventorySchema = mongoose.Schema(
    {
        partName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    },
    { timestamps: true }
);

export default mongoose.model('Inventory', inventorySchema);
