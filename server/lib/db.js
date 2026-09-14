import mongoose from "mongoose";

let isConnected = false;

// Function to connect to the mongodb database with connection pooling for serverless
export const connectDB = async () => {
    if (isConnected || mongoose.connection.readyState === 1) {
        return;
    }
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.warn("MONGODB_URI is not configured yet in environment variables.");
            return;
        }
        mongoose.connection.on('connected', () => console.log('Database Connected'));
        const connectionString = uri.includes('?') 
            ? uri 
            : `${uri.replace(/\/$/, '')}/chat-app`;
        await mongoose.connect(connectionString);
        isConnected = true;
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
}