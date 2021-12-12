import baseResponse from "../../../config/baseResponseStatus.js";
import { response, errResponse } from "../../../config/response.js";
import promisePool from "../../../config/database.js";

import * as authDao from "./authDao.js";

// Provider: Read 비즈니스 로직 처리

export async function emailCheck(email) {
  const connection = await promisePool.getConnection(async (conn) => conn);
  const emailCheckResult = await authDao.selectUserEmail(connection, email);
  connection.release();

  return emailCheckResult;
}

export async function passwordCheck(selectUserPasswordParams) {
  const connection = await promisePool.getConnection(async (conn) => conn);
  // 쿼리문에 여러개의 인자를 전달할 때 selectUserPasswordParams와 같이 사용합니다.
  const passwordCheckResult = await authDao.selectUserPassword(
    connection,
    selectUserPasswordParams
  );
  connection.release();
  return passwordCheckResult;
}

export async function accountCheck(email) {
  const connection = await promisePool.getConnection(async (conn) => conn);
  const userAccountResult = await authDao.selectUserAccount(connection, email);
  connection.release();

  return userAccountResult;
}
