const admin = require('firebase-admin');
const { db, firestore } = require("../utilities/firebase-client");


const postNewQuery = async (req, res) => {
  // console.log(req.body);
  try {
    const data = {
      question: req.body.question,
      posted_by: req.username,//req.body.posted_by,
      username: req.userid,//req.body.username,
      usertype: req.usertype,
      time: admin.firestore.FieldValue.serverTimestamp(),
      tags: req.body.tags || []
    };

    // console.log(data);
    const res1 = await db.add(data);
    if (req.usertype == "recruiter") {
      const res2 = await firestore.collection('recruiter').doc(req.userid).update({
        asked_queries: admin.firestore.FieldValue.arrayUnion(res1.id)
      });
    }
    else if (req.usertype == "generaluser") {
      const res2 = await firestore.collection('generalusers').doc(req.userid).update({
        asked_queries: admin.firestore.FieldValue.arrayUnion(res1.id)
      });
    }


    res.json({ message: `Added query with id ${res1.id}` });
  }
  catch (e) {
    res.json({ message: "Sorry There has been some problem" });
  }
};

const updateQuery = async (req, res) => {
  let query_id = req.params.id;
  try {
    const res1 = await db.doc(query_id).update({
      question: req.body.question,
      tags: req.body.tags || []
    });
    return res.json({ message: "successfully updated" });
  } catch (error) {
    console.error(error);
    return res.json({ message: "There has been some error" });
  }
};

const getDetailsOfQuestion = async (req, res) => {
  const result = await getQuery(req.params.id);
  res.json(result);
}


async function getQuery(id) {
  const doc = await db.doc(id).get();
  const data = doc.data();
  const arr1 = [];
  data.id = doc.id;
  const snapshot = await db.doc(id).collection('answers').get();

  for (const doc1 of snapshot.docs) {
    const ans = doc1.data();
    const arr2 = [];
    ans.id = doc1.id;
    const snapshot2 = await db.doc(id).collection('answers').doc(doc1.id).collection('replies').get();

    for (const doc2 of snapshot2.docs) {
      const reply = doc2.data();
      reply.id = doc2.id;
      arr2.push(reply);
    }

    ans["replies"] = arr2;
    arr1.push(ans);
  }

  data["answers"] = arr1;
  // console.log(data.answers[0].replies);

  return data;
}


// getQuery("4UxAnIVwofyxt9Qxnszo");


module.exports = {
  postNewQuery,
  getDetailsOfQuestion,
  updateQuery,
  getQuery

}