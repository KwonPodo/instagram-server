import express from "express";
import compression from "compression";
import methodOverride from "method-override";
import cors from "cors";
import userRouter from "../src/app/User/userRoute.js";

export default function expressor() {
  const app = express();

  app.use(compression());

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.use(methodOverride());

  app.use(cors());
  // app.use(express.static(process.cwd() + '/public'));

  /* App (Android, iOS) */
  // TODO: 도메인을 추가할 경우 이곳에 Route를 추가하세요.
  // require('../src/app/Board/boardRoute')(app);
  //require("../src/app/User/userRoute")(app);
  //require("../src/app/Post/postRoute")(app);

  app.use("/app/auth", userRouter);

  app.use((req, res, next) => {
    res.sendStatus(404);
  });
  app.use((error, req, res, next) => {
    console.error;
    res.sendStatus(500);
  });

  return app;
}
