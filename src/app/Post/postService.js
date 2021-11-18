const { pool } = require("../../../config/database.js");
const { logger } = require("../../../config/winston.js");
const { response, errResponse } = require("../../../config/response.js");
const baseResponse = require("../../../config/baseResponseStatus.js");
const postProvider = require("./postProvider.js");
const postDao = require("./postDao.js");

exports.createPost = async function (userIdx, textContent, imgUrl, videoUrl) {
  try {
    const insertPostInfoParams = [userIdx, textContent, imgUrl, videoUrl];
    // connect to DB
    const connection = await pool.getConnection();
    const createPostResult = await postDao.insertPostInfo(
      connection,
      insertPostInfoParams
    );

    logger.info(`Created Post: ${createPostResult[0]}`);

    // release connection
    connection.release();

    return response(baseResponse.SUCCESS, [
      `Inserted Post postIdx: ${createPostResult[0].insertId}`,
      `Number of affected Rows of DB: ${createPostResult[0].affectedRows}`,
    ]);
  } catch (err) {
    logger.error(`App - POST posts error\n ${err.message} `);
    return errResponse(baseResponse.SERVER_ERROR);
  }
};

exports.delPost = async function (postIdx) {
  try {
    // Validation : postIdx가 이미 있는지 확인
    const postRows = await postProvider.retrievePostByPostIdx(postIdx);
    if (postRows.length == 0) {
      return errResponse(baseResponse.POST_POSTIDX_NOT_EXIST);
    }

    const delPostInfoParam = [postIdx];
    // connect to DB
    const connection = await pool.getConnection();
    const delPostResult = await postDao.delPostInfo(
      connection,
      delPostInfoParam
    );
    // release connection
    connection.release();

    logger.info(`Deleted Post: ${delPostInfoParam[0]}`);
    return response(
      baseResponse.SUCCESS,
      `Deleted Post ${delPostInfoParam[0]}`
    );
  } catch (err) {
    logger.error(`App - DELETE post error\n ${err.message} `);
    return errResponse(baseResponse.SERVER_ERROR);
  }
};

exports.editPost = async function (postIdx, textContent, imgUrl, videoUrl) {
  try {
    // Validation
    // 해당 게시물의 존재유무 파악
    const retrievePostResult = await postProvider.retrievePostByPostIdx(
      postIdx
    );
    if (Array.isArray(retrievePostResult) && retrievePostResult.length == 0) {
      return errResponse(baseResponse.POST_NOT_EXIST);
    }

    // editParam 구성
    const editPostInfoParams = [postIdx, textContent, imgUrl, videoUrl];

    // DB 연결 후 postDao의 editPost 호출
    const connection = await pool.getConnection(async (conn) => conn);
    const retrieveEditResult = await postDao.editPost(
      connection,
      editPostInfoParams
    );
    connection.release();

    logger.info(`Edited Post: ${postIdx}\n ${retrieveEditResult[0]}`);
    return retrieveEditResult;
  } catch (err) {
    logger.error(`App- editPost err\n: ${err.message}`);
    return errResponse(baseResponse.SERVER_ERROR);
  }
};
