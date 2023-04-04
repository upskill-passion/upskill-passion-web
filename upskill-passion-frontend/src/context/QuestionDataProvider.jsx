import { createContext, useState } from "react";

const QuestionData = createContext({});

export const QuestionDataProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  return (
    <QuestionData.Provider value={{ questions, setQuestions }}>
      {children}
    </QuestionData.Provider>
  );
};

export default QuestionData;
