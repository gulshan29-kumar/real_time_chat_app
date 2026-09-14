import mongoose from "mongoose";

let isConnected = false;

// Function to connect to the mongodb database with connection pooling and fast-fail diagnostics
export const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("MONGODB_URI is not configured. Please add MONGODB_URI to your Vercel Project Settings > Environment Variables.");
    }

    if (uri.includes("<password>") || uri.includes("<db_password>")) {
        throw new Error("MONGODB_URI still contains '<password>'. Please replace it with your actual MongoDB Atlas password.");
    }

    try {
        const connectionString = uri.includes('?') 
            ? uri 
            : `${uri.replace(/\/$/, '')}/chat-app`;

        await mongoose.connect(connectionString, {
            serverSelectionTimeoutMS: 5000, // Fail fast after 5s instead of hanging
        });
        isConnected = true;
        console.log("MongoDB Connected successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        throw error;
    }
};