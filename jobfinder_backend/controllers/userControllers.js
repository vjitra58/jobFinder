import {User} from "../models/userModel.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import {sendToken } from "../utils/sendToken.js";

export const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, mobile } = req.body;

    if(!name || !email || !password || !mobile)return next(new ErrorHandler("Please enter all fields", 400))

    const user = await User.findOne({email});
    if(user) return next(new ErrorHandler("User already exists", 400));

  const Newuser = await User.create({
    name,
    email,
    password,
    mobile,
    avatar: {
      public_id: "public_id",
      url: "url",
    },
  });


  sendToken(res, Newuser, "Registerd successfully", 201);

});