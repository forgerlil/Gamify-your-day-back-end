import UserCollection from "../models/user.js";

const getUser = async (req, res, next) => {
  try {
    const getUser = await UserCollection.findById(req.userId)
      .select("+password")
      .populate("todayList")
      .populate("todaySuccess")
      .populate("todayFailed")
      .populate("favoriteList");
    if (!getUser) throw new Error("User doesn't exist");
    res.status(200).json(getUser);
    //res.status(200).send({errors})
  } catch (error) {
    next(error);
  }
};

const addToToday = async (req, res, next) => {
  try {
    const changeTodayArr = await UserCollection.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $push: { todayList: req.params.taskId } },
      { new: true }
    ).populate("todayList");
    res.status(200).json(changeTodayArr);
  } catch (error) {
    next(error);
  }
};

const removeFromToday = async (req, res, next) => {
  try {
    const changeTodayArr = await UserCollection.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $pull: { todayList: req.params.taskId } },
      { new: true }
    ).populate("todayList");
    res.status(200).json(changeTodayArr);
  } catch (error) {
    next(error);
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const changeFavoriteArr = await UserCollection.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $push: { favoriteList: req.params.taskId } },
      { returnDocument: "after" }
    ).populate("favoriteList");
    res.status(200).json(changeFavoriteArr);
  } catch (error) {
    next(error);
  }
};

const removeFavorite = async (req, res, next) => {
  try {
    const changeFavoriteArr = await UserCollection.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $pull: { favoriteList: req.params.taskId } },
      { returnDocument: "after" }
    ).populate("favoriteList");
    res.status(200).json(changeFavoriteArr);
  } catch (error) {
    next(error);
  }
};

const clearToday = async (req, res, next) => {
  try {
    const changeFailedArr = await UserCollection.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: { todayList: [] },
      }
    );
    res.status(200).json(changeFailedArr);
  } catch (error) {
    next(error);
  }
};

const setCurrentProgress = async (req, res, next) => {
  try {
    const changeUserProgress = await UserCollection.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { progress: req.params.progress },
      { returnDocument: "after" }
    );
    res.status(200).json(changeUserProgress);
  } catch (error) {
    next(error);
  }
};

const getCompletedIds = async (req, res, next) => {
  try {
    const changeUserProgress = await UserCollection.findOne({
      _id: req.params.id,
    })
      .select("todaySuccess")
      .select("todayFailed");
    res.status(200).json(changeUserProgress);
  } catch (error) {
    next(error);
  }
};

const addFailed = async (req, res, next) => {
  try {
    const changeFailedArr = await UserCollection.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $push: {
          todayFailed: req.body,
        },
      },
      { returnDocument: "after" }
    ).populate("todayFailed");
    res.status(200).json(changeFailedArr);
  } catch (error) {
    next(error);
  }
};

const clearFailed = async (req, res, next) => {
  try {
    const changeFailedArr = await UserCollection.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: { todayFailed: [] },
      }
    );
    res.status(200).json(changeFailedArr);
  } catch (error) {
    next(error);
  }
};

const addSuccess = async (req, res, next) => {
  try {
    const changeSuccessArr = await UserCollection.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $push: {
          todaySuccess: req.body,
        },
      },
      { returnDocument: "after" }
    ).populate("todaySuccess");
    res.status(200).json(changeSuccessArr);
  } catch (error) {
    next(error);
  }
};

const clearSuccess = async (req, res, next) => {
  try {
    const changeFailedArr = await UserCollection.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: { todaySuccess: [] },
      }
    );
    res.status(200).json(changeFailedArr);
  } catch (error) {
    next(error);
  }
};

export {
  getUser,
  addToToday,
  removeFromToday,
  addFavorite,
  removeFavorite,
  setCurrentProgress,
  getCompletedIds,
  clearToday,
  addFailed,
  clearFailed,
  addSuccess,
  clearSuccess,
};
