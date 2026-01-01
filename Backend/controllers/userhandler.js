 import User from "../Models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from 'validator'

const creatToken = (id)=>{
    return  jwt.sign({id} , process.env.JWT_SECRET , {expiresIn:"7d"})
}
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

  
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all credentials",
      });
    }
 
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found, please signup first",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
 
    const token =  creatToken(user._id);
    res.status(200).json({
      success: true,
      message: "Login successful",
      token ,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

 export const useregister = async(req,res)=>{
    try {
        const {name , email , password} = req.body;
          if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Please enter all credentials",
      });
    }
    const ifexits = await User.findOne({email});
    if(ifexits){
        return res.json({success:false , message:'user already exists please Log In'})
    }
    if(!validator.isEmail(email)){
        return res.json({success:false, message : 'please enter the valid email'})
    }
    if(password.length < 6){
        return res.json({success:false, message : 'please enter  more than 10 characters'})
    }
const salting = await bcrypt.genSalt(10);
const hashedpassword = await bcrypt.hash(password , salting);
 const Newuser = new User({
    username:name,
    email:email,
    password:hashedpassword
 });
 const user = await Newuser.save();
 const userId = user._id;
 const token = creatToken(user._id);
 res.json({success:true , message : 'Registared successfully' , token  , userId})
    } catch (error) {
        res.json({success:false , message:'error errorr error'})
    }
}

export const fetchusersinfo = async(req,res)=>{
  try {
    const {id} = req.body;
   const finduser =  await User.findById(id);
   if(finduser){
     res.json({success:true, finduser})
   }else{
     res.json({success:false, message:'user does not axists'})

   }
  } catch (error) {
     res.json({success:false, message:'user does not axists'})
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ success: false });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
