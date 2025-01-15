import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
      setOutput("");
    } else if (value === "=") {
      try {
        if (input.trim() === "") {
          setOutput("Error");
        } else {
          // Avoid unsafe use of eval in production
          const result = Function(`"use strict"; return (${input})`)();
          setOutput(result.toString());
        }
      } catch (error) {
        setOutput("Error");
      }
    } else {
      const lastChar = input.slice(-1);
      if (
        ["+", "-", "*", "/"].includes(value) &&
        ["+", "-", "*", "/"].includes(lastChar)
      ) {
        // Prevent consecutive operators
        setInput(input.slice(0, -1) + value);
      } else {
        setInput((prev) => prev + value);
        setOutput(""); // Clear output for intermediate input
      }
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="input-display">Input: {input || "0"}</div>
        <div className="output-display">Output: {output || "0"}</div>
      </div>
      <div className="buttons">
        {[
          "7",
          "8",
          "9",
          "+",
          "4",
          "5",
          "6",
          "-",
          "1",
          "2",
          "3",
          "*",
          "C",
          "0",
          "=",
          "/",
        ].map((button) => (
          <button
            key={button}
            onClick={() => handleClick(button)}
            className={`btn ${button === "C" ? "btn-clear" : ""}`}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
