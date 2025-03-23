import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    }
});

// Auto-increment leave ID
leaveSchema.pre("save", async function (next) {
    if (!this.id) {
        const lastLeave = await mongoose.model("Leave").findOne({}, {}, { sort: { id: -1 } });
        this.id = lastLeave ? lastLeave.id + 1 : 1;
    }
    next();
});

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;
