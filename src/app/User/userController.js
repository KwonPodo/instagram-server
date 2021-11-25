const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const regexEmail = require("regex-email");
const { POST_NOT_EXIST } = require("../../../config/baseResponseStatus");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
exports.getTest = async function (req, res) {
  return res.send(response(baseResponse.SUCCESS));
};

/**
 * API No. 1.1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {
  /**
   * Body: username, email, userId, password, profileImgIdx
   */
  const { username, email, userId, password, profileImgIdx } = req.body;

  // 빈 값 체크
  if (!email) return res.send(errResponse(baseResponse.SIGNUP_EMAIL_EMPTY));

  // 길이 체크
  if (email.length > 30)
    return res.send(errResponse(baseResponse.SIGNUP_EMAIL_LENGTH));

  // 형식 체크 (by 정규표현식)
  if (!regexEmail.test(email))
    return res.send(errResponse(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

  // createUser 함수 실행을 통한 결과 값을 signUpResponse에 저장
  const signUpResponse = await userService.createUser(
    username,
    email,
    userId,
    password,
    profileImgIdx
  );

  // signUpResponse 값을 json으로 전달
  return res.status(201).send(signUpResponse);
};

/**
 * API No. 3.1
 * API Name : 유저 조회 API (+ 이메일, 이름, 아이디로 검색 조회)
 * [GET] /app/users
 */
exports.getUsers = async function (req, res) {
  /**
   * Query String: email, userId, username
   */
  const userInfo = {
    email: null,
    userId: null,
    username: null,
  };
  userInfo.email = req.query.email;
  userInfo.userId = req.query.userId;
  userInfo.username = req.query.username;

  if (Object.values(userInfo).every((val) => val == null)) {
    // 유저 전체 조회
    const userListResult = await userProvider.retrieveUserList();
    // SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" }, 메세지와 함께 userListResult 호출
    return res.status(200).send(response(baseResponse.SUCCESS, userListResult));
  } else {
    const retrieveUserListResponse = await userProvider.retrieveUserList(
      userInfo
    );
    return res.status(200).send(retrieveUserListResponse);
  }
};

/**
 * API No. 3.2
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
exports.getUserById = async function (req, res, next) {
  /**
   * Path Variable: userId
   */
  const userId = req.params.userId;
  // errResponse 전달
  if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

  // userId를 통한 유저 검색 함수 호출 및 결과 저장
  const userByUserId = await userProvider.retrieveUser(userId);
  if (!userByUserId) {
    return res.send(errResponse(baseResponse.USER_USERID_NOT_EXIST));
  }
  req.userId = userByUserId;
  next();
};

/**
 * API No. 4
 * API Name : 특정 유저 탈퇴(삭제) API
 * [DELETE] /app/users
 */
exports.delUserById = async function (req, res) {
  /**
   * Query String : userId
   */
  const userId = req.query.userId;
  // errResponse 전달
  if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

  // Validation: userId를 통한 유저 유무 조회
  const userByUserId = await userProvider.retrieveUser(userId);
  if (!userByUserId) {
    return res.send(errResponse(baseResponse.USER_USERID_NOT_EXIST));
  }
  const delUserResponse = await userService.delUser(userId);
  return res.send(delUserResponse);
};

// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {
  const { email, password } = req.body;

  // Validation
  if (!regexEmail.test(email)) {
    return errResponse(baseResponse.SIGNIN_EMAIL_ERROR_TYPE);
  }

  const signInResponse = await userService.postSignIn(email, password);

  return res.send(signInResponse);
};

/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : username
 */
exports.patchUsers = async function (req, res) {
  // jwt - userId, userIdx, path variable :userId

  console.log(req.verifiedToken);
  const userIdFromJWT = req.verifiedToken.userId;

  const userId = req.params.userId;
  const username = req.body.username;

  // JWT는 이 후 주차에 다룰 내용
  if (userIdFromJWT != userId) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    if (!username)
      return res.send(errResponse(baseResponse.USER_USERNAME_EMPTY));

    const editUserInfo = await userService.editUser(userId, username);
    return res.send(editUserInfo);
  }
};

// JWT 이 후 주차에 다룰 내용
/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
  const userIdResult = req.verifiedToken.userId;
  console.log(userIdResult);
  return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};

/**
 * API NO. 5.1
 * API Name : 팔로잉 유저 조회 API
 * [PUT] /app/:userId/following
 */
exports.following = async function (req, res) {
  // path variable :followerUserId
  const followerUserId = req.params.userId;

  const followingResult = await userProvider.getFollowings(followerUserId);
  console.log(`followerUserId:`, followerUserId);
  console.log(`followingResult:`, followingResult);
  return res.send(response(baseResponse.SUCCESS, followingResult));
};

/**
 * API NO. 5.2
 * API Name : 팔로워 유저 조회 API
 * [PUT] /app/:userId/followers
 */
exports.followers = async function (req, res) {
  // path variable: followingUserId

  const followingUserId = req.params.userId;

  const followersResult = await userProvider.getFollowers(followingUserId);
  console.log("followingUserId", followingUserId);
  console.log("followersResult:", followersResult);
  return res.send(response(baseResponse.SUCCESS, followersResult));
};
