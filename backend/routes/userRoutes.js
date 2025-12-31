import express from "express";

const router = express.Router();


import { createUser, loginUser, getUserProfile,getAllUsers ,editUser, changePassword,logout,forgotPassword,verifyOTP,getUsersByRole} from "../controllers/userController.js";
import verifyToken from "../middleware/Auth.js";
import { authorize, developerOnly } from "../middleware/Autho.js";


router.post("/register",authorize(['SuperAdmin']), createUser);
router.post("/login",  loginUser);
router.get("/all",authorize(['SuperAdmin',"Sales","TL"]),getAllUsers);
router.get(
  "/",
  authorize(["SuperAdmin", "Sales", "TL"]),
  getUsersByRole
);

router.get("/profile/:id",verifyToken, getUserProfile);
router.put("/edit/:id",verifyToken,authorize(['SuperAdmin']), editUser);
router.put("/change-password/", verifyToken, changePassword);
router.post("/logout",verifyToken,logout)
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
 
export default router;
  