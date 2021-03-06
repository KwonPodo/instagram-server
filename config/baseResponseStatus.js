//Response로 보내줄 상태코드와 메세지 등을 이 파일에서 관리함

const baseResponse = {
  // Success
  SUCCESS: { isSuccess: true, code: 1000, message: "성공" },

  // Common
  TOKEN_EMPTY: {
    isSuccess: false,
    code: 2000,
    message: "JWT 토큰을 입력해주세요.",
  },
  TOKEN_VERIFICATION_FAILURE: {
    isSuccess: false,
    code: 3000,
    message: "JWT 토큰 검증 실패",
  },
  TOKEN_VERIFICATION_SUCCESS: {
    isSuccess: true,
    code: 1001,
    message: "JWT 토큰 검증 성공",
  }, // ?

  //Request error
  SIGNUP_EMAIL_EMPTY: {
    isSuccess: false,
    code: 2001,
    message: "이메일을 입력해주세요",
  },
  SIGNUP_EMAIL_LENGTH: {
    isSuccess: false,
    code: 2002,
    message: "이메일은 30자리 미만으로 입력해주세요.",
  },
  SIGNUP_EMAIL_ERROR_TYPE: {
    isSuccess: false,
    code: 2003,
    message: "이메일을 형식을 정확하게 입력해주세요.",
  },
  SIGNUP_PASSWORD_EMPTY: {
    isSuccess: false,
    code: 2004,
    message: "비밀번호를 입력 해주세요.",
  },
  SIGNUP_PASSWORD_LENGTH: {
    isSuccess: false,
    code: 2005,
    message: "비밀번호는 6~20자리를 입력해주세요.",
  },
  SIGNUP_NICKNAME_EMPTY: {
    isSuccess: false,
    code: 2006,
    message: "닉네임을 입력 해주세요.",
  },
  SIGNUP_NICKNAME_LENGTH: {
    isSuccess: false,
    code: 2007,
    message: "닉네임은 최대 20자리를 입력해주세요.",
  },

  SIGNIN_EMAIL_EMPTY: {
    isSuccess: false,
    code: 2008,
    message: "이메일을 입력해주세요",
  },
  SIGNIN_EMAIL_LENGTH: {
    isSuccess: false,
    code: 2009,
    message: "이메일은 30자리 미만으로 입력해주세요.",
  },
  SIGNIN_EMAIL_ERROR_TYPE: {
    isSuccess: false,
    code: 2010,
    message: "이메일을 형식을 정확하게 입력해주세요.",
  },
  SIGNIN_PASSWORD_EMPTY: {
    isSuccess: false,
    code: 2011,
    message: "비밀번호를 입력 해주세요.",
  },

  USER_USERID_EMPTY: {
    isSuccess: false,
    code: 2012,
    message: "userId를 입력해주세요.",
  },
  USER_USERID_NOT_EXIST: {
    isSuccess: false,
    code: 2013,
    message: "해당 ID를 가진 회원이 존재하지 않습니다.",
  },

  USER_USEREMAIL_EMPTY: {
    isSuccess: false,
    code: 2014,
    message: "이메일을 입력해주세요.",
  },
  USER_USEREMAIL_NOT_EXIST: {
    isSuccess: false,
    code: 2015,
    message: "해당 이메일을 가진 회원이 존재하지 않습니다.",
  },
  USER_ID_NOT_MATCH: {
    isSuccess: false,
    code: 2016,
    message: "유저 아이디 값을 확인해주세요",
  },
  USER_USERIDX_EMPTY: {
    isSuccess: false,
    code: 2017,
    message: "userIdx를 입력해주세요",
  },
  USER_USERIDX_NOT_EXIST: {
    isSuccess: false,
    code: 2018,
    message: "해당 userIdx를 가진 회원이 존재하지 않습니다.",
  },

  USER_STATUS_EMPTY: {
    isSuccess: false,
    code: 2019,
    message: "회원 상태값을 입력해주세요",
  },

  USER_USERNAME_EMPTY: {
    isSuccess: false,
    code: 2020,
    message: "username을 입력해주세요",
  },

  USER_USERNAME_NOT_EXIST: {
    isSuccess: false,
    code: 2021,
    message: "해당 이름을 가진 회원이 존재하지 않습니다.",
  },

  USER_QUERY_NOT_EXIST: {
    isSuccess: false,
    code: 2022,
    message: "Query를 입력해주세요",
  },

  POST_TEXTCONTENT_EMPTY: {
    isSuccess: false,
    code: 2023,
    message: "textContent를 입력해주세요",
  },

  POST_IMGURL_EMPTY: {
    isSuccess: false,
    code: 2024,
    message: "imgUrl을 입력해주세요",
  },

  POST_POSTIDX_NOT_EXIST: {
    isSuccess: false,
    code: 2025,
    message: "주어진 postIdx에 해당하는 게시물이 존재하지 않습니다.",
  },

  POST_NOT_EXIST: {
    isSuccess: false,
    code: 2025,
    message: "게시물이 존재하지 않습니다.",
  },

  USER_POST_NOT_EXIST: {
    isSuccess: false,
    code: 2026,
    message: "해당 유저의 게시물이 존재하지 않습니다.",
  },

  POST_POSTIDX_EMPTY: {
    isSuccess: false,
    code: 2027,
    message: "postIdx를 입력해주세요",
  },

  POST_VIDEOURL_EMPTY: {
    isSuccess: false,
    code: 2028,
    message: "videoUrl을 입력해주세요",
  },

  UPDATE_AT_CHECK: {
    isSuccess: false,
    code: 2029,
    message: "updateAt을 확인해주세요",
  },

  POST_MEDIA_NOT_EXIST: {
    isSuccess: false,
    code: 2030,
    message: "업로드 가능한 미디어 확장자가 아닙니다.",
  },

  // Response error
  SIGNUP_REDUNDANT_EMAIL: {
    isSuccess: false,
    code: 3001,
    message: "중복된 이메일입니다.",
  },
  SIGNUP_REDUNDANT_NICKNAME: {
    isSuccess: false,
    code: 3002,
    message: "중복된 닉네임입니다.",
  },

  SIGNIN_EMAIL_WRONG: {
    isSuccess: false,
    code: 3003,
    message: "아이디가 잘못 되었습니다.",
  },
  SIGNIN_PASSWORD_WRONG: {
    isSuccess: false,
    code: 3004,
    message: "비밀번호가 잘못 되었습니다.",
  },
  SIGNIN_INACTIVE_ACCOUNT: {
    isSuccess: false,
    code: 3005,
    message: "비활성화 된 계정입니다. 고객센터에 문의해주세요.",
  },
  SIGNIN_WITHDRAWAL_ACCOUNT: {
    isSuccess: false,
    code: 3006,
    message: "탈퇴 된 계정입니다. 고객센터에 문의해주세요.",
  },

  FOLLOWER_LIST_EMPTY: {
    isSuccess: false,
    code: 3007,
    message: "팔로워가 없습니다.",
  },

  FOLLOWEE_LIST_EMPTY: {
    isSuccess: false,
    code: 3008,
    message: "팔로우하는 사람이 없습니다.",
  },

  FOLLOW_REDUNDANT: {
    isSuccess: false,
    code: 3009,
    message: "이미 팔로우한 계정입니다.",
  },

  UNFOLLOW_REDUNDANT: {
    isSuccess: false,
    code: 3010,
    message: "이미 언팔로우한 계정입니다.",
  },

  COMMENT_NOT_EXIST: {
    isSuccess: false,
    code: 3011,
    message: "해당하는 댓글이 삭제되었거나 없습니다.",
  },

  //Connection, Transaction 등의 서버 오류
  DB_ERROR: { isSuccess: false, code: 4000, message: "데이터 베이스 에러" },
  SERVER_ERROR: { isSuccess: false, code: 4001, message: "서버 에러" },
};

export default baseResponse;
