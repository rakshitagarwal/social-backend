const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

const User = require("../Modals/User");

router.post(
  "/create/user",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("username").isLength({ min: 3 }),
  body("phonenumber").isLength({ min: 10 }),
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(200).json("Please login with correct password");
      }
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: secpass,
        profile: req.body.profile,
        phonenumber: req.body.phonenumber,
      });

      await user.save();
      res
        .status(200)
        .json({user});
    } catch (err) {
        return res.status(400).json("Internal error occured")         

    }
  }
);

module.exports = router;
