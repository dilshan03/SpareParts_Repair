import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        position: { type: String, required: true },
        salary: { type: Number, required: true }
    },
    { timestamps: true }
);

export default mongoose.model('Employee', employeeSchema);
