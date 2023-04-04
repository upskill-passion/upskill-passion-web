const { db } = require("../utilities/firebase-client");
const router = require('express').Router();
const admin = require('firebase-admin');
const { postNewQuery, getDetailsOfQuestion,getQuery } = require("../controllers/queryController");
const auth = require("../middlewares/auth");
// !ref: https://stackoverflow.com/questions/59546879/firestore-nested-documents-with-random-id-inside-a-collection-document



// Example usage

// Post a new question
router.post("/query", auth, postNewQuery);

// get all details of a question
router.get("/query/:id", getDetailsOfQuestion);
// Get all queries
router.get('/queries', async (req, res) => {
  try {
    const snapshot = await db.get();
    const queries = [];
    for (const doc of snapshot.docs) {
      const query = await getQuery(doc.id);
      queries.push(query);
    }
    // console.log(queries);
    res.json(queries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});






module.exports = router;


