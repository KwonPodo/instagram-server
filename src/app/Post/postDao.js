const { logger } = require("../../../config/winston.js");

// 새롭게 추가한 함수를 아래 부분에서 export 해줘야 외부의 Provider, Service 등에서 사용가능합니다.

// Search every Post
async function selectPost(connection) {
  const selectPostQuery = `
                  SELECT *
                  FROM Post 
                  LEFT JOIN VisualContent
                  ON Post.postIdx = VisualContent.postIdx
                  WHERE Post.status = 'ACTIVE'
                  ORDER BY Post.updatedAt DESC;
                  `;
  const [postRows] = await connection.query(selectPostQuery);
  return postRows;
}

// Select Post by userId
async function selectPostByUserId(connection, userId) {
  const selectPostQuery = `
                  SELECT postIdx, userIdx, textContent, imgUrl
                  FROM Post
                  WHERE userIdx = ( SELECT  userIdx
                    FROM User
                    WHERE userId = ? );
                  `;
  const [postRows] = await connection.query(selectPostQuery, userId);
  return postRows;
}

// Select Post by username
async function selectPostByName(connection, username) {
  const selectPostQuery = `
                  SELECT postIdx, userIdx, textContent, imgUrl
                  FROM Post
                  WHERE userIdx = ( SELECT userIdx
                    FROM User
                    WHERE username = ? );
                  `;
  const [postRows] = await connection.query(selectPostQuery, username);
  return postRows;
}

async function selectPostIdx(connection, postIdx) {
  const selectPostQuery = `
                  SELECT postIdx, userIdx, textContent, createdAt, updatedAt
                  FROM Post
                  WHERE postIdx = ? && status = 'ACTIVE';
                  `;
  const [postRows] = await connection.query(selectPostQuery, postIdx);
  return postRows;
}

// Insert Into Post
async function insertPostInfo(connection, insertPostInfoParams) {
  const insertPostInfoQuery = `
                  INSERT INTO Post ( userIdx, textContent )
                  VALUES (?, ?);
                  `;
  const insertPostInfoRow = await connection.query(
    insertPostInfoQuery,
    insertPostInfoParams
  );

  return insertPostInfoRow;
}

// Insert Into VisualContent
async function insertVisualContent(connection, postIdx, visualContentUrl) {
  const insertImgContentQuery = `
                  INSERT INTO VisualContent (postIdx, visualContentUrl) 
                  VALUES ( '${postIdx}, '${visualContentUrl}');
                  `;
  const insertImgContentRow = await connection.query(insertImgContentQuery);
  return insertImgContentRow;
}

// Delete Post
async function delPostInfo(connection, postIdx) {
  const delPostInfoQuery = `
                  UPDATE Post
                  SET status = 'DELETED'
                  WHERE postIdx = ?;
                  `;
  const delPostInfoRow = await connection.query(delPostInfoQuery, postIdx);
  return delPostInfoRow;
}

// Edit Post
async function editPost(connection, editPostInfoParams) {
  const editPostQuery = `
                  UPDATE Post
                  SET textContent = ?, updateAt = NOW()
                  WHERE postIdx = ?;
                  `;
  const editPostRow = await connection.query(editPostQuery, editPostInfoParams);
  return editPostRow;
}

async function editVisualContent(connection, visualContentUrl) {
  const editVisualQuery = `
                  UPDATE VisualContent
                  SET visualContentUrl = '${visualContentUrl}', updateAt = NOW()
                  WHERE visualContentIdx `;
}

module.exports = {
  selectPost,
  selectPostByUserId,
  selectPostIdx,
  selectPostByName,
  insertPostInfo,
  insertVisualContent,
  delPostInfo,
  editPost,
};
