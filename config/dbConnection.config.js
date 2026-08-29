const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        const mongoUri = process.env.atlasPort;

        if (!mongoUri) {
            console.log("MongoDB URI is not configured. Please set MONGODB_URI in your environment.");
            return;
        }

        await mongoose.connect(mongoUri);
        console.log("Database Connected");
    } catch (error) {
        console.log("Error in connecting database", error.message);
    }
};

module.exports = dbConnection;