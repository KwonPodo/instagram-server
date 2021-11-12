const mysql = require("mysql2/promise");
const { logger } = require("./winston");

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
  host: "umc-nodejs-db-study.cmcg48c36gxn.ap-northeast-2.rds.amazonaws.com",
  user: "joon",
  port: 3306,
  password: "rnjswnsgud9901!",
  database: "instagram",
});

module.exports = {
  pool: pool,
};
