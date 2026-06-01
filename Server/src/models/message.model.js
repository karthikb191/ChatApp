import mongoose, { Schema } from "mongoose"

var messageSchema = new mongoose.Schema(
{
    senderId: {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    receiverId: {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    text: 
    {
        type : String
    }
    //TODO: Add an image
},
{timestamps: true}
);

var MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;