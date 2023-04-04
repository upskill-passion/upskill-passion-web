import { useState } from "react";

import { control } from "../assets";
import { Experiences, JobTypes, Qualifications } from "../constants";
import useFilterJobQuery from "../hooks/useFilterJobQuery";
import ReactSelect from "./ReactSelect";

const JobSidebar = () => {
  const [value, setValue] = useState(0); // for input slider
  const [open, setOpen] = useState(true); // for main JobSidebar

  const [jobtype, setJobtype] = useState(
    new Array(JobTypes.length).fill(false)
  );
  const [experienceType, setExperienceType] = useState(
    new Array(Experiences.length).fill(false)
  );
  const [qualificationType, setQualificationType] = useState(
    new Array(Qualifications.length).fill(false)
  );

  // main query string in context
  const { queryString, setQueryString } = useFilterJobQuery();

  // For location range
  const MAX = 600;

  const getBackgroundSize = () => {
    return {
      backgroundSize: `${(value * 100) / MAX}% 100%`,
    };
  };

  // handle muliple jobtype checkboxes

  const handleOnChangeJobType = (type) => {
    const updatedJobTypes = jobtype.map((item, index) =>
      index === type ? !item : item
    );

    setJobtype(updatedJobTypes);
  };

  // handle muliple experience type checkboxes

  const handleOnChangeExperienceType = (type) => {
    const updatedExperienceTypes = experienceType.map((item, index) =>
      index === type ? !item : item
    );

    setExperienceType(updatedExperienceTypes);
  };

  // handle muliple qualification type checkboxes

  const handleOnChangeQualificationType = (type) => {
    const updatedQualficationTypes = qualificationType.map((item, index) =>
      index === type ? !item : item
    );

    setQualificationType(updatedQualficationTypes);
  };

  const filterJobs = (e) => {
    e.preventDefault();
    let jobTypeQueryString = "";
    let experienceTypeQueryString = "";
    let qualificationTypeQueryString = "";

    let requiredJobTypes = [];
    let requiredExperiences = [];
    let requiredQualifications = [];
    let allQueryStrings = [];

    jobtype.forEach((item, idx) => {
      if (item) requiredJobTypes.push(JobTypes[idx]);
    });

    experienceType.forEach((item, idx) => {
      if (item) requiredExperiences.push(Experiences[idx]);
    });

    qualificationType.forEach((item, idx) => {
      if (item) requiredQualifications.push(Qualifications[idx]);
    });

    // console.log(requiredJobTypes);
    // console.log(requiredExperiences);
    // console.log(requiredQualifications);

    // For Job Type

    if (requiredJobTypes.length) {
      jobTypeQueryString = `jobtype=${requiredJobTypes.join(",")}`;
    }
    // console.log("Job type Query String: ", jobTypeQueryString);
    if (jobTypeQueryString) allQueryStrings.push(jobTypeQueryString);

    // For Experience Type

    let minimumExperience = 9999;
    let maximumExperience = -9999;

    for (let i = 0; i < requiredExperiences.length; i++) {
      if (requiredExperiences[i].min_experience < minimumExperience) {
        minimumExperience = requiredExperiences[i].min_experience;
      }

      if (requiredExperiences[i].max_experience > maximumExperience) {
        maximumExperience = requiredExperiences[i].max_experience;
      }
    }

    if (requiredExperiences.length) {
      experienceTypeQueryString = `min_experience=${minimumExperience}&max_experience=${maximumExperience}`;
    }
    // console.log("Experience type Query String: ", experienceTypeQueryString);
    if (experienceTypeQueryString)
      allQueryStrings.push(experienceTypeQueryString);

    // For Qualification Type

    if (requiredQualifications.length) {
      qualificationTypeQueryString = `min_education=${requiredQualifications.join(
        ","
      )}`;
    }
    // console.log(
    //   "Qualification type Query String: ",
    //   qualificationTypeQueryString
    // );
    if (qualificationTypeQueryString) {
      allQueryStrings.push(qualificationTypeQueryString);
    }

    if (allQueryStrings.length) {
      setQueryString(`?${allQueryStrings.join("&")}`);
    }
  };

  const clearAllFilters = (e) => {
    e.preventDefault();
    setQueryString("");
  };

  const resetFilters = (e) => {
    e.preventDefault();

    setJobtype(new Array(JobTypes.length).fill(false));
    setExperienceType(new Array(Experiences.length).fill(false));
    setQualificationType(new Array(Qualifications.length).fill(false));
  };

  console.log("Main Query String: ", queryString);

  return (
    <div
      className={`${
        open ? "w-72" : "w-5"
      } relative h-full overflow-y-scroll overflow-x-hidden bg-white px-7 pt-8 pb-36 duration-300 flex flex-col gap-5 border-r-2 border-r-[#cecece]`}
    >
      <img
        loading="lazy"
        src={control}
        alt="control"
        className={`absolute cursor-pointer rounded-full -right-2 top-20 w-7 border-2 border-dark-purple ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen((prevState) => !prevState)}
      />
      {open && (
        <form action="" method="get" className="flex flex-col gap-4">
          <button
            type="button"
            className="text-[18px] font-semibold outline-none border-blue-500 border-2 text-blue-500 rounded-sm py-3 px-4 hover:shadow-lg"
            onClick={clearAllFilters}
          >
            Clear all filters
          </button>
          {/* <div className="border-2 border-[#3b5998] rounded-lg py-3 px-2">
            <label
              htmlFor="location-input"
              className="text-[18px] font-semibold block"
            >
              Location{" "}
            </label>
            <input
              type="range"
              id="location-input"
              min="0"
              max={MAX}
              onChange={(e) => setValue(e.target.value)}
              style={getBackgroundSize()}
              value={value}
            />
            <p>{value} Kms</p>
          </div> */}

          <div className="border-2 border-[#3b5998] rounded-lg py-3 px-2 mt-8">
            <p className="text-[18px] font-semibold block">JobType </p>
            {JobTypes.map((item, idx) => (
              <div key={`jobtype-${idx}`}>
                <p>
                  <input
                    type="checkbox"
                    id={item}
                    name="jobtype"
                    value={item}
                    checked={jobtype[idx]}
                    onChange={() => handleOnChangeJobType(idx)}
                  />
                  <label className="capitalize" htmlFor={item}>
                    {" "}
                    {item}
                  </label>
                </p>
              </div>
            ))}
          </div>

          <div className="border-2 border-[#3b5998] rounded-lg py-3 px-2">
            <p className="text-[18px] font-semibold block">
              Experience Required{" "}
            </p>
            {Experiences.map((item, idx) => (
              <p key={`experiencetype-${idx}`}>
                <input
                  type="checkbox"
                  id={item.id}
                  checked={experienceType[idx]}
                  name="experienceRequired"
                  value={item.value}
                  onChange={() => handleOnChangeExperienceType(idx)}
                />
                <label className="capitalize" htmlFor={item.id}>
                  {" "}
                  {item.value}
                </label>
              </p>
            ))}
          </div>

          <div className="border-2 border-[#3b5998] rounded-lg py-3 px-2">
            <p className="text-[18px] font-semibold block">
              Minimum Qualification{" "}
            </p>
            {Qualifications.map((item, idx) => (
              <p key={`qualificationType-${idx}`}>
                <input
                  type="checkbox"
                  id={item}
                  name="minQualification"
                  value={item}
                  checked={qualificationType[idx]}
                  onChange={() => handleOnChangeQualificationType(idx)}
                />
                <label htmlFor={item}> {item}</label>
              </p>
            ))}
          </div>

          <div className="flex w-full justify-between pb-6">
            <button
              type="submit"
              onClick={filterJobs}
              className="font-bold bg-[#3b5998] text-white rounded-lg border-none px-5 py-3"
              formMethod="get"
            >
              Submit
            </button>
            <button
              type="reset"
              className="font-bold bg-[#3b5998] text-white rounded-lg border-none px-5 py-3"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default JobSidebar;
