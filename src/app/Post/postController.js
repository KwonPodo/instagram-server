const postProvider = require("./postProvider.js");
const postService = require("./postService.js");
const { response, errResponse } = require("../../../config/response.js");
const baseResponse = require("../../../config/baseResponseStatus");

/**
 * API NO. 3.1
 * API Name : 전체 게시글 조회 API (최근 업로드순)
 * [GET] /app/posts
 */
exports.getRecentPosts = async function (req, res) {
  const getRecentPostsResult = await postProvider.retrievePostList();
  res.send(getRecentPostsResult);
};

/**
 * API NO. 4.1
 * API Name : 특정 게시글 조회 API
 * [GET] /app/posts/{postIdx}
 *
 * Request Params : postIdx
 */

exports.getPost = async function (req, res) {
  const postIdx = req.params.postIdx;

  const getPostResult = await postProvider.retrievePostByPostIdx(postIdx);
  res.send(getPostResult);
};

/**
 * API NO. 4.2
 * API Name : 게시글 생성 API
 * [POST] /app/posts
 */
exports.createPosts = async function (req, res) {
  const { userIdx, textContent, visualContentArray } = req.body;
  if (!userIdx) {
    return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
  } else if (!textContent) {
    return res.send(errResponse(baseResponse.POST_TEXTCONTENT_EMPTY));
  } else {
    const createPostResponse = await postService.createPost(
      userIdx,
      textContent,
      visualContentArray
    );

    return res.send(createPostResponse);
  }
};

/**
 * API NO. 4.3
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

/**
 * API NO. 4.4
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
