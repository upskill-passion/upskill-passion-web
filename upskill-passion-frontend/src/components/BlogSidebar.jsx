import { useState } from "react";

import ReactSelect from "./ReactSelect";
import { control } from "../assets";
import { Qualifications } from "../constants";
import useFilterBlogsQuery from "../hooks/useFilterBlogsQuery";

const BlogSidebar = () => {
  const [value, setValue] = useState(0); // for input slider
  const [open, setOpen] = useState(true); // for main BlogSidebar
  const [selectedTags, setSelectedTags] = useState([]);

  const [qualificationType, setQualificationType] = useState(
    new Array(Qualifications.length).fill(false)
  );

  // main query string in context
  const { queryString, setQueryString } = useFilterBlogsQuery();

  // For location range
  const MAX = 600;

  const getBackgroundSize = () => {
    return {
      backgroundSize: `${(value * 100) / MAX}% 100%`,
    };
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

    let qualificationTypeQueryString = "";
    let tagsQueryString = "";

    let requiredQualifications = [];
    let requiredTags = [];
    let allQueryStrings = [];

    qualificationType.forEach((item, idx) => {
      if (item) requiredQualifications.push(Qualifications[idx]);
    });

    if (selectedTags.length) {
      requiredTags = selectedTags.map((tag) => tag.label);
    }

    if (requiredQualifications.length) {
      qualificationTypeQueryString = `min_qualifications=${requiredQualifications.join(
        ","
      )}`;
    }

    if (requiredTags.length) {
      tagsQueryString = `tags=${requiredTags.join(",")}`;
    }

    if (qualificationTypeQueryString) {
      allQueryStrings.push(qualificationTypeQueryString);
    }

    if (tagsQueryString) {
      allQueryStrings.push(tagsQueryString);
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
            <p className="text-[18px] font-semibold block">Select Tags</p>

            <ReactSelect
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
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

export default BlogSidebar;
