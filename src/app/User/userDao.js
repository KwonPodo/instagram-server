// userId 회원 조회
export async function selectUserId(connection, userId) {
  const selectUserIdQuery = `
  SELECT username, userIdx, email, userId, profileImgUrl 
  FROM User
  WHERE userId = ?;
  `;
  const userRow = await connection.query(selectUserIdQuery, userId);

  return userRow[0];
}

export async function selectUserIdx(connection, userIdx) {
  const selectUserQuery = `
  SELECT username, userId, profileImgUrl
  FROM User
  WHERE userIdx = ?;
  `;

  const userRow = await connection.query(selectUserQuery, userIdx);

  return userRow[0];
}

export async function selectFollowing(connection, userIdx) {
  const selectQuery = `
  SELECT followingIdx, followStatus
  FROM Follow
  WHERE followStatus = 'Y' and followerIdx = ?;
  `;

  const followingRow = await connection.query(selectQuery, userIdx);
  return followingRow[0];
}

export async function selectFollowers(connection, userIdx) {
  const selectQuery = `
  SELECT followerIdx, followStatus
  FROM Follow
  WHERE followStatus = 'Y' and followingIdx = ?;
  `;

  const followerRow = await connection.query(selectQuery, userIdx);
  return followerRow[0];
}

export async function selectStatus(connection, followerIdx, followingIdx) {
  const selectQuery = `
  SELECT followIdx, followerIdx, followingIdx, followStatus
  FROM Follow
  WHERE followerIdx = ? and followingIdx =?;
  `;

  const statusRow = await connection.query(selectQuery, [
    followerIdx,
    followingIdx,
  ]);
  return statusRow[0];
}

export async function insertFollow(connection, followerIdx, followingIdx) {
  const insertQuery = `
  INSERT INTO Follow (followerIdx, followingIdx)
  VALUES (?, ?);
  `;

  const followRow = await connection.query(insertQuery, [
    followerIdx,
    followingIdx,
  ]);

  return followRow[0];
}

export async function updateFollow(connection, followIdx) {
  const updateQuery = `
  UPDATE Follow
  SET followStatus = 'Y'
  WHERE followIdx = ?;
  `;

  const updateFollowRow = await connection.query(updateQuery, followIdx);
  return updateFollowRow[0];
}

export async function updateUnfollow(connection, followIdx) {
  const updateQuery = `
  UPDATE Follow
  SET followStatus = 'N'
  WHERE followIdx = ?;
  `;

  const updateUnfollowRow = await connection.query(updateQuery, followIdx);
  return updateUnfollowRow[0];
}
