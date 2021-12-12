// Select Post Information by userIdx
export async function selectInfoByUserId(connection, userIdx) {
  const selectQuery = `
  SELECT postIdx, userIdx, textContent, createdAt, updatedAt, status
  FROM Post
  WHERE userIdx = ?;`;

  const postRows = await connection.query(selectQuery, userIdx);
  return postRows[0];
}

// Select Post Information by postIdx
export async function selectInfoById(connection, postIdx) {
  const selectQuery = `
  SELECT postIdx, userIdx, textContent, createdAt, updatedAt, status
  FROM Post
  WHERE postIdx = ?;
  `;

  const postRows = await connection.query(selectQuery, postIdx);
  return postRows[0];
}

// Select VisualContent by postIdx
export async function selectVisualPostIdx(connection, postIdx) {
  const selectQuery = `
  SELECT visualContentUrl, visualContentIdx
  FROM VisualContent
  WHERE status = 'ACTIVE' and postIdx = ?
  ;`;

  const visualRows = await connection.query(selectQuery, postIdx);
  return visualRows[0];
}

// Insert Post Information
export async function insertPostInfo(connection, insertInfoParams) {
  const insertQuery = `
  INSERT INTO Post (userIdx, textContent)
  VALUES (?, ?);
  `;
  const insertInfoRow = await connection.query(insertQuery, insertInfoParams);

  return insertInfoRow[0];
}

// Insert VisualContent
export async function insertVisual(connection, insertVisualParams) {
  const insertQuery = `
  INSERT INTO VisualContent (postIdx, visualContentUrl)
  VALUES (?, ?);
  `;

  const insertVisualRow = await connection.query(
    insertQuery,
    insertVisualParams
  );

  return insertVisualRow[0];
}

// Delete post by postIdx
export async function delById(connection, postIdx) {
  const delQuery = `
  UPDATE Post
  SET status = 'DELETED'
  WHERE postIdx = ?;
  `;

  const delResultRow = await connection.query(delQuery, postIdx);

  return delResultRow;
}

// Update Post Information (textContent)
export async function updateInfo(connection, editInfoParams) {
  const updateQuery = `
  UPDATE Post
  SET textContent = ?
  WHERE postIdx = ?;
  `;

  const updateResultRow = await connection.query(updateQuery, editInfoParams);

  return updateResultRow[0];
}

// Update VisualContent
export async function updateVisual(connection, url, visualContentIdx) {
  const updateQuery = `
  UPDATE VisualContent
  SET visualContentUrl = ?
  WHERE visualContentIdx = ?
  `;

  const updateResultRow = await connection.query(updateQuery, url);

  return updateResultRow[0];
}

// Select All Comments by PostIdx
export async function selectAllComments(connection, postIdx) {
  const selectQuery = `
  SELECT *
  FROM Comment
  WHERE toPostIdx = ? and status = 'ACTIVE';
  `;

  const selectResultRow = await connection.query(selectQuery, postIdx);

  return selectResultRow[0];
}

// Select a Comment by commentIdx
export async function selectComment(connection, commentIdx) {
  const selectQuery = `
  SELECT *
  FROM Comment
  WHERE status = 'ACTIVE' and commentIdx = ?;
  `;

  const selectResultRow = await connection.query(selectQuery, commentIdx);

  return selectResultRow[0][0];
}

// Insert Comment (userIdx, postIdx, textContent)
export async function insertComment(connection, userIdx, postIdx, textContent) {
  const insertQuery = `
  INSERT INTO Comment (fromUserIdx, toPostIdx, textContent)
  VALUES (?, ?, ?);
  `;

  const insertResultRow = await connection.query(insertQuery, [
    userIdx,
    postIdx,
    textContent,
  ]);

  return insertResultRow[0];
}

// Delete Comment (Change status to DELETED)
export async function delComment(connection, commentIdx) {
  const delQuery = `
  UPDATE Comment
  SET status = 'DELETED'
  WHERE commentIdx = ?;
  `;

  const delResultRow = await connection.query(delQuery, commentIdx);

  return delResultRow[0];
}

// Edit Comment
export async function updateComment(connection, textContent, commentIdx) {
  const updateQuery = `
  UPDATE Comment
  SET textContent = ?
  WHERE commentIdx = ?;
  `;

  const updateResultRow = await connection.query(updateQuery, [
    textContent,
    commentIdx,
  ]);

  return updateResultRow[0];
}
