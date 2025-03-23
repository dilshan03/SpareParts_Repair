import SparePart from "../models/Product.js";

// Add a new spare part with image upload
export const addSparePart = async (req, res) => {
    try {
        // Ensure file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Create the spare part object
        const sparePart = new SparePart({
            ...req.body,
            picture: req.file.path, // Save the image path in the database
        });

        const savedPart = await sparePart.save();
        res.status(201).json(savedPart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all spare parts with optional filtering by category & price range
export const getAllSpareParts = async (req, res) => {
    try {
        let filter = {};
        if (req.query.category) filter.category = req.query.category;
        if (req.query.minPrice || req.query.maxPrice) {
            filter.price = {};
            if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
            if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
        }
        const spareParts = await SparePart.find(filter);
        res.status(200).json(spareParts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get spare part by ID
export const getSparePartById = async (req, res) => {
    try {
        const sparePart = await SparePart.findById(req.params.id);
        if (!sparePart) return res.status(404).json({ message: "Spare part not found" });
        res.status(200).json(sparePart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a spare part by ID
export const updateSparePart = async (req, res) => {
    try {
        const updatedPart = await SparePart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPart) return res.status(404).json({ message: "Spare part not found" });
        res.status(200).json(updatedPart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a spare part by ID
export const deleteSparePart = async (req, res) => {
    try {
        const deletedPart = await SparePart.findByIdAndDelete(req.params.id);
        if (!deletedPart) return res.status(404).json({ message: "Spare part not found" });
        res.status(200).json({ message: "Spare part deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
