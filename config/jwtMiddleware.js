import jwt from "jsonwebtoken";
import secret_config from "./secret.js";
import { response, errResponse } from "./response.js";
import baseResponse from "./baseResponseStatus.js";

export const jwtMiddleware = (req, res, next) => {
  // read the token from header or url
  const token = req.headers["x-access-token"] || req.query.token;
  // token does not exist
  if (!token) {
    return res.send(errResponse(baseResponse.TOKEN_EMPTY));
  }

  // create a promise that decodes the token
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, secret_config.jwtsecret, (err, verifiedToken) => {
      if (err) reject(err);
      resolve(verifiedToken);
    });
  });

  // if it has failed to verify, it will return an error message
  const onError = (error) => {
    return res.send(errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE));
  };
  // process the promise
  p.then((verifiedToken) => {
    //비밀 번호 바뀌었을 때 검증 부분 추가 할 곳
    console.log(`verifiedToken: ${verifiedToken}`);
    req.verifiedToken = verifiedToken;
    next();
  }).catch(onError);
};

export function createJwtToken(userIdx) {
  return jwt.sign({ userIdx }, secret_config.jwtsecret, {
    expiresIn: secret_config.jwtExpiration,
    subject: "userInfo",
  });
}

export async function isAuth(req, res, next) {
  try {
    const token = req.headers["x-access-token"] || req.query.token;
    if (!token) {
      res.send(errResponse(baseResponse.TOKEN_EMPTY));
    }
    jwt.verify(token, secret_config.jwtsecret, async (err, decoded) => {
      if (err) console.error(err);
      console.info(`Token decoded: `, decoded);
      req.userIdx = decoded.userIdx; // req.custom data
      next();
    });
  } catch (error) {
    console.error(error.message);
    res.send(errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE));
  }
}
