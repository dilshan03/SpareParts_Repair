import mongoose from "mongoose";


// Define the schema for the repair request form
const RepairRequestFormSchema = new mongoose.Schema({
    customerNameR: { type: String, required: true }, // Customer's full name (Required)
    contactNumberR: { type: String, required: true }, // Contact number (Required)
    emailR: { type: String, required: true }, // Email address (Required)
    addressR: { type: String }, // Customer's address
    vehicleRegiNumberR: { type: String, required: true }, // Vehicle registration number (Required)
    vehicleMakeR: { type: String, required: true }, // Vehicle manufacturer (Required)
    vehicleModelR: { type: String, required: true }, // Vehicle model (Required)
    yearOfManufactureR: { type: Number, required: true }, // Year of manufacture (Required)
    mileageR: { type: Number }, // Vehicle mileage
    vehicleIdentiNumberR: { type: String }, // Vehicle Identification Number (VIN)
    vehiclePhotoR: { data: Buffer, contentType: String}, // Vehicle photo stored as binary data
    serviceTypeR: { type: String, required: true }, // Type of service requested (Required)
    descripIssueR: { type: String, required: true }, // Description of the issue (Required)
    prefDateAndTimeR: { type: Date, required: true }, // Preferred date and time for service (Required)
    urgencyLevelR: { type: String, enum: ['Normal', 'Urgent'], required: true }, // Urgency level (Required)
    paymentMethodR: { type: String, enum: ['Cash', 'Card', 'Online Payment'], required: true } // Payment method (Required)
});

// Create the model for the repair request form
const RepairRequestFormModel = mongoose.model("RepairRequestForm", RepairRequestFormSchema);

// Export the model for use in other parts of the application
// module.exports = RepairRequestFormModel;

export default RepairRequestFormModel;
