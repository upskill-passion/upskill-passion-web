const { login, register } = require("../controllers/authController")
const { completeProfileGeneralUser, getProfile, completeProfileRecruiter, getProfileUniversal } = require("../controllers/profileController");
const auth = require("../middlewares/auth");
const router = require("express").Router();

// Register a new user
router.post("/register", register);

// login user
router.post("/login", login);

// Complete your profile
router.put("/profileg/:userid", auth, completeProfileGeneralUser);


//Complete your profile
router.put("/profiler/:userid", auth, completeProfileRecruiter);
// Get your profile
router.get("/profile", auth, getProfile);


// Get anyone's profile
router.get("/profile/:userid", getProfileUniversal);

module.exports = router;