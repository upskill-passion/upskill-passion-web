
const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();
router.get("/hi", (req, res) => {
    const data1 = req.body.data || 'satyam';
    console.log(req.body);

    res.send(`Hello from the viewws side. here is the ${data1}`);
})

router.get("/hi/:id", auth, (req, res) => {
    // const data1 = req.body.data || 'satyam';
    // console.log(req.params.id);
    res.send(`Hello from the viewws side. here is the ${req.usertype} ${req.params.id}${req.usertype != "recruiter"}`);
})
module.exports = router;