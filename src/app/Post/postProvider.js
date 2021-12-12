import promisePool from "../../../config/database.js";
import * as postDao from "./postDao.js";
import * as userProvider from "../User/userProvider.js";
import { response, errResponse } from "../../../config/response.js";
import baseResponse from "../../../config/baseResponseStatus.js";

export async function getByUserId(userId) {
  try {
    const user = await userProvider.retrieveUser(userId);
    // Create DB Connection
    const connection = await promisePool.getConnection(async (conn) => conn);

    // Get PostInfos in Row
    const postInfoRows = await postDao.selectInfoByUserId(
      connection,
      user.userIdx
    );
    // Get VisualContentUrls in RowObjects
    const visualRows = await postDao.selectVisualPostIdx(
      connection,
      postInfoRows[0].postIdx
    );

    const result = await Promise.all(
      postInfoRows.map(async (post) => {
        const visualRows = await postDao.selectVisualPostIdx(
          connection,
          post.postIdx
        );

        // take URLs out of Obj, put them in a array
        const visualContent = visualRows.map((urlObj) => {
          return urlObj.visualContentUrl;
        });
        console.log(visualContent);
        return { ...post, visualContent };
      })
    );

    // Release DB Connection
    connection.release();

    console.log(`Retrieved User: `, user);
    console.log(`PostInfoRows: `, postInfoRows);
    console.log(`VisualRows: `, visualRows);
    console.log(`Result : `, result);

    return response(baseResponse.SUCCESS, result);
  } catch (error) {
    console.log(error.message);
    return errResponse(baseResponse.DB_ERROR);
  }
}

export async function getById(postIdx) {
  try {
    // Create DB Connection
    const connection = await promisePool.getConnection(async (conn) => conn);

    // Get postInfo by postIdx
    const postInfoRow = await postDao.selectInfoById(connection, postIdx);

    // Release DB Connection
    connection.release();

    console.log("postInfoRow at Provider: ", postInfoRow);

    return postInfoRow;
  } catch (error) {
    console.log(error.message);
    return errResponse(baseResponse.DB_ERROR);
  }
}

export async function getVisualById(postIdx) {
  try {
    // Create DB Connection
    const connection = await promisePool.getConnection(async (conn) => conn);

    // get VisualContent by postIdx
    const visualRow = await postDao.selectVisualPostIdx(connection, postIdx);
    console.log("visualRow: ", visualRow);

    // Release DB Connection
    connection.release();

    return visualRow;
  } catch (error) {
    console.log(error.message);
    return errResponse(baseResponse.DB_ERROR);
  }
}
