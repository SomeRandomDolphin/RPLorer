import express, { Express, Request, Response } from "express";
import cors from "cors";
import env from "./config/LoacEnv";
import favicon from "serve-favicon";
import path from "path";

import authRouter from "./router/AuthRouter";
import userRouter from "./router/UserRouter";
import postRouter from "./router/PostRouter";

const app: Express = express();
const PORT = env.PORT || 80;

app.use(cors());
app.use(express.json());
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.get("/api", (_: Request, res: Response) => {
  res.send("RPLorer API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
