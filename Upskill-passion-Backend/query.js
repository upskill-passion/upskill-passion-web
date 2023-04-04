// {
//     "name":"queries-dataset",
//     "queries":[
//         {
//             "id":"default generated",
//             "question":"text",
//             "posted_by":"userid",
//             "time":"timestampt",
//             "username":"username",
//             "answers":[
//                 {
//                     "id":"default generated",
//                     "answer":"text",
//                     "posted_by":"userid",
//                     "username":"username",
//                     "usertype":"org/student/volunteer",
//                     "time":"timestamp",
//                     "upwote-count":15,
//                     "downvote-count":16,
//                     "replies":[
//                         {
//                             "id":"default generated",
//                             "reply":"text",
//                             "posted_by":"text",
//                             "userid":"text",
//                             "timestamp":"timestamp",
//                             "referring-reply":"reply id which you are referring"            
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
// }

const data = {
  question: 'The Question is what is the question',
  posted_by_userid: 'stymgupta',
  time: 'timestamp',
  username: 'Satyam Gupta',
  tags:[],
  answers: [
    {
      answer: 'See the question is hypothetical',
      posted_by_userid: 'tejasgundle',
      username: 'Tejas',
      usertype: 'org/student/volunteer',
      time: 'timestamp',
      upvote_count: 15,
      downvote_count: 16,
      replies: [
        {
          reply: "You don't see where you are wrong do you tejas",
          posted_by_userid: 'mayankmangal',
          username: 'Mayank',
          timestamp: 'timestamp',
          referring_reply: ''
        }
      ]
    }
  ]
};

const job = {
  "title": text,
  "Description": text,
  "posted_by": text,// User Id of posting man
  "posted_by_name": text, //name of user posting the jobs
  "company_name": text,
  "industry": text,// Industry in which job belongs
  "tags": [text],//All the tags for smooth searching of the job later
  "jobtype": ["permanent", "Temporary", "Internship", "volunteer-work", "part-time"],
  "MinEducation": ["Bachelors", "Masters", "HSC", "Intermediate", "Diploma", "certification", "phd"],
  "positions": Number,
  "applicants": [""],// List of id's of those who already applied
  "experience": Number,//Years of experience,
  "salary": Number,
  "posting-date": Date,
  "address": text,
}

const user = {
  "name": text,
  "DOB": Date,
  "email": text,//unique verified email
  "phone": text,
  "peramanent-address": text,
  "curr-address": text,
  "pswd": text,//encrypted password
  "education": [
    {
      "type": 'choice["Bachelors", "Masters", "HSC", "Intermediate", "Diploma", "certification","phd"]',
      "institution": "A B C D XZpuram, tu colony U.V.",
      "Status": "choice['Passed','Appearing']",
      "passing-year": "2018",
      "grading_method": "choice[percentage,CGPA]",
      "score": "95%"
    }
  ],

  "skills": [""],// Array of his skills
  "current-work-company": text,
  "preferences": ["jobsearch", "voluteer-work", "none"],
  "social-media": ["text"],// links of users other social media accounts profiles
  "saved-jobs": [],
  "saved-blogs": [],
  "created-blogs": [],
  "answered-queries": [],
  "saved-queries": [],
  "asked_queries":[],
  "profile-image": text
}

// Give message to user while applying for a job, that recruiter profile not verified, please verify at your end.
// Near future thinkg of method to verify user.

const Recruiter = { //Assuming a person not an entity
  "name": text,
  "DOB": Date,
  "email": text,//unique
  "phone": text,
  "address": text,
  "pswd": text,//encrypted password,
  "description": text,// Do you want to tell something about you or your company, include website, other contact details,
  "current-work-company": text,  //name of organization/company/NGO/shop
  "social-media": ["text"],// links of users other social media accounts
  "posted-jobs": [],
  "posted-blogs": [],
  "saved-blogs": [],
  "answered-questions": [],
  "saved-questions": [],
  "asked_question":[],
  //we can verify identity of user using Id card and photo
  "profile-image": []
}

// to implement hashtag and mentions so that if anyone react to you reply you get notified.