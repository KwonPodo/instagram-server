import express from "express";
import * as user from "./userController.js";
import * as validate from "../../../config/validator.js";

const router = express.Router();

// 0. 테스트 API
router.get("/test", user.getTest);

// 1.1 유저 생성 (회원가입) API
// /app/auth/signup
router.post("/signup", validate.signup, user.create);

// 1.2 유저 로그인 API
// app/auth/login
router.post("/login", validate.credential, user.login);

// 로그인 하기 API (JWT 생성)
//app.post("/login", user.login);
//router.get("/auto-login", jwtMiddleware, user.check);
// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
//app.get("/app/auto-login", jwtMiddleware, user.check);

// TODO: 탈퇴하기 API

export default router;
