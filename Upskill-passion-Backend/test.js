const { firestore } = require("./utilities/firebase-client");
const dbj = firestore.collection('jobs');
// const router = require("express").Router();
const admin = require('firebase-admin');


// Code to Populate job database
async function postJOb(data) {
    try {
        const job = {
            "title": data.title,
            "description": data.description,
            "posted_by": data.posted_by,// User Id of posting man
            "posted_by_name": data.posted_by_name, //name of user posting the jobs
            "company_name": data.company_name,
            "industry": data.industry,// Industry in which job belongs
            "tags": data.tags,//Array of All the tags for smooth searching of the job later
            "jobtype": data.jobtype,// ["permanent", "Temporary", "Internship", "volunteer-work","part-time"],
            "MinEducation": data.MinEducation,//["Bachelors", "Masters", "HSC", "Intermediate", "Diploma", "certification", "phd"],
            "positions": data.positions,//no of positions
            "applicants": [],// List of id's of those who already applied
            "experience": data.experience,//Years of experience,
            "salary": data.salary,
            "posting_date": admin.firestore.FieldValue.serverTimestamp(),
            "address": data.address
        }
        const res1 = await dbj.add(job);
        console.log(`Posted a job with id ${res1.id}`);
    } catch (error) {
        console.error(error);
        console.log("Some error occurured please check the logs")
    }
};

const file=require("./jobs.json");

for (let i = 0; i < file["jobs"].length; i++) {
    const element = file["jobs"][i];
    postJOb(element);
    
}

// Code to populate users
// const { firestore } = require("./utilities/firebase-client");
//####################################################
/*
const db = firestore.collection('generalusers');
const dbb = firestore.collection("recruiter");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const SECRET_KEY="satyamgupta"

async function register (data){
    try {
        const type = "recruiter";
        const email = data.email;
        data["pswd"]="Recruiter#1234"
        const hashedPassword= await bcrypt.hash(data.pswd,10);

        const user = {
            "name": data.name,
            "DOB": data.DOB, 
            "email": email,//unique verified email
            "pswd": hashedPassword,
            "social_media": data.social_media || [],
            "saved_jobs": data.saved_jobs || [],
            "posted_blogs": data.posted_blogs || [],
            "saved_blogs": data.saved_blogs || [],
            "answered_queries": data.answered_queries || [],
            "saved_queries": data.saved_queries || [],
            "asked_queries": data.asked_queries || []
        }
        let res1="";

        if (type == "generaluser") {
            const querySnapshot = await db.where("email", "==", email).get();
            if (!querySnapshot.empty)
               console.log("email already exists in the database, please use another email");

            res1 = await db.add(user);
            console.log(`Registered an general user with user id ${res1.id}`);
        }
        else if (type == "recruiter") {
            // const querySnapshot = await db.doc(data.id).set(data);
            // if (!querySnapshot.empty)
                // console.log("email already exists in the database, please use another email");

            res1 = await dbb.doc(data.id).set(user);
            console.log(`Registered an recruiter with user id ${res1.id}`);
        }
        generating a json token
        // const token=jwt.sign({email:email,id:res1.id},SECRET_KEY);
        // res.status(201).json({token:token,id:res1.id});

    } catch (error) {
        console.error(error);
        // res.status(500).json({message:"something went wrong"})
    }

};
// total 56 profiles added
const users=require("./recruiter.json");
for (let i = 0; i < users["data"].length; i++) {
    const element = users["data"][i];
    register(element);
    // console.log(element);
    
}
*/