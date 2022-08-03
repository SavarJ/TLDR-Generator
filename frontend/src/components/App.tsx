import React, { useEffect, useState } from "react";
import AnswerCard from "./AnswerCard";
import Button from "./Button";
import Footer from "./Footer";
import Heading from "./Heading";
import MainWrapper from "./MainWrapper";
import TextArea from "./TextArea";
import { Answer } from "./Answer";
import Results from "./Results";

const BACKEND_API_URL = "http://localhost:5050/api/answers/";

const App: React.FC = () => {
  const [textarea, setTextarea] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(BACKEND_API_URL);
      const data = await response.json();
      setAnswers(data.data);
    };
    getData();
  }, []);

  const handleClick = async () => {
    try {
      const response = await fetch(BACKEND_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `${textarea.slice(0, 500)}`,
        }),
      });

      const answers = await response.json();
      setAnswers(answers.data);
      setTextarea("");
    } catch (e) {
      console.error(e);
      alert("An error occurred, please try again later");
      alert(
        "If you try running this app but get an error, it is likely due to OPEN AI recycling the API KEY."
      );
    }
  };
  return (
    <MainWrapper>
      <Heading />
      <TextArea textarea={textarea} setTextarea={setTextarea} />
      <Button text="Generate!" handleClick={handleClick} />
      <hr />
      <Results array={answers} />
      <Footer />
    </MainWrapper>
  );
};

export default App;
