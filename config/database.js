import * as mysql from "mysql2";

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
  host: "umc-nodejs-db-study.cmcg48c36gxn.ap-northeast-2.rds.amazonaws.com",
  user: "joon",
  port: 3306,
  password: "rnjswnsgud9901!",
  database: "instagram",
});

const promisePool = pool.promise();
export default promisePool;
