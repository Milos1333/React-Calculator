import { useState, useEffect } from "react";
import "./calculator.style.css";

const Calculator = () => {
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState([]);

  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
    "C",
    "CC",
  ];
  const operators = ["+", "-", "*", "/"];
  const lastChar = inputValue.slice(-1);

  const handleDelete = () => setInputValue("");

  const handleCalculate = () => {
    try {
      if (operators.includes(lastChar) || inputValue === "" || lastChar === ".")
        return;
      const result = eval(inputValue);
      const rounded = Number(result.toFixed(5));
      setInputValue(String(rounded));
      setHistory((prev) => [...prev, `${inputValue}=${rounded}`]);
    } catch {
      setInputValue("Error");
    }
  };

  const handleBackspace = () => setInputValue((prev) => prev.slice(0, -1));

  const canAddDot = () => {
    const parts = inputValue.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];

    if (lastPart.includes(".")) return;

    if (inputValue === "" || operators.includes(lastChar)) {
      return;
    } else {
      setInputValue((prev) => prev + ".");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (!isNaN(key) || operators.includes(key)) {
        if (
          operators.includes(key) &&
          (operators.includes(lastChar) ||
            (inputValue === "" && key !== "-") ||
            lastChar === ".")
        ) {
          return;
        }
        setInputValue((prev) => prev + key);
      } else if (key === "Enter") {
        handleCalculate();
      } else if (key === "Escape") {
        handleDelete();
      } else if (key === "Backspace") {
        handleBackspace();
      } else if (key === ".") {
        canAddDot();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputValue]);

  return (
    <div className="calculator-main-container">
      {history.length > 0 && (
        <div className="calc-history">
          <h4>History</h4>
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <h2>React Calculator</h2>
      <h5>Don't divide by zero</h5>

      <div className="calculator-container">
        <input value={inputValue} readOnly />

        <div className="calc-buttons">
          {buttons.map((btn) => (
            <button
              key={btn}
              className="calc-btn"
              onClick={() => {
                if (btn === "CC") {
                  handleDelete();
                } else if (btn === "=") {
                  handleCalculate();
                } else if (btn === "C") {
                  handleBackspace();
                } else if (btn === ".") {
                  canAddDot();
                } else {
                  if (
                    operators.includes(btn) &&
                    ((inputValue === "" && btn !== "-") ||
                      operators.includes(lastChar) ||
                      lastChar === ".")
                  ) {
                    return;
                  }
                  setInputValue((prev) => prev + btn);
                }
              }}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
