import { facebook, instagram, linkedin, twitter } from "../assets";

export const navLinks = [
  {
    id: "",
    title: "Home",
  },
  {
    id: "jobs",
    title: "Jobs",
  },
  {
    id: "qna",
    title: "Q&A",
  },
  {
    id: "blogs",
    title: "Blogs",
  },
  {
    id: "postedJobs",
    title: "Posted Jobs",
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];

export const DemoData = [
  {
    question: "what is the status of G20?",
    showallreplies: false,
    replies: [
      {
        name: "Vsnsainivas",
        designation: "senior health minister",
        upvotes: 20,
        answer: "G20 meet yet to be done and it will be doing",
        vote: "",
        laterSaved: true,
        replyToReplies: [
          {
            name: "Vansh",
            reply: "soo true",
          },
        ],
      },

      {
        name: "Satyam Gupta",
        designation: "regional transport secretary",
        upvotes: 10,
        answer: "It will be happening quite soon",
        vote: "down",
        laterSaved: false,
        replyToReplies: [
          {
            name: "Vansh",
            reply: "soo true",
          },
        ],
      },
    ],
  },
  {
    question: "who is prime minister of India?",
    showallreplies: false,
    replies: [
      {
        name: "Aman varshney",
        designation: "senior health minister",
        upvotes: 20,
        answer: "I am future prime minister of India",
        vote: "up",
        laterSaved: false,
        replyToReplies: [
          {
            name: "Vansh",
            reply: "soo true",
          },
        ],
      },
      {
        name: "Abhay",
        designation: "regional transport secretary",
        upvotes: 10,
        answer: "Shri Narendra modi ji",
        vote: "down",
        laterSaved: true,
        replyToReplies: [
          {
            name: "Vansh",
            reply: "soo true",
          },
        ],
      },
    ],
  },
];

export const JobTypes = [
  "Permanent",
  "Temporary",
  "Internship",
  "Volunteer-Work",
  "PartTime",
];

export const Experiences = [
  {
    min_experience: 0,
    max_experience: 0,
    id: "no-experience",
    value: "No Experience",
  },
  {
    min_experience: 1,
    max_experience: 2,
    id: "1year-2years",
    value: "1 year - 2 years",
  },
  {
    min_experience: 2,
    max_experience: 5,
    id: "2years-5years",
    value: "2 years - 5 years",
  },
  { min_experience: 5, id: "moreThan5Years", value: "More than 5 years" },
];

export const Qualifications = [
  "Bachelors",
  "Masters",
  "HighSchool",
  "InterMediate",
  "Diploma",
  "Certification",
  "PHD",
];
