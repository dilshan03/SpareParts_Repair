const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
    items: [
      {
        itemName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    repairs: [
      {
        repairType: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ['pending', 'Accepted', 'Rejected'], // ✅ All lowercase
      default: 'pending' // ✅ Default value should match enum case
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quotation', quotationSchema);
