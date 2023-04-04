const { db } = require("../utilities/firebase-client");
const router = require('express').Router();
const admin = require('firebase-admin');
const { answerAQuestion, editPreviousAnswerToQuery, reactOnAnswer } = require("../controllers/answerController");
const auth = require("../middlewares/auth");

// Give answer to a question
router.post('/answer/:qid', auth, answerAQuestion);

// Edit your previous answer to a given question
router.put('/answer/:qid/:ans_id', auth, editPreviousAnswerToQuery);

// Method to like or dislike an answer
router.patch("/answer/:qid/:ans_id", auth, reactOnAnswer);

module.exports = router;