import mongoose from 'mongoose'

export const ConnectMongoDB = async () =>
{
    try
    {
        var connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected: " + connect.connection.host);
    }
    catch(error)
    {
        console.error("MongoDB connection error: " + error);
    }
}