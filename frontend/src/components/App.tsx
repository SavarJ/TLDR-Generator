import React, { useEffect, useState } from "react";
import Button from "./Button";
import Footer from "./Footer";
import Heading from "./Heading";
import MainWrapper from "./MainWrapper";
import TextArea from "./TextArea";
import { Answer } from "./Answer";
import Results from "./Results";

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

const App: React.FC = () => {
  const [textarea, setTextarea] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (!BACKEND_API_URL) {
        alert(
          `Unable to load the backend api url. Currently the value is ${BACKEND_API_URL}`
        );
        setButtonDisabled(true);
        return;
      } else {
        const response = await fetch(BACKEND_API_URL);
        const data = await response.json();
        setAnswers(data.data);
      }
    };
    getData();
  }, []);

  const handleClick = async () => {
    try {
      if (!BACKEND_API_URL) {
        alert(
          `Unable to load the backend api url. Currently the value is ${BACKEND_API_URL}`
        );
        setButtonDisabled(true);
        return;
      } else {
        const response = await fetch(BACKEND_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `${textarea.slice(0, 500)}`,
          }),
        });

        if (!response.ok) {
          throw new Error();
        }

        const answers = await response.json();
        if (answers.statusCode === 500) {
          throw new Error();
        }
        setAnswers(answers.data);
        setTextarea("");
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred, please try again later");
      alert(
        "If you try running this app but get an error, it is likely due my free tier being exhausted. Please try again later."
      );
    }
  };
  return (
    <MainWrapper>
      <Heading />
      <TextArea textarea={textarea} setTextarea={setTextarea} />
      <Button
        text="Generate!"
        handleClick={handleClick}
        disabled={buttonDisabled}
      />
      <p>
        If this is not working for whatever reason, feel free to check out a
        working demo{" "}
        <a
          href="https://github.com/SavarJ/TLDR-Generator"
          className="cursor-pointer underline"
        >
          here!
        </a>
      </p>
      <hr />
      <Results array={answers} />
      <Footer />
    </MainWrapper>
  );
};

export default App;
