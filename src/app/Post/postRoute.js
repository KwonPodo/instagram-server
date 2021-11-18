module.exports = function (app) {
  const post = require("./postController.js");

  // 7. 게시물 생성 API
  app.post("/app/posts", post.createPosts);

  // 6. 전체 게시물 조회 API + 검색(이름, userId로 특정 유저의 게시물 검색)
  app.get("/app/posts", post.getPosts);

  // 8. 게시물 삭제 API
  app.delete("/app/posts", post.delPostByPostIdx);

  // 9. 게시물 수정 API
  app.put("/app/posts", post.editPost);
};
