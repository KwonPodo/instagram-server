const { logger } = require("../../../config/winston.js");
// 새롭게 추가한 함수를 아래 부분에서 export 해줘야 외부의 Provider, Service 등에서 사용가능합니다.

// 모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                SELECT username, userIdx, email, userId 
                FROM User;
                `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

// 이메일로 회원 조회
async function selectUserEmail(connection, email) {
  const selectUserEmailQuery = `
                SELECT username, userIdx, email, userId 
                FROM User 
                WHERE email = ?;
                `;
  const [emailRows] = await connection.query(selectUserEmailQuery, email);
  return emailRows;
}

// userId 회원 조회
async function selectUserId(connection, userId) {
  const selectUserIdQuery = `
                SELECT username, userIdx, email, userId 
                FROM User
                WHERE userId = ?;
                `;
  const [userRow] = await connection.query(selectUserIdQuery, userId);
  return userRow;
}

// username 회원 조회
async function selectUserName(connection, username) {
  const selectUserNameQuery = `
                SELECT username, userIdx, email, userId
                FROM User
                WHERE username = ?;
                `;
  const [userRow] = await connection.query(selectUserNameQuery, username);
  return userRow;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO User (username, password, email, userId, profileImgIdx)
        VALUES (?, ?, ?, ?, ?);
    `;
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );
  return insertUserInfoRow;
}

// 유저 탈퇴(삭제 by userId)
async function delUserById(connection, userId) {
  const deleteUserInfoQuery = `
          UPDATE User
          SET status = 'D'
          WHERE userId = ?;
          `;
  const delUserInfo = await connection.query(deleteUserInfoQuery, userId);
  return delUserInfo;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT email, userId, password
        FROM User 
        WHERE email = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
    selectUserPasswordQuery,
    selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
  const selectUserAccountQuery = `
        SELECT status, userId
        FROM User 
        WHERE email = ?;`;
  const selectUserAccountRow = await connection.query(
    selectUserAccountQuery,
    email
  );
  return selectUserAccountRow[0];
}

async function updateUserInfo(connection, id, userId) {
  const updateUserQuery = `
  UPDATE User 
  SET userId = ?
  WHERE id = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [nickname, id]);
  return updateUserRow[0];
}

module.exports = {
  selectUser,
  selectUserEmail,
  selectUserId,
  selectUserPassword,
  selectUserName,
  selectUserAccount,
  insertUserInfo,
  delUserById,
  updateUserInfo,
};
