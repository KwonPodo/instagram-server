import pkg from "express-validator";
const { body, param, query, validationResult } = pkg;
import { response, errResponse } from "./response.js";
import baseResponse from "./baseResponseStatus.js";

function validationErrCatch(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
}

export const credential = [
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage({
      isSuccess: false,
      code: 2010,
      message: "이메일을 형식을 정확하게 입력해주세요.",
    })
    .isLength({ max: 30 })
    .withMessage({
      isSuccess: false,
      code: 2009,
      message: "이메일은 30자리 미만으로 입력해주세요.",
    }),
  body("password").trim().notEmpty().withMessage(`password empty`),
  validationErrCatch,
];

export const signup = [
  body("userId").trim().notEmpty().withMessage(`userId empty`),
  body("username").trim().notEmpty().withMessage(`Username is empty`),
  body("url")
    .trim()
    .isURL()
    .withMessage(`Invalid URL`)
    .optional({ nullable: true, checkFalsy: true }),
  credential,
  validationErrCatch,
];

export const edit = [
  body("userId").trim().notEmpty().withMessage(`userId Empty`),
  body("username").trim().notEmpty().withMessage("Username is empty"),
  body("url")
    .trim()
    .isURL()
    .withMessage(`Invalid URL`)
    .optional({ nullable: true, checkFalsy: true }),
  validationErrCatch,
];
