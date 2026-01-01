import mongoose from "mongoose";
const userneuralschema = new mongoose.Schema(
    {
        username:{
            type : String,
            required:true,
            trim:true
        },
         email:{
            type : String,
            required:true,
            trim:true,
            unique:true,
            lowercase:true,
        },
        password:{
            type:String,
            required:true,
            minlength:6
        },  
    },
     {
         timestamps:true,
        }
)
const User = mongoose.model("user" , userneuralschema);
export default User;