import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Create a new user
export const createUser = async (req, res) => {
  const { name, email, password, department, designation, role, slackId } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required." });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "Email already exists." });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    department,
    designation,
    role,
    slackId
  });
  const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

  const token = jwt.sign({ id: newUser._id, role: newUser.role, email: newUser.email, name: newUser.name }, JWT_SECRET, { expiresIn: "1d" });

  res.cookie("token", token, {
    httpOnly: true,       // JS cannot access
    sameSite: "lax",
    secure: false,   // CSRF protection
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });

};


// login user
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required." });
//   }

//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ message: "Invalid email or password" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

//   const token = jwt.sign({ id: user._id, role: user.role, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: "1d" });
//   // req.cookies.token = token;
//   res.cookie("token", token, {
//     httpOnly: false,
//     sameSite: "lax",
//     secure: false,
//     maxAge: 24 * 60 * 60 * 1000,
//   });

//   //console.log("Created JWT:", token);

//   res.json({ message: "Login successful" });
//   // server login response
//   // res
//   //   .cookie("token", token, { httpOnly: true })
//   //   .json({ role: user.role, name: user.name }); // send minimal info

// }

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

  if (!email || !password) {
    return res.status(400).json({
      code: "MISSING_FIELDS",
      message: "Email and password are required."
    });
  }

  const user = await User.findOne({ email });

  // EMAIL NOT FOUND
  if (!user) {
    return res.status(400).json({
      code: "EMAIL_NOT_FOUND",
      message: "Email is not registered."
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  // WRONG PASSWORD
  if (!isMatch) {
    return res.status(400).json({
      code: "WRONG_PASSWORD",
      message: "Password is incorrect."
    });
  }

  // SUCCESS
  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: false,
    sameSite: "lax",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.json({
    code: "LOGIN_SUCCESS",
    message: "Login successful",
    user: {
      name: user.name,
      role: user.role,
      email: user.email,
    }
  });
};

//Get All Users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
}

export const getUserProfile = async (req, res) => {
  const requestedUserId = req.params.id; // from URL
  const loggedInUser = req.user; // from token

  try {
    // Developers can only fetch their own profile
    if (loggedInUser.role !== "Admin" && requestedUserId !== loggedInUser.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await User.findById(requestedUserId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// edit user
export const editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("UserId",userId);
    
    const { name, email, department, designation, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, department, designation, role },
      { new: true }
    ).select("-password");
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}


export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Save new password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  console.log("email:- ",email);
  
  
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "No user found with this email" });
  }

  // Generate OTP (6 digits)
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.resetPasswordOTP = otp;
  user.resetPasswordExpires = Date.now() + 1000 * 60 * 10; // valid for 10 minutes
  await user.save();

  // Send email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "Password Reset OTP",
    html: `
      <h2>Your OTP Code</h2>
      <h3>${otp}</h3>
      <p>This OTP is valid for 10 minutes.</p>
    `,
  });

  return res.json({ message: "OTP sent to your email" });
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const user = await User.findOne({
    email,
    resetPasswordOTP: otp,
    resetPasswordExpires: { $gt: Date.now() }, // must be valid
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  // Generate a NEW random password
  const newPassword = crypto.randomBytes(4).toString("hex"); // 8 characters
  const hashed = await bcrypt.hash(newPassword, 10);

  // Update DB
  user.password = hashed;
  user.resetPasswordOTP = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  // Send new password via email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "Your New Password",
    html: `
      <h2>Password Reset Successful</h2>
      <p>Your new temporary password:</p>
      <h3>${newPassword}</h3>
      <p>Please log in and change your password immediately.</p>
    `,
  });

  return res.json({ message: "OTP verified, new password sent to email" });
};


export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // allow http for dev
    sameSite: "lax",
    path: "/", // must match the cookie path
  });
  res.json({ message: "Logged out successfully" });
};
  

