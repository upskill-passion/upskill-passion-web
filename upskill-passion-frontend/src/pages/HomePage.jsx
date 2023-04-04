import { home, img2dashboard, motivation } from "../assets";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <main className="App">
      <div className="w-full bg-[#3b5998] sm:px-16 px-6">
        <Header />
      </div>
      <div className="flex flex-col w-full justify-center items-start">
        <div className="flex flex-col w-full">
          <article className="flex sm:px-4 sm:py-6 p-4 lg:flex-row flex-col items-center sm:justify-around justify-center bg-[#96B9FD]">
            <div className="text-white">
              <h1 className="text-[40px] sm:text-[80px] font-bold leading-10 sm:leading-[88px] tracking-tight">
                Best platform to
                <br />
                <span className="whitespace-nowrap">shape your career</span>
              </h1>
              <p className="font-semibold text-[24px] leading-[32px] tracking-tight my-4 max-w-[700px]">
                A Website to help students acquire knowledge and relevant
                industry skills in their field of interest, and practice them in
                real environments
              </p>
              <button
                type="button"
                className="sm:w-[291px] sm:h-[69px] w-[170px] h-[50px] text-[16px] sm:text-[20px] font-bold tracking-tighter rounded-full bg-[#2786D3] "
                onClick={() => navigate("/register")}
              >
                Register Now
              </button>
            </div>
            <div className="lg:w-[600px] sm:w-[450px] w-[350px] lg:my-0 my-5">
              <img src={home} alt="home" className="w-full object-contain" />
            </div>
          </article>
          <article className="bg-[#76A3F9] flex flex-col gap-10 text-white sm:p-32 p-24">
            <div className="flex flex-col lg:flex-row justify-around items-center gap-4 ">
              <div className="text-left max-w-[600px]">
                <h1 className="text-[34px] tracking-tighter font-bold leading-[40px]">
                  Description
                </h1>
                <p className="text-[22px] leading-[32px] tracking-tight">
                  A platform which is available in almost all local
                  languages.Students can register through the website or by
                  phone call.Teachers can register and create tutorials and host
                  them on youtube in local languages.Students can search for the
                  skills they want to learn.
                </p>
              </div>
              <div className="w-[300px]">
                <img
                  src={motivation}
                  alt="motivation"
                  className="object-contain w-full"
                />
              </div>
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-around items-center gap-4 ">
              <div className="w-[300px]">
                <img
                  src={img2dashboard}
                  alt="img2dashboard"
                  className="object-contain w-full"
                />
              </div>
              <div className="text-left max-w-[600px]">
                <h1 className="text-[34px] tracking-tighter font-bold leading-[40px]">
                  Motivation
                </h1>
                <p className="text-[22px] leading-[32px] tracking-tight">
                  There are no existing solutions to support less educated
                  youngsters in India.There is a huge skill gap that needs to be
                  overcome/fulfilled.To create an easy platform to easily
                  address the problems and get people ready to help
                </p>
              </div>
            </div>
          </article>
          <article className="bg-[#717FFF] py-16">
            <h1 className="text-center text-[#0E0061] sm:text-[45px] text-[30px]">
              Getting Started
            </h1>
            <p className="text-center text-white sm:text-[22px] text-[16px] max-w-[375px] sm:max-w-[700px] lg:max-w-[900px] mx-auto my-4">
              All types of jobs are listed, based on your profile
              jobs/professions woth resources will be displayed to you, you can
              only search for something of you know about ot first, so using the
              profession recommendation you can search for it's related
              information, blogs, resources, no doubt you will have queries
              that's why we built query architecture for you to search for your
              question if already not available, post your questions, if you are
              capable reply to questions raised by others, upvote, downvote
              replies and since we gave you resources for a profession, we also
              built a job architecture for you to search for companies who
              provides jobs in these roles and give you opportunities to apply
              for the job.
            </p>
          </article>
        </div>
      </div>
      <Footer />
    </main>
  );
};
export default HomePage;
