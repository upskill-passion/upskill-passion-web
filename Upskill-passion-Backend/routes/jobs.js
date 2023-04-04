const { firestore } = require("../utilities/firebase-client");
const db = firestore.collection('jobs');
const router = require("express").Router();
const admin = require('firebase-admin');
const { postANewJob, updateExistingJob } = require("../controllers/jobController");
const auth = require("../middlewares/auth");

// post a job
router.post("/job", auth, postANewJob);

// Update existing job
router.put("/job/:id", auth, updateExistingJob);

// Get all jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobtypeFilter = req.query.jobtype ? req.query.jobtype.split(",") : null;
    const minEducationFilter = req.query.min_education ? req.query.min_education.split(",") : null;
    const minExperienceFilter = req.query.min_experience ? parseInt(req.query.min_experience) : null;
    const maxExperienceFilter = req.query.max_experience ? parseInt(req.query.max_experience) : null;

    let query = db;

    if (jobtypeFilter) {
      query = query.where("jobtype", "in", jobtypeFilter);
    }

    if (minEducationFilter) {
      query = query.where("MinEducation", "in", minEducationFilter);
    }

    if (minExperienceFilter) {
      query = query.where("experience", ">=", minExperienceFilter);
    }

    if (maxExperienceFilter) {
      query = query.where("experience", "<=", maxExperienceFilter);
    }

    const snapshot = await query.get();
    const jobs = [];
    snapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() });
    });
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/postedJobs/:userid', async (req, res) => {
  try {
    const userid = req.params.userid;
    const jobs = await firestore.collection("recruiter").doc(userid).get();
    const jobids = jobs.data().posted_jobs
    let result = [];
    for (let i = 0; i < jobids.length; i++) {
      const element = jobids[i];
      const jobdata = await firestore.collection('jobs').doc(element).get();
      let el = jobdata.data();
      el.id = jobdata.id;
      result.push(el);
    }
    res.json(result)
  } catch (error) {
    console.error(error)
    res.json({ message: "some error occurred" })
  }
})
module.exports = router;