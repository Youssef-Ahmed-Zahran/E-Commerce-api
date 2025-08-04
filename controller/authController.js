const {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
} = require("../models/User");
const CryptoJS = require("crypto-js");

/**
 *   @desc   Register New User
 *   @route  /api/auth/register
 *   @method  Post
 *   @access  public
 */
module.exports.register = async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "this user is already exist!" });
    }

    var encrypted = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: encrypted,
    });

    const savedUser = await newUser.save();
    const token = newUser.generateToken();
    const { password, ...others } = savedUser._doc;

    res.status(201).json({ ...others, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 *   @desc   Login User
 *   @route  /api/auth/login
 *   @method  Post
 *   @access  public
 */
module.exports.login = async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Wrong credentials!" });
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json({ message: "Wrong credentials!" });
    }

    const token = user.generateToken();
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
