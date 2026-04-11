import mongoose from "mongoose";

var userSchema = new mongoose.Schema(
{
    email : 
    {
        type: String,
        required: true,
        unique: true,
    },
    username : 
    {
        type: String,
        required : true,
    },
    password:
    {
        type: String,
        required: true,
        minlength: 6,
    }

    //TODO: add image schema
}, 
{
    timestamps : true
} );


// User is transformed to users to refer to the collection in the database 
//Model based off the user schema
var userModel = mongoose.model("User", userSchema);


export default userModel;