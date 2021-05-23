import { asyncHandler } from "@utils/errors";
import logger from "@utils/logger";
import { formatResponse } from "@utils/response";
import { Router } from "express";
import path from "path";

const resumePath = path.join(
  __dirname,
  "../",
  "../",
  "../",
  "static/PranjalAgniResume.pdf"
);

const resumeRouter = Router();

resumeRouter.get(
  "/download",
  asyncHandler(async (req, res) => {
    logger.info(`User IP ${req.ip} is downloading your resume`);
    res.download(resumePath, (err) => {
      if (err) {
        logger.error(err);

        return formatResponse({
          res,
          error: {
            message:
              "Please check server logs, error occured while downloading the file",
            time: new Date().toDateString()
          }
        });
      }
    });
  })
);

export default resumeRouter;
