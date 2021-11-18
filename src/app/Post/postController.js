const postProvider = require("./postProvider.js");
const postService = require("./postService.js");
const { response, errResponse } = require("../../../config/response.js");
const baseResponse = require("../../../config/baseResponseStatus");

/**
 * API NO. 7
 * API Name : 게시글 생성 API
 * [POST] /app/posts
 */
exports.createPosts = async function (req, res) {
  const { userIdx, textContent, imgUrl, videoUrl } = req.body;
  if (!userIdx) {
    return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
  } else if (!textContent) {
    return res.send(errResponse(baseResponse.POST_TEXTCONTENT_EMPTY));
  } else if (!imgUrl) {
    return res.send(errResponse(baseResponse.POST_IMGURL_EMPTY));
  } else {
    const createPostResponse = await postService.createPost(
      userIdx,
      textContent,
      imgUrl,
      videoUrl
    );

    return res.send(createPostResponse);
  }
};

/**
 * API NO. 6
 * API Name : 전체 게시글 조회 API + username, userId를 통한 검색
 * [GET] /app/posts
 */
exports.getPosts = async function (req, res) {
  /**
   * Query String: username, userId
   */
  const userInfo = {
    username: null,
    userId: null,
  };

  userInfo.username = req.query.username;
  userInfo.userId = req.query.userId;

  if (userInfo.username == null && userInfo.userId == null) {
    const retrievePostResponse = await postProvider.retrievePostList();
    return res.send(retrievePostResponse);
  }
  const retrievePostResponse = await postProvider.retrievePostByQuery(userInfo);
  return res.send(retrievePostResponse);
};

/**
 * API NO. 8
 * API Name : 게시물 삭제 API (by postIdx in Query String)
 * [DELETE] /app/posts
 */
exports.delPostByPostIdx = async function (req, res) {
  /**
   * Query string : postIdx
   */
  const postIdx = req.query.postIdx;

  const delPostResponse = await postService.delPost(postIdx);
  return res.send(response(delPostResponse));
};

/**
 * API NO. 9
 * Request Body : {
 *   "postIdx",
 *   "textContent",
 *   "imgUrl",
 *   "videoUrl",
 * }
 */

exports.editPost = async function (req, res) {
  const { postIdx, textContent, imgUrl, videoUrl } = req.body;
  // 빈값 체크
  if (!postIdx) {
    res.send(errResponse(baseResponse.POST_POSTIDX_EMPTY));
  } else if (!textContent) {
    res.send(errResponse(baseResponse.TEXTCONTENT_EMPTY));
  } else if (!imgUrl) {
    res.send(errResponse(baseResponse.POST_IMGURL_EMPTY));
  } else if (!videoUrl) {
    res.send(errResponse(baseResponse.POST_VIDEOURL_EMPTY));
  }

  const editPostResponse = await postService.editPost(
    postIdx,
    textContent,
    imgUrl,
    videoUrl
  );

  res.send(editPostResponse);
};
