import * as userProvider from "./userProvider.js";
import * as userDao from "./userDao.js";
import promisePool from "../../../config/database.js";
import { response, errResponse } from "../../../config/response.js";
import baseResponse from "../../../config/baseResponseStatus.js";

export async function follow(followerIdx, followingIdx) {
  try {
    // Create DB Connection
    const connection = await promisePool.getConnection(async (conn) => conn);

    // Check if there is follow data in DB
    const followInfo = await userDao.selectStatus(
      connection,
      followerIdx,
      followingIdx
    );

    console.log("followInfo: ", followInfo);

    // DB에 팔로우 데이터가 없으면 DB에 입력
    if (followInfo.length === 0) {
      const followUser = await userDao.insertFollow(
        connection,
        followerIdx,
        followingIdx
      );
      // DB에 followStatus가 Y로 되어 있으면 에러 송출
    } else if (followInfo[0].followStatus === "Y") {
      return errResponse(baseResponse.FOLLOW_REDUNDANT);
      // DB에 잔재한 팔로우 데이터 followStatus 변경
    } else {
      const changeStatus = await userDao.updateFollow(
        connection,
        followInfo[0].followIdx
      );
    }

    // Release DB Connection
    connection.release();

    return response(baseResponse.SUCCESS);
  } catch (error) {
    console.log(error);
    return errResponse(baseResponse.SERVER_ERROR);
  }
}

export async function unfollow(followerIdx, followingIdx) {
  try {
    // Create DB Connection
    const connection = await promisePool.getConnection(async (conn) => conn);

    // Validation
    // Check FollowStatus
    const followStatus = await userDao.selectStatus(
      connection,
      followerIdx,
      followingIdx
    );

    if (followStatus[0].followStatus === "N") {
      return errResponse(baseResponse.UNFOLLOW_REDUNDANT);
    }

    const changeStatus = await userDao.updateUnfollow(
      connection,
      followStatus[0].followIdx
    );

    // Release DB Connection
    connection.release();

    return response(baseResponse.SUCCESS);
  } catch (error) {
    console.log(error);
    return errResponse(baseResponse.SERVER_ERROR);
  }
}
