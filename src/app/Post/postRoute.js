import express from "express";
import * as post from "./postController.js";
import { isAuth } from "../../../config/jwtMiddleware.js";
import * as validate from "../../../config/validator.js";

const router = express.Router();

/**
 * 4.1 게시물 조회 API
 */
router.get("/:userId", post.getPosts);

/**
 * 4.2 게시물 생성 API
 */
router.post("/", isAuth, post.create);

/**
 * 4.3 게시물 삭제 API
 */
router.patch("/:postIdx", isAuth, post.delPost);

/**
 * 4.4 게시물 수정 API
 */
router.put("/:postIdx", isAuth, post.edit);

export default router;
