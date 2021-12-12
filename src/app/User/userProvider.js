import * as userDao from "./userDao.js";
import { response, errResponse } from "../../../config/response.js";
import baseResponse from "../../../config/baseResponseStatus.js";
import promisePool from "../../../config/database.js";

export async function retrieveUser(userId) {
  const connection = await promisePool.getConnection(async (conn) => conn);
  const userResult = await userDao.selectUserId(connection, userId);

  connection.release();

  if (userResult.length === 0) {
    return errResponse(baseResponse.USER_USERID_NOT_EXIST);
  }

  return userResult[0]; // 한 명의 유저 정보만을 불러오므로 배열 타입을 리턴하는 게 아닌 0번 인덱스를 파싱해서 오브젝트 타입 리턴
}

export async function getFollowing(userIdx) {
  try {
    // Create DB Connection
    const connection = await promisePool.getConnection(async (conn) => conn);

    const followingRow = await userDao.selectFollowing(connection, userIdx);
    console.log("followingRow: ", followingRow);

    if (followingRow.length === 0) {
      return errResponse(baseResponse.FOLLOWEE_LIST_EMPTY);
    }

    const resultInfo = [];

    for (let following of followingRow) {
      console.log("following: ", following);

      const followingUserInfo = await userDao.selectUserIdx(
        connection,
        following.followingIdx
      );

      const followStatus = following.followStatus;
      const addInfo = { followStatus, ...followingUserInfo[0] };
      resultInfo.push(addInfo);

      console.log("addInfo: ", addInfo);
    }
    console.log("resultInfo: ", resultInfo);

    // Release DB Connection
    connection.release();

    return response(baseResponse.SUCCESS, resultInfo);
  } catch (error) {
    console.log(error.message);
    return errResponse(baseResponse.DB_ERROR);
  }
}

export async function getFollowers(userIdx) {
  try {
    // Create DB Connection
    const connection = await promisePool.getConnection(async (conn) => conn);

    const followersRow = await userDao.selectFollowers(connection, userIdx);

    if (followersRow.length === 0) {
      return errResponse(baseResponse.FOLLOWER_LIST_EMPTY);
    }

    const resultInfo = [];

    for (let follower of followersRow) {
      console.log("follower: ", follower);

      const followerInfo = await userDao.selectUserIdx(
        connection,
        follower.followerIdx
      );
      const followStatus = follower.followStatus;
      const addInfo = { followStatus, ...followerInfo[0] };
      resultInfo.push(addInfo);

      console.log("followerInfo: ", followerInfo);
      console.log("addInfo: ", addInfo);
    }
    console.log("resultInfo: ", resultInfo);

    // Release DB Connection
    connection.release();

    return response(baseResponse.SUCCESS, resultInfo);
  } catch (error) {
    console.log(error.message);
    return errResponse(baseResponse.DB_ERROR);
  }
}
