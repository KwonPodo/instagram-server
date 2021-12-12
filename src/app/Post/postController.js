import * as postService from "./postService.js";
import * as postProvider from "./postProvider.js";
import { response, errResponse } from "../../../config/response.js";
import baseResponse from "../../../config/baseResponseStatus.js";

/**
 * API No. 4.1
 * API Name : 게시물 조회 API
 * [GET] /app/posts/:userId
 * Request Param {
 *  userId
 * }
 */
export async function getPosts(req, res) {
  const userId = req.params.userId;
  if (!userId) {
    return errResponse(baseResponse.USER_USERID_EMPTY);
  }
  const result = await postProvider.getByUserId(userId);

  return res.json(result);
}

/**
 * API No. 4.2
 * API Name : 게시물 생성 API
 * [POST] /app/posts/
 * Request Body {
 *  textContent, visualContentUrl
 * }
 */
export async function create(req, res) {
  const userIdx = req.userIdx;
  const { textContent, visualContentUrl } = req.body;

  if (!textContent) {
    return errResponse(baseResponse.POST_TEXTCONTENT_EMPTY);
  } else if (!visualContentUrl) {
    return errResponse(baseResponse.POST_IMGURL_EMPTY);
  }

  const result = await postService.post(userIdx, textContent, visualContentUrl);

  return res.json(result);
}

/**
 * API No. 4.3
 * API Name : 게시물 삭제 API
 * [PATCH] /app/posts/:postIdx
 */
export async function delPost(req, res) {
  const userIdx = req.userIdx;
  const postIdx = req.params.postIdx;

  console.log(`
  userIdx: ${userIdx}
  postIdx: ${postIdx}
  `);

  // Validation
  // if Post exist
  // if user is owner of the post
  // Return status 403 if not
  const postInfoRow = await postProvider.getById(postIdx);

  if (postInfoRow.length === 0) {
    return res.json(errResponse(baseResponse.POST_NOT_EXIST));
  }
  const postCreator = postInfoRow[0].userIdx;

  console.log("postInfoRow at Controller: ", postInfoRow);
  console.log("postCreator: ", postCreator);

  if (userIdx !== postCreator) {
    return res.status(403).send("Forbidden");
  } else if (postInfoRow[0].status === "DELETED") {
    return res.json(errResponse(baseResponse.POST_NOT_EXIST));
  }

  // Change Post status to 'DELETED'
  const result = await postService.delById(postIdx);

  return res.json(result);
}

/**
 * API No. 4.4
 * API Name : 게시물 수정 API
 * [PATCH] /app/posts/:postIdx
 * Request body : {
 *  textContent, visualContentUrl
 * }
 */
export async function edit(req, res) {
  const userIdx = req.userIdx;
  const postIdx = req.params.postIdx;
  const textContent = req.body.textContent;
  const url = req.body.visualContentUrl;

  // Validation
  // if Post exist

  const postInfoRow = await postProvider.getById(postIdx);

  if (postInfoRow.length === 0) {
    return res.json(errResponse(baseResponse.POST_NOT_EXIST));
  }

  // if user is the owner of the post

  const postCreator = postInfoRow[0].userIdx;

  if (userIdx !== postCreator) {
    return res.status(403).send("Forbidden");
  } else if (postInfoRow[0].status === "DELETED") {
    return res.json(errResponse(baseResponse.POST_NOT_EXIST));
  }

  const result = await postService.edit(textContent, url, postIdx);

  return res.send(response(baseResponse.SUCCESS));
}
