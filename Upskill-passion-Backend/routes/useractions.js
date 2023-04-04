const auth = require("../middlewares/auth");
const { firestore } = require("../utilities/firebase-client");
// const db = firestore.collection('generalusers');
const router = require("express").Router();
const admin = require('firebase-admin');

// save a job/blog/question
router.patch("/save/:action_id", auth, async (req, res) => {
    // action_id = is id of the event blog/question/jobs
    const action = req.body.action;
    const userid = req.userid;
    const action_id = req.params.action_id;
    // console.log(req);
    let db;
    if (req.usertype == 'generaluser') {
        db = firestore.collection('generalusers');
    }
    else if (req.usertype == 'recruiter') {
        db = firestore.collection('recruiter');
    }

    try {
        if (action == "saved-job" && req.usertype == "generaluser") {
            const res2 = await db.doc(userid).get();
            const list = res2.data().saved_jobs;
            let flag = true;
            for (let index = 0; index < list.length; index++) {
                const element = list[index];
                if (element == action_id) {
                    flag = false;
                }
            }
            if (flag) {
                const res1 = await db.doc(userid).update({
                    saved_jobs: admin.firestore.FieldValue.arrayUnion(action_id)
                });
                return res.json({ message: "The Job is saved in users profile" });
            }
            else {
                const res1 = await db.doc(userid).update({
                    saved_jobs: admin.firestore.FieldValue.arrayRemove(action_id)
                });
                return res.json({ message: "The Job is removed from users profile" });
            }

        }
        else if (action == "saved-blog") {
            const res2 = await db.doc(userid).get();
            const list = res2.data().saved_blogs;
            let flag = true;
            for (let index = 0; index < list.length; index++) {
                const element = list[index];
                if (element == action_id) {
                    flag = false;
                }
            }
            if (flag) {
                const res1 = await db.doc(userid).update({
                    saved_blogs: admin.firestore.FieldValue.arrayUnion(action_id)
                });
                return res.json({ message: "The blog is saved in users profile" });
            }
            else {
                const res1 = await db.doc(userid).update({
                    saved_blogs: admin.firestore.FieldValue.arrayRemove(action_id)
                });
                return res.json({ message: "The blog is removed from users profile" });
            }

        }
        else if (action == "saved-question") {
            const res2 = await db.doc(userid).get();
            const list = res2.data().saved_queries;
            let flag = true;
            for (let index = 0; index < list.length; index++) {
                const element = list[index];
                if (element == action_id) {
                    flag = false;
                }
            }
            if (flag) {
                const res1 = await db.doc(userid).update({
                    saved_queries: admin.firestore.FieldValue.arrayUnion(action_id)
                });
                return res.json({ message: "The Question is saved in users profile" });
            }
            else {
                const res1 = await db.doc(userid).update({
                    saved_queries: admin.firestore.FieldValue.arrayRemove(action_id)
                });
                return res.json({ message: "The Question is removed from users profile" });
            }

        }

        res.json({ message: "Successfully performed the action" });
    }
    catch (error) {
        console.log(error);
        res.json({ message: "there has been some error check logs" });
    }
});


module.exports = router;