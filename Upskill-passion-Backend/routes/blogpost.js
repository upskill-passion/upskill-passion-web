const { dbb, firestore } = require("../utilities/firebase-client");

const router = require('express').Router();
const admin = require('firebase-admin');
const { postNewBlog, reactOnBlog, updateBlog } = require("../controllers/blogController");
const auth = require("../middlewares/auth");

// Create a new blog
router.post('/blog', auth, postNewBlog)

// React on a blog
router.patch("/blog/:id", auth, reactOnBlog)

// Get a blog by id
router.get("/blog/:id", async (req, res) => {
  const result = await getBlog(req.params.id);
  res.json(result);
})

// Get all blogs
// Get all blogs with filters and sorting
// Get all blogs with filters and sorting
router.get('/blogs', async (req, res) => {
  try {
    let query = firestore.collection('blogs');

    // Apply filters
    if (req.query.tags) {
      const tags = req.query.tags ? req.query.tags.split(",") : null;
      // console.log(tags);
      query = query.where('tags', 'array-contains-any', tags);
    }
    if (req.query.min_qualifications) {
      const minQualifications = Array.isArray(req.query.min_qualifications) ? req.query.min_qualifications : [req.query.min_qualifications];
      query = query.where('min_qualification', 'in', minQualifications);
    }

    // Apply sorting
    if (req.query.sort_by === 'time') {
      query = query.orderBy('time', 'desc');
    } else if (req.query.sort_by === 'upvote_counts') {
      query = query.orderBy('upvote_count', 'desc');
    }

    const snapshot = await query.get();
    const blogs = [];
    snapshot.forEach((doc) => {
      blogs.push({ id: doc.id, ...doc.data() });
    });
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

async function getBlog(id) {
  const doc = await dbb.doc(id).get();
  // console.log(doc.data());
  return doc.data();
}

// Edit your previously pulished blog
router.put('/blog/:id', auth, updateBlog)

// route to get all tags from all blogs
router.get("/blogtags", async (req, res) => {
  const tags = await dbb.get().then((querySnapshot) => {
    const tagSet = new Set();
    querySnapshot.forEach((doc) => {
      doc.data().tags.forEach((tag) => tagSet.add(tag));
    });
    return [...tagSet];
  });
  res.json({ tags });

})

// Get posted blogs by a user
router.get("/postedBlogs/:userid", async (req, res) => {
  try {
    const userid = req.params.userid;
    let con = await firestore.collection("recruiter").doc(userid).get();
    if (con.data() === undefined) {
      con = await firestore.collection("generalusers").doc(userid).get();
    }

    let result = [];
    const blogids = con.data().posted_blogs;
    for (let i = 0; i < blogids.length; i++) {
      const element = blogids[i];
      let data1 = await firestore.collection('blogs').doc(element).get();
      let data2 = data1.data();
      if(userid!="csBymea6kNgvODjFZwY0"){
        data2["id"] = data1.id;
      }
      
      result.push(data2);
    }

    return res.json(result);

  } catch (error) {
    console.error(error)
    res.json({ message: "some error occurred" })
  }
})


module.exports = router;