import promisePool from "../../../config/database.js";
import * as postProvider from "./postProvider.js";
import * as postDao from "./postDao.js";
import { response, errResponse } from "../../../config/response.js";
import baseResponse from "../../../config/baseResponseStatus.js";

export async function post(userIdx, textContent, visualContent) {
  try {
    // Create DB Connection
    const connection = await promisePool.getConnection(async (conn) => conn);

    // Insert PostInfo(userIdx, textContent)
    const insertInfoParams = [userIdx, textContent];
    const insertInfoResult = await postDao.insertPostInfo(
      connection,
      insertInfoParams
    );

    const postIdx = insertInfoResult.insertId;

    // Insert VisualContent(postIdx, url)
    for (let url of visualContent) {
      const insertVisualParams = [postIdx, url];
      const insertVisualResult = await postDao.insertVisual(
        connection,
        insertVisualParams
      );
      console.log(`insertVisualResult: `, insertVisualResult);
    }

    // Release DB Connection
    connection.release();

    console.log("postIdx: ", postIdx);
    console.log(`insertInfoResult: `, insertInfoResult);

    return response(baseResponse.SUCCESS);
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return errResponse(baseResponse.DB_ERROR);
  }
}

export async function delById(postIdx) {
  try {
    // Create DB Connection
    const connection = await promisePool.getConnection(async (conn) => conn);

    // Change post status into 'DELETED'
    const delResult = await postDao.delById(connection, postIdx);
    console.log("delResult at Service:", delResult[0]);

    // Release DB Connection
    connection.release();

    return response(baseResponse.SUCCESS);
  } catch (error) {
    console.log(error.message);
    return errResponse(baseResponse.DB_ERROR);
  }
}

export async function edit(textContent, url, postIdx) {
  try {
    // Create DB Connection
    const connection = await promisePool.getConnection(async (conn) => conn);

    const editInfoParams = [textContent, postIdx];
    const editInfo = await postDao.updateInfo(connection, editInfoParams);

    // Get visuals
    const visualInfo = await postProvider.getVisualById(postIdx);

    for (let visualContent of visualInfo) {
      console.log("visualContent: ", visualContent);
    }

    console.log(url);

    // Release DB Connection
    connection.release();

    console.log("editInfo: ", editInfo);
  } catch (error) {
    console.log(error.message);
    return errResponse(baseResponse.DB_ERROR);
  }
}
