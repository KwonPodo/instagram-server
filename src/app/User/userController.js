import * as userProvider from "./userProvider.js";
import * as userService from "./userService.js";
import { response, errResponse } from "../../../config/response.js";
import baseResponse from "../../../config/baseResponseStatus.js";

/**
 * API No. 5.1
 * API Name : 팔로잉 유저 조회 API
 * [GET] /app/users/following
 */
export async function getFollowing(req, res) {
  const userIdx = req.userIdx;

  const result = await userProvider.getFollowing(userIdx);

  return res.json(result);
}

/**
 * API No. 5.2
 * API Name : 팔로워 유저 조회 API
 * [GET] /app/users/followers
 */
export async function getFollowers(req, res) {
  const userIdx = req.userIdx;

  const result = await userProvider.getFollowers(userIdx);

  return res.json(result);
}

/**
 * API No. 5.3
 * API Name : 팔로우 API
 * [PUT] /app/users/:userId
 */
export async function follow(req, res) {
  const followerIdx = req.userIdx;
  const followingId = req.params.userId;

  // Validation
  // Check if following User exists
  const followingUserInfo = await userProvider.retrieveUser(followingId);
  console.log("followingUserInfo: ", followingUserInfo);

  const followingUserIdx = followingUserInfo.userIdx;

  const result = await userService.follow(followerIdx, followingUserIdx);

  return res.json(result);
}

/**
 * API No. 5.4
 * API Name : 언팔로우 API
 * [PATCH] /app/users/:userId
 */
export async function unfollow(req, res) {
  const followerIdx = req.userIdx;
  const followingId = req.params.userId;

  // Validation
  // Check if following User exists
  const followingUserInfo = await userProvider.retrieveUser(followingId);
  console.log("followingUserInfo: ", followingUserInfo);

  const followingUserIdx = followingUserInfo.userIdx;

  const result = await userService.unfollow(followerIdx, followingUserIdx);

  return res.json(result);
}
