// Authentication of user
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // to make secure passoword by addting salt and papper and converting into hash
const JWT_SECRET = "thisisfortesting_only";


// Create a user starts - Route 1 //
// validating the input for user creation. Which can be used to report any errors before creating the user
create_user_validation = [
  body("name", "Name must be atleast 3 characters").isLength({ min: 3 }),
  body("email", "Enter a valid email id").isEmail(),
  body("password", "Password must be atleast 5 characters").isLength({ min: 5 }),
];

// Route - 1: Create a user using: POST "/api/auth/createuser" (Dno login required because we are creating a user)
router.post("/createuser", create_user_validation, async (req, res) => {
  let success = false;
  // check errors - If there are errors then return bad request and message
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    // Check whether the same email already exists or not
    let user = await User.findOne({ email: req.body.email }); // query for a single document in a collection (Here: email id)
    if (user) {
      return res
        .status(400).json({ success, error: "Sorry! A user with same email id already exists" });
    }

    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hashSync(req.body.password, salt);

    // Create new user if everything is okay
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    // Getting authtoken for user and we will retrived user by it's ID. It's faster.
    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, JWT_SECRET); // JWR_SECRET will ensure if someone has tempered the token or not.
    success = true;
    res.json({ success, authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error - Soon will be resolved");
  }
});


// login method starts - Route 2//
// validating the input for login process. Which can be used to report any errors before creating the user
login_validation = [
  body("email", "Enter a valid Email Id").isEmail(),
  body("password", "Password can't be blank").exists(),
];

// Route - 2: Autheticate a user using: POST "/api/auth/login" (no login required because we are getting logged in)
router.post("/login", login_validation, async (req, res) => {
  let success = false;
  // check errors - If there are errors then return bad request and message
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructuring email and password from body
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email }); // query for a single document in a collection (Here: email id)
    if (!user) {
      success: false;
      return res
        .status(400)
        .json({ success, error: "Please try to login with correct credential!" });
    }

    const passwordComapare = await bcrypt.compare(password, user.password);
    if (!passwordComapare) {
      success = false;
      return res
        .status(400)
        .json({ success, error: "Please try to login with correct credential!" });
    }

    // Payload data - User's data
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken }); // User id is stored in authtoken
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error - Soon will be resolved");
  }
});


// Get user details method starts - Route 3//
// Route - 3: get user details using: POST "/api/auth/getuser" (login required to get the user's data)
router.post("/getuser", fetchuser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error - Soon will be resolved");
  }
});

module.exports = router;
