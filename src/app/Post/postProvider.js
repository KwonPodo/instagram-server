const { pool } = require("../../../config/database.js");
const postDao = require("./postDao.js");
const { logger } = require("../../../config/winston.js");
const { errResponse, response } = require("../../../config/response.js");
const baseResponse = require("../../../config/baseResponseStatus.js");

// Provider : process READ logics

exports.retrievePostList = async function () {
  try {
    // Post 내용 받아오기
    const connection = await pool.getConnection(async (conn) => conn);
    const getPostListResult = await postDao.selectPost(connection);
    connection.release();

    if (getPostListResult.length === 0) {
      return errResponse(baseResponse.POST_NOT_EXIST);
    }
    return response(baseResponse.SUCCESS, getPostListResult);
  } catch (err) {
    logger.error(`App - retrievePostList err\n: ${err.message}`);
    return errResponse(baseResponse.SERVER_ERROR);
  }
};

exports.retrievePostByQuery = async function (userInfo) {
  try {
    if (userInfo.username != null) {
      const connection = await pool.getConnection(async (conn) => conn);
      const retrievePostResult = await postDao.selectPostByName(
        connection,
        userInfo.username
      );
      connection.release();

      if (
        Array.isArray(retrievePostResult) &&
        retrievePostResult.length === 0
      ) {
        return errResponse(baseResponse.USER_POST_NOT_EXIST);
      }
      return response(baseResponse.SUCCESS, retrievePostResult);
    } else if (userInfo.userId != null) {
      const connection = await pool.getConnection(async (conn) => conn);
      const retrievePostResult = await postDao.selectPostByUserId(
        connection,
        userInfo.userId
      );
      connection.release();

      if (
        Array.isArray(retrievePostResult) &&
        retrievePostResult.length === 0
      ) {
        return errResponse(baseResponse.USER_POST_NOT_EXIST);
      }
      return response(baseResponse.SUCCESS, retrievePostResult);
    }
  } catch (err) {
    logger.error(`App - retrievePostByQuery err\n: ${err.message}`);
    return errResponse(baseResponse.SERVER_ERROR);
  }
};

exports.retrievePostByPostIdx = async function (postIdx) {
  try {
    if (!postIdx) {
      return errResponse(baseResponse.POST_POSTIDX_EMPTY);
    }
    const connection = await pool.getConnection(async (conn) => conn);
    const retrievePostResult = await postDao.selectPostIdx(connection, postIdx);
    connection.release();

    return retrievePostResult;
  } catch (err) {
    logger.error(`App- retrievePostByPostIdx err\n: ${err.message}`);
    return errResponse(baseResponse.SERVER_ERROR);
  }
};
