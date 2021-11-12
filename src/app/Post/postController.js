const postProvider = require("./postProvider");
const postService = require("./postService");
const response = require("../../../config/response.js");
const baseResponse = require("../../../config/baseResponseStatus");

/**
 * API NO. 1
 * API Name : 게시글 생성 API
 * [POST] /app/posts
 */

/**
 * API NO. 2
 * API Name : 게시글 조회 API
 * [GET] /app/posts
 */
exports.getPosts = async function (req, res) {
  /**
   * Query string : userId
   */
  const userId = req.query.userId;
  if (!userId) {
    const postListResult = await postProvider.retrievePostList();
    return res.send(response.response(baseResponse.SUCCESS, postListResult));
  } else {
    // GET Post by userId
    const postListResult = await postProvider.retrievePostList(userId);
    return res.send(response.response(baseResponse.SUCCESS, postListResult));
  }
};
