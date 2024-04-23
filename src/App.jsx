import { useState, useEffect } from "react";
import Feedback from "./components/Feedback/Feedback";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
function App() {
  const [countFeedback, setCountFeedback] = useState(() => {
    const savedFeedback = window.localStorage.getItem("countFeedback");
    if (savedFeedback !== null) {
      return JSON.parse(savedFeedback);
    }
    return { good: 0, neutral: 0, bad: 0 };
  });

  const { good, neutral, bad } = countFeedback;
  const totalFeedback = good + neutral + bad;
  const positiveFeedback = Math.round((good / totalFeedback) * 100);

  const updateFeedback = (type, value = null) => {
    setCountFeedback((prevCountFeedback) => {
      if (value === null) {
        return {
          ...prevCountFeedback,
          [type]: prevCountFeedback[type] + 1,
        };
      } else {
        return {
          ...prevCountFeedback,
          [type]: value,
        };
      }
    });
  };
  useEffect(() => {
    localStorage.setItem("countFeedback", JSON.stringify(countFeedback));
  }, [countFeedback]);

  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} />
      <Feedback
        countFeedback={countFeedback}
        totalFeedback={totalFeedback}
        positiveFeedback={positiveFeedback}
      />
    </>
  );
}

export default App;
