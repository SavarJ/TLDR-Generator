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
      setTextarea("");
    } catch (e) {
      console.error(e);
      alert("An error occurred, please try again later");
    }
  };
  return (
    <div className="flex justify-center p-8 font-mono text-white from-blue-900 to-purple-900 bg-gradient-to-b w-full min-h-screen">
      <div className="flex flex-col space-y-8 max-w-2xl">
        <h1 className="text-center font-bold text-4xl tracking-tight">
          TL;DR Generator
        </h1>
        <textarea
          className="w-full h-64 p-4 bg-gray-800 text-white font-mono"
          id=""
          rows={25}
          cols={50}
          placeholder="Enter paragraph you want to summarize here..."
          onChange={(e) => setTextarea(e.target.value)}
          value={textarea}
        ></textarea>
        <button
          type="submit"
          // make the button a cool dark gradient with a nice hover and button should be small
          className="w-full h-12 bg-gradient-to-b from-orange-600 to-yellow-600 hover:bg-gradient-to-b-dark text-white font-bold py-2 px-4 rounded-full"
          onClick={handleClick}
        >
          Generate!
        </button>
        <hr />
        {/* Make a card of answers */}
        {/* make a border */}
        <div className="border-2 p-4 border-white rounded-md shadow-lg hover:shadow-xl shadow-white hover:shadow-white">
          <h2 className="text-center font-bold text-2xl tracking-tight">
            Answer
          </h2>
          <p className="text-center font-mono text-xl tracking-tight">
            {answer}
          </p>
        </div>
        <p className="text-center font-light text-sm">
          Made by{" "}
          <a
            className="hover:underline transition-all duration-500"
            href="http://jainsavar.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Savar Jain
          </a>
        </p>
      </div>
    </div>
  );
};

export default App;
