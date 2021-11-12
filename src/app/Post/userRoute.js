module.exports = funcion(app) {
  const user = require('./userController.js');

  // 1. 게시물 생성 API
  app.post('/app/posts', user.createPosts)

  // 2. 게시물 조회 API + userId 기반 검색
  app.get('/app/posts', user.getPosts);

  // 3. 특정 유저 게시물 조회 API 
  app.get('/app/posts/:userId', user.getPostById);
}