import React, { useState } from "react";

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
    } catch (e) {
      console.error(e);
      alert("An error occurred, please try again later");
    }
  };
  return (
    <div>
      <h1 className="text-blue-400">TL;DR Generator</h1>
      <textarea
        id=""
        rows={25}
        cols={25}
        onChange={(e) => setTextarea(e.target.value)}
      >
        {textarea}
      </textarea>
      <button type="submit" onClick={handleClick}>
        Generate!
      </button>
      <hr />
      <h2>{answer}</h2>
    </div>
  );
};

export default App;
