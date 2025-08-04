const { User } = require("../models/User");
const CryptoJS = require("crypto-js");

// Http Methods / Verbs

/**
 *   @desc   Get All User
 *   @route  /api/users
 *   @method  Get
 *   @access  private (only admin)
 */
const getAllUsers = async (req, res) => {
  try {
    const query = req.query.new;
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 *   @desc   Get User By Id
 *   @route  /api/users/:id
 *   @method  Get
 *   @access  private (only admin & User himself)
 */
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "user not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 *   @desc   Update User By Id
 *   @route  /api/users/:id
 *   @method  Put
 *   @access  private (only admin & User himself)
 */
const updateUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SEC
        ).toString();
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      ).select("-password");
      return res.status(200).json(updatedUser);
    } else {
      return res.status(404).json({ message: "user not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 *   @desc   Delete User By Id
 *   @route  /api/users/:id
 *   @method  Delete
 *   @access  private (only admin & User himself)
 */
const deleteUserById = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (user) {
      await User.findByIdAndDelete(req.params.id);
      return res
        .status(200)
        .json({ message: "user has been deleted successfully" });
    } else {
      return res.status(404).json({ message: "user not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 *   @desc   Get User Stats
 *   @route  /api/users/stats
 *   @method  Get
 *   @access  private (only admin)
 */
const userStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  userStats,
};
