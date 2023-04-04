const { firestore } = require("../utilities/firebase-client");

const db = firestore.collection('generalusers');
const dbb = firestore.collection("recruiter");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "satyamgupta"

const register = async (req, res) => {
    try {
        const type = req.body.type;
        const email = req.body.email;
        const hashedPassword = await bcrypt.hash(req.body.pswd, 10);

        const user = {
            "name": req.body.name,
            "DOB": req.body.DOB,
            "email": email,//unique verified email
            "pswd": hashedPassword,
            "social_media": req.body.social_media || [],
            "current_company": req.body.current_company || "",
            // "saved_jobs": req.body.saved_jobs || [],
            "posted_blogs": req.body.posted_blogs || [],
            "saved_blogs": req.body.saved_blogs || [],
            "answered_queries": req.body.answered_queries || [],
            "saved_queries": req.body.saved_queries || [],
            "asked_queries": req.body.asked_queries || []
        }
        let res1 = "";

        if (type == "generaluser") {
            const querySnapshot = await db.where("email", "==", email).get();
            if (!querySnapshot.empty)
                return res.status(409).json({ message: "email already exists in the database, please use another email" });

            user["saved_jobs"] = req.body.saved_jobs || [];
            res1 = await db.add(user);
            // res.send(`Registered an general user with user id ${res1.id}`);
        }
        else if (type == "recruiter") {
            const querySnapshot = await dbb.where("email", "==", email).get();
            if (!querySnapshot.empty)
                return res.status(409).json({ message: "email already exists in the database, please use another email" });

            user["posted_jobs"] = req.body.posted_jobs || [];
            res1 = await dbb.add(user);
            // res.send(`Registered an recruiter with user id ${res1.id}`);
        }
        // generating a json token
        const token = jwt.sign({ email: email, id: res1.id, usertype: type, username: req.body.name }, SECRET_KEY);
        return res.status(201).json({ token: token, id: res1.id, usertype: type, username: req.body.name });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "something went wrong" })
    }

};

const login = async (req, res) => {
    try {
        const type = req.body.type;
        const email = req.body.email;
        const pswd = req.body.pswd;

        if (type == "generaluser") {

            const querySnapshot = await db.where("email", "==", email).get();
            const data2 = querySnapshot.docs[0].data();

            if (querySnapshot.empty)
                return res.status(404).json({ message: "user no found" });
            const matchPassword = await bcrypt.compare(pswd, data2.pswd);
            if (!matchPassword) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }
            // Generate Token
            const uid = querySnapshot.docs[0].id;
            // console.log(querySnapshot.docs[0].id);
            const token = jwt.sign({ email: email, id: uid, usertype: type, username: data2.name }, SECRET_KEY);
            return res.status(201).json({ token: token, id: uid, usertype: type, username: data2.name });
        }
        else if (type == "recruiter") {

            const querySnapshot = await dbb.where("email", "==", email).get();
            // console.log(querySnapshot.docs[0].data());
            const data2 = querySnapshot.docs[0].data();

            if (querySnapshot.empty)
                return res.status(404).json({ message: "user no found" });
            const matchPassword = await bcrypt.compare(pswd, data2.pswd);
            if (!matchPassword) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }
            // Generate Token
            const uid = querySnapshot.docs[0].id;
            // console.log(querySnapshot.docs[0].id);
            const token = jwt.sign({ email: email, id: uid, username: data2.name, usertype: type }, SECRET_KEY);
            res.status(201).json({ token: token, id: uid, username: data2.name, usertype: type });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "something went wrong" })
    }

}

module.exports = {
    login,
    register
}