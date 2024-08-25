import express from "express";
import {
  addToken,
  getUserByAddress,
  removeToken,
  saveUser,
} from "../controllers/UserController.js";

const router = express.Router();

router.get("/user/:address", getUserByAddress);
router.post("/user", saveUser);
router.put("/addToken", addToken);
router.put("/removeToken", removeToken);

// router.get("/users/:id", getUserById)

export default router;
