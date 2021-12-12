import express from "express";
import * as user from "./userController.js";
import { isAuth } from "../../../config/jwtMiddleware.js";
import * as validate from "../../../config/validator.js";

const router = express.Router();

/**
 * 5.1 팔로잉 유저 조회 API
 */
router.get("/following", isAuth, user.getFollowing);

/**
 * 5.2 팔로워 유저 조회 API
 */
router.get("/followers", isAuth, user.getFollowers);

/**
 * 5.3 팔로우 API
 */
router.put("/:userId", isAuth, user.follow);

/**
 * 5.4 언팔로우 API
 */
router.patch("/:userId", isAuth, user.unfollow);

export default router;
