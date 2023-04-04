import QuestionData from "../context/QuestionDataProvider";
import { useContext } from "react";

const useQuestion = () => {
    return useContext(QuestionData);
};

export default useQuestion;