import { loggerStreamWrite } from "@utils/logger";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import router from "./api";
import connectDB from "./db";
import { errorHandler, moesifMiddleware, notFound } from "./middlewares";

const initalizeApp = async (): Promise<express.Application> => {
  const app = express();
  await connectDB();
  // If we are behind some reverse proxy like Nginx then we can trust this
  app.enable("trust proxy");

  app.use(helmet());
  app.use(cors());
  app.use(
    morgan("common", {
      stream: {
        write: loggerStreamWrite
      }
    })
  );
  app.use(express.json());
  app.use(moesifMiddleware);

  app.get("/", (_req: express.Request, res: express.Response) => {
    res
      .status(200)
      .json(`Server running at http://localhost:${process.env.PORT}`);
  });

  app.use("/api", router);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default initalizeApp;
