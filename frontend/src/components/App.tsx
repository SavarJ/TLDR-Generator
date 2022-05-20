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
  const KEY =
    "s:k:-:F:E:q:c:p:7:e:u:w:8:C:h:v:D:V:g:p:O:J:C:T:3:B:l:b:k:F:J:d:B:9:C:V:a:T:V:3:p:N:q:p:g:5:B:b:U:d:m";
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
            Authorization: `Bearer ${KEY.replaceAll(":", "")}`,
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
      <AnswerCard answer={answer} />
      <Footer />
    </MainWrapper>
  );
};

export default App;
