import * as authService from "./authService.js";
import baseResponse from "../../../config/baseResponseStatus.js";
import { response, errResponse } from "../../../config/response.js";

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
export async function getTest(req, res) {
  return res.send(response(baseResponse.SUCCESS));
}

/**
 * API No. 1.1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
export async function create(req, res) {
  /**
   * Body: username, email, userId, password, url
   */
  const { username, password, email, userId, url } = req.body;

  // createUser 함수 실행을 통한 결과 값을 signUpResponse에 저장
  const signUpResponse = await authService.createUser(
    username,
    password,
    email,
    userId,
    url
  );

  // signUpResponse 값을 json으로 전달
  return res.status(201).json(signUpResponse);
}

/**
 * API No. 1.2
 * API Name : 유저 정보 수정 API
 * [POST] /app/users/edit
 */
export async function edit(req, res) {
  const userIdx = req.userIdx;
  console.log(`Edit API - userIdx: ${userIdx}`, req.userIdx);

  const { username, userId, url } = req.body;

  const editResponse = await authService.editUser(
    userIdx,
    username,
    userId,
    url
  );

  return res.send(editResponse);
}

/**
 * API No. 2.1
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
export async function login(req, res) {
  const { email, password } = req.body;
  const signInResponse = await authService.postSignIn(email, password);

  return res.send(signInResponse);
}
