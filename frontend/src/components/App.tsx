import React, { useState } from "react";
import AnswerCard from "./AnswerCard";
import Button from "./Button";
import Footer from "./Footer";
import Heading from "./Heading";
import MainWrapper from "./MainWrapper";
import TextArea from "./TextArea";

const App: React.FC = () => {
  const [textarea, setTextarea] = useState("");
  const [answer, setAnswer] = useState("");
  const handleClick = async () => {
    const options = {
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    const jsonToSend = {
      prompt: `${textarea}\n\nTl;dr`,
      ...options,
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/engines/text-curie-001/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
          body: JSON.stringify(jsonToSend),
        }
      );

      const data = await response.json();
      setAnswer(data.choices[0].text);
      setTextarea("");
    } catch (e) {
      console.error(e);
      alert("An error occurred, please try again later");
    }
  };
  return (
    <MainWrapper>
      <Heading />
      <TextArea textarea={textarea} setTextarea={setTextarea} />
      <Button text="Generate!" handleClick={handleClick} />
      <hr />
      <AnswerCard answer={answer} />
      <Footer />
    </MainWrapper>
  );
};

export default App;
