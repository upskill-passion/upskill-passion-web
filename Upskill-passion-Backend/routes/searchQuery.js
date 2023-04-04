const { query } = require("express");
const { firestore, dbb } = require("../utilities/firebase-client");
const admin = require('firebase-admin');
const router = require('express').Router();

router.post("/searchQuery", async (req, res) => {
  // console.log(req.body);
  const count = await firestore.collection('blogs').get();
  word = req.body.word;
  try {
    data = [];
    count.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (doc.data().title.toLowerCase().indexOf(word.toLowerCase()) >= 0 || doc.data().content.toLowerCase().indexOf(word.toLowerCase()) >= 0) {
        data.push(doc.data());
      }
    });
    res.send(data);
  }
  catch (e) {
    res.send("Sorry There has been some problem : " + e)
  }
})

router.get("/search", async (req, res) => {
  // console.log(req.body);
  const count = await firestore.collection('jobs').where('MinEducation', '==', 'Bachelors').get();
  try {
    data = [];
    count.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });
    res.send(data);
  }
  catch (e) {
    res.send("Sorry There has been some problem : " + e)
  }
})

router.get("/exp", async (req, res) => {
  // console.log(req.body);
  const count = await firestore.collection('jobs').where('experience', '>', 2).where('experience', '<=', 3).get();
  try {
    data = [];
    count.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });
    res.send(data);
  }
  catch (e) {
    res.send("Sorry There has been some problem : " + e)
  }
})

router.get("/min", async (req, res) => {
  // console.log(req.body);
  const count = await firestore.collection('jobs').where('MinEducation', '==', 'Bachelors').get();
  try {
    data = [];
    count.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });
    res.send(data);
  }
  catch (e) {
    res.send("Sorry There has been some problem : " + e)
  }
})

module.exports = router;
