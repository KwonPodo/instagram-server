const { logger } = require("../../../config/winston.js");

// 새롭게 추가한 함수를 아래 부분에서 export 해줘야 외부의 Provider, Service 등에서 사용가능합니다.

// Search every Post
async function selectPost(connection) {
  const selectPostQuery = `
                  SELECT postIdx, userIdx, textContent, imgUrl
                  FROM Post;
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
                  SELECT *
                  FROM Post
                  WHERE postIdx = ?;
                  `;
  const [postRows] = await connection.query(selectPostQuery, postIdx);
  return postRows;
}

// Insert Into Post
async function insertPostInfo(connection, insertPostInfoParams) {
  const insertPostInfoQuery = `
                  INSERT INTO Post ( userIdx, textContent, imgUrl, videoUrl )
                  VALUES (?, ?, ?, ?);
                  `;
  const insertPostInfoRow = await connection.query(
    insertPostInfoQuery,
    insertPostInfoParams
  );

  return insertPostInfoRow;
}

// Delete Post
async function delPostInfo(connection, delPostInfoParam) {
  const delPostInfoQuery = `
                  DELETE FROM Post
                  WHERE postIdx = ?;
                  `;
  const delPostInfoRow = await connection.query(
    delPostInfoQuery,
    delPostInfoParam
  );
  return delPostInfoRow;
}

// Edit Post
async function editPost(connection, editPostInfoParams) {
  const editPostQuery = `
                  UPDATE Post
                  SET textContent = ?, imgUrl = ?, videoUrl = ?, updateAt = NOW()
                  WHERE postIdx = ?;
                  `;
  const editPostRow = await connection.query(editPostQuery, editPostInfoParams);
  return editPostRow;
}

module.exports = {
  selectPost,
  selectPostByUserId,
  selectPostIdx,
  selectPostByName,
  insertPostInfo,
  delPostInfo,
  editPost,
};
