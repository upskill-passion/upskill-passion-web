const admin = require('firebase-admin');
const { dbb, firestore } = require("../utilities/firebase-client");

const postNewBlog = async (req, res) => {
  try {
    const blog = {
      title: req.body.title,
      content: req.body.content,
      posted_by: req.username,
      username: req.userid,
      usertype: req.usertype,
      time: admin.firestore.FieldValue.serverTimestamp(),
      min_qualification: req.body.min_qualification,
      upvote_count: 0,
      downvote_count: 0,
      tags: req.body.tags
    }

    // console.log(blog);
    const res1 = await dbb.add(blog);
    // const db=firestore.collection("generalusers");
    let db;
    const userid = req.userid;
    if (req.usertype == "generaluser") {
      db = firestore.collection("generalusers");
    }
    else if (req.usertype == "recruiter") {
      db = firestore.collection('recruiter');
    }
    const res2 = db.doc(userid).update({
      posted_blogs: admin.firestore.FieldValue.arrayUnion(res1.id)
    });

    res.json({ message: `Added blog with id ${res1.id}` });
  }
  catch (e) {
    console.error(e);
    res.json({ message: "Sorry there has been some problem, please see the logs" });
  }
}

const reactOnBlog = async (req, res) => {
  const action = req.body.action;
  try {
    const blog_id = req.params.id;

    if (action == "up") {
      const res = dbb.doc(blog_id).update({
        upvote_count: admin.firestore.FieldValue.increment(1)
      });
    }
    else if (action == 'down') {
      const res = dbb.doc(blog_id).update({
        downvote_count: admin.firestore.FieldValue.increment(1)
      });
    }
    // else{
    //   res.json({message:"Could do nothing"});
    // }

    res.json({ message: "Success" });
  }
  catch (error) {
    console.error(error);
    res.json({ message: "error in performing action" });
  }
}



const updateBlog = async (req, res) => {
  try {
    const blog_id = req.params.id;

    const res1 = await dbb.doc(blog_id).update({
      title: req.body.title,
      content: req.body.content,
      // posted_by: req.body.posted_by,
      // username: req.body.username,
      // usertype: req.body.usertype,
      time: admin.firestore.FieldValue.serverTimestamp(),
      min_qualification: req.body.min_qualification,
      // upvote_count: req.body.upvote_count,
      // downvote_count: req.body.downvote_count,
      tags: req.body.tags
    })

    res.json({ message: `Updated blog with id ${blog_id}` });
  }
  catch (e) {
    console.error(e);
    res.json({ message: "Sorry there has been some problem, please see the logs" });
  }
}


module.exports = {
  reactOnBlog,
  postNewBlog,
  updateBlog
}
