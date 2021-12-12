// 새롭게 추가한 함수를 아래 부분에서 export 해줘야 외부의 Provider, Service 등에서 사용가능합니다.

// 모든 유저 조회
export async function selectUser(connection) {
  const selectUserListQuery = `
                SELECT userIdx, username, userId, email 
                FROM User;
                `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

// 이메일로 회원 조회
export async function selectUserEmail(connection, email) {
  const selectUserEmailQuery = `
                SELECT username, userIdx, email, userId, password, status
                FROM User 
                WHERE email = ?;
                `;
  const [emailRows] = await connection.query(selectUserEmailQuery, email);
  return emailRows;
}

// username 회원 조회
export async function selectUserName(connection, username) {
  const selectUserNameQuery = `
                SELECT username, userIdx, email, userId
                FROM User
                WHERE username = ?;
                `;
  const [userRow] = await connection.query(selectUserNameQuery, username);
  return userRow;
}

// 유저 생성
export async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO User (username, password, email, userId, profileImgUrl)
        VALUES (?, ?, ?, ?, ?);
    `;
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );
  return insertUserInfoRow;
}

// 유저 탈퇴(삭제 by userId)
export async function delUserById(connection, userId) {
  const deleteUserInfoQuery = `
          UPDATE User
          SET status = 'D'
          WHERE userId = ?;
          `;
  const delUserInfo = await connection.query(deleteUserInfoQuery, userId);
  return delUserInfo;
}

// 패스워드 체크
export async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT userIdx, email, userId, password
        FROM User 
        WHERE email = ?;`;
  const selectUserPasswordRow = await connection.query(
    selectUserPasswordQuery,
    selectUserPasswordParams
  );

  return selectUserPasswordRow[0];
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
export async function selectUserAccount(connection, email) {
  const selectUserAccountQuery = `
        SELECT status, userId, userIdx
        FROM User 
        WHERE email = ?;`;
  const selectUserAccountRow = await connection.query(
    selectUserAccountQuery,
    email
  );
  return selectUserAccountRow[0];
}

export async function updateUserInfo(connection, updateUserInfoParams) {
  const updateUserQuery = `
  UPDATE User 
  SET username = ?, userId = ?, profileImgUrl = ?
  WHERE userIdx = ?;`;
  const updateUserRow = await connection.query(
    updateUserQuery,
    updateUserInfoParams
  );
  return updateUserRow[0];
}

export async function followByIdx(connection, followIdx) {
  const followQuery = `
  UPDATE Follow
  SET followStatus = 'Y'
  WHERE followIdx = ?;
  `;
  const followRow = await connection.query(followQuery, followIdx);
  return followRow;
}

export async function unFollowByIdx(connection, followIdx) {
  const followQuery = `
  UPDATE Follow
  SET followStatus = 'N'
  WHERE followIdx = ?;
  `;
  const unFollowRow = await connection.query(followQuery, followIdx);
  return unFollowRow;
}
