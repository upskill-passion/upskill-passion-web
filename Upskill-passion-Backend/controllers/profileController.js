
const { firestore } = require("../utilities/firebase-client");

const db = firestore.collection('generalusers');
const dbb = firestore.collection("recruiter");

const completeProfileGeneralUser = async (req, res) => {

    try {
        const type = req.body.type;
        // const email=req.body.email;
        const userid = req.params.userid;
        console.log(userid);

        if (type == "generaluser") {
            const res1 = await db.doc(userid).update({
                phone: req.body.phone || "",
                curr_address: req.body.curr_address || "",
                education: [{
                    type: req.body.edtype || "",
                    institution: req.body.institution || "",
                    status: req.body.status || "",
                    passing_year: req.body.passing_year || "",
                    grading_method: req.body.grading_method || "",
                    score: req.body.score || ""
                }],
                parmanent_address: req.body.parmanent_address || "",
                skills: req.body.skills || "",
                current_company: req.body.current_company || "",
                preference: req.body.preference || "",
                social_media: req.body.social_media || [],
                // saved_jobs: req.body.saved_jobs || [],
                // posted_blogs: req.body.posted_blogs || [],
                // saved_blogs: req.body.saved_blogs || [],
                // answered_queries: req.body.answered_queries || [],
                // asked_queries: req.body.asked_queries || [],
                // saved_queries: req.body.saved_queries || [],
                profile_image: req.body.image || ""
            });
            res.json({ message: `Updated profile general user with user id ${userid}` });
        }

    } catch (error) {
        console.error(error);
        res.json({ message: `Some error happened` });
    }
}


const completeProfileRecruiter = async (req, res) => {

    try {
        const type = req.body.type;
        // const email=req.body.email;
        const userid = req.params.userid;
        console.log(userid);

        if (type == "recruiter") {
            const res1 = await db.doc(userid).update({
                phone: req.body.phone || "",
                curr_address: req.body.curr_address || "",
                description: req.body.description || "",
                current_company: req.body.current_company || "",
                social_media: req.body.social_media || [],
                // posted_jobs: req.body.posted_jobs || [],
                // posted_blogs: req.body.posted_blogs || [],
                // saved_blogs: req.body.saved_blogs || [],
                // answered_queries: req.body.answered_queries || [],
                // saved_queries: req.body.saved_queries || [],
                profile_image: req.body.image || "",
                // asked_queries: req.body.asked_queries || []
            });
            res.json({ message: `Updated profile recruiter with user id ${docid}` });
        }


    } catch (error) {
        console.error(error);
        res.json({ message: `Some error happened` });
    }
}



const getProfile = async (req, res) => {

    try {
        const type = req.usertype;
        // console.log(type);
        const uid = req.userid//"6jXxMcDqyKbvfxAoLxMv"//req.params.userid////req.params.id;
        // console.log(uid);


        if (type == "generaluser") {
            const querySnapshot = await db.doc(uid).get();
            // console.log(querySnapshot.docs[0].data());      
            // console.log(userid);     

            if (querySnapshot.empty)
                return res.json({ message: "Profile not found in the database, please check your email" });
            else {
                const data = querySnapshot.data();
                // console.log(data);
                // data.id=querySnapshot.id;
                data["id"] = uid;
                delete data.pswd;
                return res.json(data);
            }

        }
        else if (type == "recruiter") {
            const querySnapshot = await dbb.doc(uid).get();
            // console.log(querySnapshot.docs[0].data());      
            // console.log(userid);     

            if (querySnapshot.empty)
                return res.json({ message: "Profile not found in the database, please check your email" });
            else {
                const data = querySnapshot.data();
                // console.log(data);
                // data.id=querySnapshot.id;
                data["id"] = uid;
                delete data.pswd;
                return res.json(data);
            }
        }

    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "some error happened" })
    }
}
const getProfileUniversal = async (req, res) => {
    const uid = req.params.userid;

    try {
        let dbcon = await firestore.collection("recruiter").doc(uid).get();
        if (dbcon.data() === undefined) {
            dbcon = await firestore.collection("generalusers").doc(uid).get();
        }

        if (dbcon.empty)
            return res.json({ message: "Profile not found in the database, please check userid" });
        else {
            const data = dbcon.data();
            // console.log(data);
            // data.id=querySnapshot.id;
            // console.log(data);
            if (data === undefined) {
                return res.json({ message: "Profile not found in the database, please check userid" })
            }
            data["id"] = uid;
            delete data.pswd;
            res.json(data);
        }

    } catch (error) {
        console.error(error);
    }
}
module.exports = {
    getProfile,
    completeProfileGeneralUser,
    completeProfileRecruiter,
    getProfileUniversal
}