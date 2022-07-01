import express from "express";
import {
  getUser,
  addToToday,
  removeFromToday,
  addFavorite,
  removeFavorite,
  setCurrentProgress,
  addFailed,
  addSuccess,
} from "../controllers/userQueries.js";
import verifyToken from "../middlewares/verifyToken.js";

const userRouter = express.Router();
// userRouter.use(verifyToken);

userRouter.route("/:id").get(verifyToken, getUser);
// userRouter.route("/:id").get(getUser);
userRouter
  .route("/:id/favorites/:taskId")
  .put(addFavorite)
  .delete(removeFavorite);
userRouter
  .route("/:id/todayList/:taskId")
  .put(addToToday)
  .delete(removeFromToday);
userRouter.route("/:id/failed/:taskId").put(addFailed);
//.delete(removeFavorite);
userRouter.route("/:id/success/:taskId").put(addSuccess);
//.delete(removeFavorite);
userRouter.route("/:id/:progress").put(setCurrentProgress);

export default userRouter;
