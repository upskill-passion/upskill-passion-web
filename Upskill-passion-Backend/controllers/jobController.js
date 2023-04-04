const { firestore } = require("../utilities/firebase-client");
const db = firestore.collection('jobs');
// const router = require("express").Router();
const admin = require('firebase-admin');

const postANewJob = async (req, res) => {
    if (req.usertype != "recruiter")
        res.json({ message: "you are not permitted to post a new job" })
    try {
        const job = {
            "title": req.body.title,
            "description": req.body.description,
            "posted_by": req.userid,// User Id of posting man
            "posted_by_name": req.username, //name of user posting the jobs
            "company_name": req.body.company_name,
            "industry": req.body.industry,// Industry in which job belongs
            "tags": req.body.tags,//Array of All the tags for smooth searching of the job later
            "jobtype": req.body.jobtype,// ["Permanent", "Temporary", "Internship", "Volunteer-Work","PartTime"],
            "MinEducation": req.body.MinEducation,//["Bachelors", "Masters", "HighSchool", "InterMediate", "Diploma", "Certification", "PHD"],
            "positions": req.body.positions,//no of positions
            "applicants": [],// List of id's of those who already applied
            "experience": req.body.experience,//Years of experience,
            "salary": req.body.salary,
            "posting_date": admin.firestore.FieldValue.serverTimestamp(),
            "address": req.body.address
        }
        const res1 = await db.add(job);
        const res2 = await firestore.collection('recruiter').doc(req.userid).update({
            posted_jobs: admin.firestore.FieldValue.arrayUnion(res1.id)
        });
        res.json({ message: `Posted a job with id ${res1.id}` });
    } catch (error) {
        console.error(error);
        res.json({ message: "Some error occurured please check the logs" });
    }
};

const updateExistingJob = async (req, res) => {
    if (req.usertype != "recruiter")
        res.json({ message: "you are not permitted to post a new job" })
    try {
        const res1 = await db.doc(req.params.id).update({
            "title": req.body.title,
            "description": req.body.description,
            // "posted_by": req.body.posted_by,// User Id of posting man
            // "posted_by_name": req.body.posted_by_name, //name of user posting the jobs
            // "company_name": req.body.company_name,
            // "industry": req.body.industry,// Industry in which job belongs
            "tags": req.body.tags,//Array of All the tags for smooth searching of the job later
            "jobtype": req.body.jobtype,// ["permanent", "Temporary", "Internship", "volunteer-work","part-time"],
            "MinEducation": req.body.MinEducation,//["Bachelors", "Masters", "HSC", "Intermediate", "Diploma", "certification", "phd"],
            "positions": req.body.positions,//no of positions
            // "applicants": [],// List of id's of those who already applied
            "experience": req.body.experience,//Years of experience,
            "salary": req.body.salary,
            "last_update": admin.firestore.FieldValue.serverTimestamp(),
            "address": req.body.address
        });
        res.json({ message: `Updated a job with id ${req.params.id}` });
    } catch (error) {
        console.error(error);
        res.json({ message: "Some error occurured please check the logs" });
    }
};


module.exports = {
    postANewJob,
    updateExistingJob
}