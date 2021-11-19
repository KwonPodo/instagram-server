module.exports = function (app) {
  const post = require("./postController.js");

  // 3.1 전체 게시물 조회 API (최근 업로드순)
  app.get("/app/posts", post.getRecentPosts);

  // 4.1 특정 게시물 조회 API
  app.get("/app/posts/:postIdx", post.getPost);

  // 4.2 게시물 생성 API
  app.post("/app/posts", post.createPosts);

  // 4.3 게시물 삭제 API
  //app.delete("/app/posts/:postIdx", post.delPostByPostIdx);

  // 4.4 게시물 수정 API
  //app.put("/app/posts/:postIdx", post.editPost);
};
