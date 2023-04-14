import mongoose from 'mongoose';
import validator from 'validator';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";


const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    validate: validator.isEmail,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: [6, "Password must be at least 6 characters long"],
    select: false,
  },
    mobile: {
        type: String,
        required: [true, "Please add a mobile number"],
        select : false,
    },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    enum: ["finder", "recruiter"],
    default: "finder",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: String,
});

schema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};




export const User = mongoose.model('User', schema);




