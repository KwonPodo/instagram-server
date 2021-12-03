import baseResponse from "../../../config/baseResponseStatus.js";
import { response, errResponse } from "../../../config/response.js";
import { logger } from "../../../config/winston.js";
import promisePool from "../../../config/database.js";

import * as userDao from "./userDao.js";

// Provider: Read 비즈니스 로직 처리

export async function retrieveUser(userId) {
  const connection = await promisePool.getConnection(async (conn) => conn);
  const userResult = await userDao.selectUserId(connection, userId);

  connection.release();

  return userResult[0]; // 한 명의 유저 정보만을 불러오므로 배열 타입을 리턴하는 게 아닌 0번 인덱스를 파싱해서 오브젝트 타입 리턴
}

export async function emailCheck(email) {
  const connection = await promisePool.getConnection(async (conn) => conn);
  const emailCheckResult = await userDao.selectUserEmail(connection, email);
  connection.release();

  return emailCheckResult;
}

export async function passwordCheck(selectUserPasswordParams) {
  const connection = await promisePool.getConnection(async (conn) => conn);
  // 쿼리문에 여러개의 인자를 전달할 때 selectUserPasswordParams와 같이 사용합니다.
  const passwordCheckResult = await userDao.selectUserPassword(
    connection,
    selectUserPasswordParams
  );
  connection.release();
  return passwordCheckResult;
}

export async function accountCheck(email) {
  const connection = await promisePool.getConnection(async (conn) => conn);
  const userAccountResult = await userDao.selectUserAccount(connection, email);
  connection.release();

  return userAccountResult;
}
