const { pool } = require("../../../config/database.js");
const postDao = require("./postDao.js");
const logger = require("../../../config/winston.js");
const { errResponse, response } = require("../../../config/response.js");
const baseResponse = require("../../../config/baseResponseStatus.js");

// Provider : process READ logics

exports.retrievePostList = async function (userId) {
  try {
    // distribute logic into two ways depending on whether userId param is given or not
    if (!userId) {
      // Connecting into DB
      const connection = await pool.getConnection(async (conn) => conn);
      // Get Dao Query answers
      const postListResult = await postDao.selectPost(connection);
      // Release connection
      connection.release();

      return postListResult;
    } else {
      const connection = await pool.getConnection(async (conn) => conn);
      const postResult = await postDao.selectPostId(connection, userId);
      connection.release();

      return postResult;
    }
  } catch (error) {
    logger.error(`App - getPosts Error\n ${error.message}`);
    return errResponse(baseResponse.SERVER_ERROR);
  }
};
