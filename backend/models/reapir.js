import mongoose from 'mongoose';

const repairSchema = mongoose.Schema(
    {
        vehicleNumber: { type: String, required: true },
        issue: { type: String, required: true },
        status: { type: String, enum: ['pending', 'in progress', 'completed'], default: 'pending' },
        costEstimate: { type: Number }
    },
    { timestamps: true }
);

export default mongoose.model('Repair', repairSchema);
