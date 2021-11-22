const { pool } = require("../../../config/database.js");
const { logger } = require("../../../config/winston.js");
const { response, errResponse } = require("../../../config/response.js");
const baseResponse = require("../../../config/baseResponseStatus.js");
const postProvider = require("./postProvider.js");
const postDao = require("./postDao.js");

exports.createPost = async function (userIdx, textContent, visualContentArray) {
  try {
    const insertPostInfoParams = [userIdx, textContent];
    // Insert textContent to Post TABLE
    const connection = await pool.getConnection();
    const createPostResult = await postDao.insertPostInfo(
      connection,
      insertPostInfoParams
    );

    const createdPostIdx = createPostResult[0].insertId;

    logger.info(`Created PostIdx: ${createdPostIdx}`);

    //Insert visualContent to VisualContent TABLE
    const createdVisualIdxArray = [];

    for (let url of visualContentArray) {
      console.log(url);
      let insertVisualContentResult = await postDao.insertVisualContent(
        connection,
        createdPostIdx,
        url
      );
      console.log(`createdVisualIdx: ${insertVisualContentResult[0].insertId}`);
      createdVisualIdxArray.push(insertVisualContentResult[0].inserId);
      console.log(createdVisualIdxArray);
    }
    // release connection
    connection.release();
    return response(baseResponse.SUCCESS, {
      postIdx: createdPostIdx,
    });
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

    // connect to DB
    const connection = await pool.getConnection();
    const delPostResult = await postDao.delPostInfo(connection, postIdx);
    // release connection
    connection.release();

    logger.info(`Deleted Post: ${postIdx}\ndelPostResult: ${delPostResult}`);
    return response(baseResponse.SUCCESS, `Deleted Post ${postIdx}`);
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
    const editPostInfoParams = [postIdx, textContent];

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
