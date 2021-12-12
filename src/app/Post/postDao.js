export async function selectInfoByUserId(connection, userIdx) {
  const selectQuery = `
  SELECT postIdx, userIdx, textContent, createdAt, updatedAt, status
  FROM Post
  WHERE userIdx = ?;`;

  const postRows = await connection.query(selectQuery, userIdx);
  return postRows[0];
}

export async function selectInfoById(connection, postIdx) {
  const selectQuery = `
  SELECT postIdx, userIdx, textContent, createdAt, updatedAt, status
  FROM Post
  WHERE postIdx = ?;
  `;

  const postRows = await connection.query(selectQuery, postIdx);
  return postRows[0];
}

export async function selectVisualPostIdx(connection, postIdx) {
  const selectQuery = `
  SELECT visualContentUrl, visualContentIdx
  FROM VisualContent
  WHERE status = 'ACTIVE' and postIdx = ?
  ;`;

  const visualRows = await connection.query(selectQuery, postIdx);
  return visualRows[0];
}

export async function insertPostInfo(connection, insertInfoParams) {
  const insertQuery = `
  INSERT INTO Post (userIdx, textContent)
  VALUES (?, ?);
  `;
  const insertInfoRow = await connection.query(insertQuery, insertInfoParams);

  return insertInfoRow[0];
}

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

export async function delById(connection, postIdx) {
  const delQuery = `
  UPDATE Post
  SET status = 'DELETED'
  WHERE postIdx = ?;
  `;

  const delResultRow = await connection.query(delQuery, postIdx);

  return delResultRow;
}

export async function updateInfo(connection, editInfoParams) {
  const updateQuery = `
  UPDATE Post
  SET textContent = ?
  WHERE postIdx = ?;
  `;

  const updateResultRow = await connection.query(updateQuery, editInfoParams);

  return updateResultRow[0];
}

export async function updateVisual(connection, url, visualContentIdx) {
  const updateQuery = `
  UPDATE VisualContent
  SET visualContentUrl = ?
  WHERE visualContentIdx = ?
  `;

  const updateResultRow = await connection.query(updateQuery, url);

  return updateResultRow[0];
}
