const { db } = require("../utilities/firebase-client");
const router = require('express').Router();
const admin = require('firebase-admin');

const replyToAnswer = async (req, res) => {
  try {
    const reply = {
      reply: req.body.reply,
      posted_by: req.username,//req.body.posted_by,
      username: req.userid,//req.body.username,
      usertype: req.usertype,//req.body.usertype,
      time: admin.firestore.FieldValue.serverTimestamp(),
      referring_reply: req.body.referring_reply||""
    }
    const ans_id = req.params.ans_id;
    const query_id = req.params.q_id;
    const res1 = await db.doc(query_id).collection('answers').doc(ans_id).collection('replies').add(reply);

    res.json({ message: `Added reply with id ${res1.id}` });
  }
  catch (e) {
    console.error(e);
    res.json({ message: "There has been some error please check the logs" });
  }

};

const editPreviousReply = async (req, res) => {
  try {

    const ans_id = req.params.ans_id;
    const query_id = req.params.q_id;
    const reply_id = req.params.reply_id
    const res1 = await db.doc(query_id).collection('answers').doc(ans_id).collection('replies').doc(reply_id).update({
      reply: req.body.reply,
      time: admin.firestore.FieldValue.serverTimestamp(),
      referring_reply: req.body.referring_reply
    })

    res.json({ message: `updated reply with id ${reply_id}` });
  }
  catch (e) {
    console.error(e);
    res.json({ message: "There has been some error please check the logs" });
  }

};

module.exports = {
  replyToAnswer,
  editPreviousReply
}