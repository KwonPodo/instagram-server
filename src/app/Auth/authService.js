import * as bcrypt from "bcrypt";
import { logger } from "../../../config/winston.js";
import promisePool from "../../../config/database.js";
import secret_config from "../../../config/secret.js";
import { createJwtToken } from "../../../config/jwtMiddleware.js";
import baseResponse from "../../../config/baseResponseStatus.js";
import { response, errResponse } from "../../../config/response.js";

// user 뿐만 아니라 다른 도메인의 Provider와 Dao도 아래처럼 require하여 사용할 수 있습니다.
import * as authProvider from "./authProvider.js";
import * as authDao from "./authDao.js";

// Service: Create, Update, Delete 비즈니스 로직 처리

export async function createUser(username, password, email, userId, url) {
  try {
    // 이메일 중복 확인
    // UserProvider에서 해당 이메일과 같은 User 목록을 받아서 emailRows에 저장한 후, 배열의 길이를 검사한다.
    // -> 길이가 0 이상이면 이미 해당 이메일을 갖고 있는 User가 조회된다는 의미
    const emailRows = await authProvider.emailCheck(email);
    console.log(`emailRows: `, emailRows);
    if (emailRows.length > 0)
      return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(
      password,
      secret_config.bcryptSaltRounds
    );

    // 쿼리문에 사용할 변수 값을 배열 형태로 전달
    const insertUserInfoParams = [username, hashedPassword, email, userId, url];

    const connection = await promisePool.getConnection(async (conn) => conn);

    const userIdResult = await authDao.insertUserInfo(
      connection,
      insertUserInfoParams
    );
    const insertUserIdx = userIdResult[0].insertId;
    console.log("userIdResult: ", userIdResult);
    console.log(`추가된 회원 :`, insertUserIdx);

    connection.release();
    // JWT token 생성
    const token = createJwtToken(insertUserIdx);

    return response(baseResponse.SUCCESS, {
      token: token,
      userIdx: insertUserIdx,
    });
  } catch (err) {
    logger.error(`App - createUser Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
}

export async function editUser(userIdx, username, userId, url) {
  try {
    const updateUserInfoParams = [username, userId, url, userIdx];
    const connection = await promisePool.getConnection(async (conn) => conn);
    const editResult = await authDao.updateUserInfo(
      connection,
      updateUserInfoParams
    );
    connection.release();
    console.log(editResult);

    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - createUser Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
}

// login
export async function postSignIn(email, password) {
  try {
    // 이메일 여부 확인
    const emailRows = await authProvider.emailCheck(email);
    if (emailRows.length < 1)
      return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);
    console.log("emailRows: ", emailRows);

    const user = emailRows[0];
    const selectEmail = user.email;
    console.log(selectEmail);

    // 비밀번호 확인 (입력한 비밀번호를 암호화한 것과 DB에 저장된 비밀번호가 일치하는 지 확인함
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
    }

    // 계정 상태 확인
    if (user.status === "INACTIVE") {
      return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    } else if (user.status === "DELETED") {
      return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    }

    //토큰 생성 Service
    let token = createJwtToken(user.userIdx);

    return response(baseResponse.SUCCESS, {
      userId: user.userId,
      jwt: token,
    });
  } catch (err) {
    logger.error(
      `App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(
        err
      )}`
    );
    return errResponse(baseResponse.DB_ERROR);
  }
}
