// 새롭게 추가한 함수를 아래 부분에서 export 해줘야 외부의 Provider, Service 등에서 사용가능합니다.

// Search every Post
async function selectPost(connection) {
  const selectPostQuery = `
                  SELECT postIdx, textContent, imgUrl
                  FROM Post;
                  `;
  const [postRows] = await connection.query(selectPostQuery);
  return postRows;
}

module.exports = {
  selectPost,
};
