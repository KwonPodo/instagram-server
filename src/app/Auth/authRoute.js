import express from "express";
import * as auth from "./authController.js";
import { isAuth } from "../../../config/jwtMiddleware.js";
import * as validate from "../../../config/validator.js";

const router = express.Router();

// 0. 테스트 API
router.get("/test", auth.getTest);

// 1.1 유저 생성 (회원가입) API
// /app/auth/signup
router.post("/signup", validate.signup, auth.create);

// 1.1 유저 정보 수정 API
router.patch("/edit", validate.edit, isAuth, auth.edit);

// 2.1 유저 로그인 API
// app/auth/login
router.post("/login", validate.credential, auth.login);

// 로그인 하기 API (JWT 생성)
//app.post("/login", auth.login);
//router.get("/auto-login", jwtMiddleware, auth.check);
// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
//app.get("/app/auto-login", jwtMiddleware, auth.check);

// TODO: 탈퇴하기 API

export default router;
