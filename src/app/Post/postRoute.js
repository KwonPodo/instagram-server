module.exports = function (app) {
  const post = require("./postController.js");

  // 1. 게시물 생성 API
  app.post("/app/posts", post.createPosts);

  // 2. 게시물 조회 API + userId 기반 검색
  app.get("/app/posts", post.getPosts);

  // 3. 특정 유저 게시물 조회 API
  app.get("/app/posts/:userId", post.getPostById);
};
