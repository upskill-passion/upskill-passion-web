const admin = require('firebase-admin');
const { db } = require("../utilities/firebase-client");


const answerAQuestion = async (req, res) => {
  const tag = req.body.tags || [];
  try {
    const ans = {
      answer: req.body.answer,
      posted_by: req.username,//req.body.posted_by,
      username: req.userid,//req.body.username,
      usertype: req.usertype,//req.body.usertype,
      time: admin.firestore.FieldValue.serverTimestamp(),
      upvote_count: 0,
      downvote_count: 0,
      tags: tag||[]
    }
    const query_id = req.params.qid;

    const res1 = await db.doc(query_id).collection('answers').add(ans);
    if (req.usertype == "recruiter") {
      const res2 = await firestore.collection('recruiter').doc(req.userid).update({
        answered_queries: admin.firestore.FieldValue.arrayUnion(query_id)
      });
    }
    else if (req.usertype == "generaluser") {
      const res2 = await firestore.collection('generalusers').doc(req.userid).update({
        answered_queries: admin.firestore.FieldValue.arrayUnion(query_id)
      });
    }

    res.json({ message: `Added answer with id ${res1.id}` });
  }
  catch (e) {
    console.error(e);
    res.json({ message: "Sorry there has been some problem, please see the logs" });
  }
};


const editPreviousAnswerToQuery = async (req, res) => {
  const tag = req.body.tags || [];
  const ans_id = req.params.ans_id;
  try {
    const query_id = req.params.qid;
    const res1 = await db.doc(query_id).collection('answers').doc(ans_id).update({
      answer: req.body.answer,
      time: admin.firestore.FieldValue.serverTimestamp(),
      tags: tag
    })
    // for (let i = 0; i < tag.length; i++) {
    //   const element = tag[i];
    //   const res2=await db.doc(query_id).collection('answers').doc(ans_id).update({
    //     tags:admin.firestore.FieldValue.arrayUnion(element)      
    //   })
    // }

    res.json({ message: `updated answer with id ${ans_id}` });
  }
  catch (e) {
    console.error(e);
    res.json({ message: "Sorry there has been some problem, please see the logs" });
  }
};

const reactOnAnswer = async (req, res) => {
  const action = req.body.action || "";
  try {
    const q_id = req.params.qid;
    const ans_id = req.params.ans_id;
    if (action == "up") {
      const res = db.doc(q_id).collection('answers').doc(ans_id).update({
        upvote_count: admin.firestore.FieldValue.increment(1)
      });
    }
    else if (action == 'down') {
      const res = db.doc(q_id).collection('answers').doc(ans_id).update({
        downvote_count: admin.firestore.FieldValue.increment(1)
      })
    }
    else {
      res.json({ message: "could do nothing" })
    }

    res.json({ message: "Success" });
  }
  catch (error) {
    console.error(error);
    res.json({ message: "error in performing action" });
  }


};

module.exports = {
  answerAQuestion,
  editPreviousAnswerToQuery,
  reactOnAnswer
}