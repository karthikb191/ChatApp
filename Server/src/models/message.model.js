import mongoose from "mongoose";

var messageSchema = new mongoose.Schema(
{
    senderId: {
        type : String,
        required : true
    },
    receiverId: {
        type : String,
        required : true
    },
    message: String,

    //TODO: Add an image
});

var messageModel = new mongoose.model("Message", messageSchema);

export default messageModel;