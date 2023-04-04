import useSWR from "swr";
import Select from "react-select";

import { getBlogTags } from "../api/blogsApi";

const orderOptions = (values) => {
  return values
    .filter((v) => v.isFixed)
    .concat(values.filter((v) => !v.isFixed));
};

const ReactSelect = ({ selectedTags, setSelectedTags }) => {
  const { isLoading, error, data } = useSWR("/blogtags", getBlogTags);
  //   console.log(data?.tags);

  //   console.log("Selected Tags", selectedTags);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>{error.message}</p>;
  } else {
    const tagOptions = data?.tags?.map((tag) => ({
      value: tag.toLowerCase(),
      label: tag,
    }));

    // console.log(tagOptions);
    const onChange = (newValue, actionMeta) => {
      switch (actionMeta.action) {
        case "remove-value":
        case "pop-value":
          if (actionMeta.removedValue.isFixed) {
            return;
          }
          break;
        case "clear":
          newValue = tagOptions.filter((v) => v.isFixed);
          break;
      }

      setSelectedTags(orderOptions(newValue));
    };

    content = (
      <Select
        // defaultValue={[tagOptions[0], tagOptions[1]]}
        value={selectedTags}
        isMulti
        name="tags"
        options={tagOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={onChange}
      />
    );
  }
  return content;
};
export default ReactSelect;
