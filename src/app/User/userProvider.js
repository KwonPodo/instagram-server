const baseResponseStatus = require("../../../config/baseResponseStatus");
const { pool } = require("../../../config/database");
const { response, errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveUserList = async function (userInfo) {
  //email을 인자로 받는 경우와 받지 않는 경우를 구분하여 하나의 함수에서 두 가지 기능을 처리함
  try {
    if (!userInfo) {
      // connection 은 db와의 연결을 도와줌
      const connection = await pool.getConnection(async (conn) => conn);
      // Dao 쿼리문의 결과를 호출
      const userListResult = await userDao.selectUser(connection);
      // connection 해제
      connection.release();

      return response(baseResponseStatus.SUCCESS, userListResult);
    } else if (userInfo.email != null) {
      const connection = await pool.getConnection(async (conn) => conn);
      const userListResult = await userDao.selectUserEmail(
        connection,
        userInfo.email
      );
      connection.release();

      if (Array.isArray(userListResult) && userListResult.length === 0)
        return errResponse(baseResponseStatus.USER_USEREMAIL_NOT_EXIST);
      return response(baseResponseStatus.SUCCESS, userListResult);
    } else if (userInfo.username != null) {
      const connection = await pool.getConnection(async (conn) => conn);
      const userListResult = await userDao.selectUserName(
        connection,
        userInfo.username
      );
      connection.release();

      if (Array.isArray(userListResult) && userListResult.length === 0)
        return errResponse(baseResponseStatus.USER_USERNAME_NOT_EXIST);
      return response(baseResponseStatus.SUCCESS, userListResult);
    } else if (userInfo.userId != null) {
      const connection = await pool.getConnection(async (conn) => conn);
      const userListResult = await userDao.selectUserId(
        connection,
        userInfo.userId
      );
      connection.release();

      if (Array.isArray(userListResult) && userListResult.length === 0)
        return errResponse(baseResponseStatus.USER_USERID_NOT_EXIST);
      return response(baseResponseStatus.SUCCESS, userListResult);
    }
  } catch (err) {
    logger.error(`App - retrieveUserList err\n: ${err.message}`);
    return errResponse(baseResponseStatus.DB_ERROR);
  }
};

exports.retrieveUser = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userResult = await userDao.selectUserId(connection, userId);

  connection.release();

  return userResult[0]; // 한 명의 유저 정보만을 불러오므로 배열 타입을 리턴하는 게 아닌 0번 인덱스를 파싱해서 오브젝트 타입 리턴
};

exports.getFollowings = async function (followerId) {
  try {
    const connection = await pool.getConnection();
    const getFollowerIdx = await userDao.selectUserName(connection, followerId);
    console.log(`getFollowerIdx[0].userIdx:`, getFollowerIdx[0].userIdx);
    const getFollowings = await userDao.selectFollowing(
      connection,
      getFollowerIdx[0].userIdx
    );
    connection.release();

    console.log(`getFollowings:`, getFollowings);
    if (getFollowings.length <= 0) {
      return errResponse(baseResponseStatus.FOLLOWEE_LIST_EMPTY);
    }
    return getFollowings;
  } catch (err) {
    logger.error(`App - followUser error\n: ${err.message}`);
    return errResponse(baseResponseStatus.DB_ERROR);
  }
};

exports.getFollowers = async function (followingId) {
  try {
    const connection = await pool.getConnection();
    const getFollowingIdx = await userDao.selectUserName(
      connection,
      followingId
    );
    console.log(`getFollowingIdx[0].userIdx:`, getFollowingIdx[0].userIdx);
    const getFollowers = await userDao.selectFollowers(
      connection,
      getFollowingIdx[0].userIdx
    );
    connection.release();

    console.log(`getFollowers:`, getFollowers);
    if (getFollowers.length <= 0) {
      return errResponse(baseResponseStatus.FOLLOWER_LIST_EMPTY);
    }

    return getFollowers;
  } catch (err) {
    logger.error(`App - followUser error\n: ${err.message}`);
    return errResponse(baseResponseStatus.DB_ERROR);
  }
};

exports.retrieveFollowStatus = async function (followerId, followingId) {
  const connection = await pool.getConnection();
  const retrieveStatusResult = await userDao.selectFollowStatus(
    connection,
    followerId,
    followingId
  );
  connection.release();

  console.log(retrieveStatusResult);
  return retrieveStatusResult;
};

exports.emailCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await userDao.selectUserEmail(connection, email);
  connection.release();

  return emailCheckResult;
};

exports.passwordCheck = async function (selectUserPasswordParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  // 쿼리문에 여러개의 인자를 전달할 때 selectUserPasswordParams와 같이 사용합니다.
  const passwordCheckResult = await userDao.selectUserPassword(
    connection,
    selectUserPasswordParams
  );
  connection.release();
  return passwordCheckResult[0];
};

exports.accountCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAccountResult = await userDao.selectUserAccount(connection, email);
  connection.release();

  return userAccountResult;
};
