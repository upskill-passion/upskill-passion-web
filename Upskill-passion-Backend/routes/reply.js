const { db } = require("../utilities/firebase-client");
const router = require('express').Router();
const admin = require('firebase-admin');
const { replyToAnswer, editPreviousReply } = require("../controllers/replyController");
const auth = require("../middlewares/auth");

// Reply to a an answer of a question
router.post('/reply/:q_id/:ans_id', auth, replyToAnswer);

// Edit your previous reply for an answer of an given question
router.put('/reply/:q_id/:ans_id/:reply_id', auth, editPreviousReply)


module.exports = router;