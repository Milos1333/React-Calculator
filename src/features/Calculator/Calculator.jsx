import { useState } from "react";
import "./calculator.style.css";

const Calculator = () => {
  const [inputValue, setInputValue] = useState("");

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
    "C",
    "=",
    "+",
  ];

  const handleDelete = () => {
    setInputValue("");
  };

  const handleCalculate = () => {
    try {
      const result = eval(inputValue);
      setInputValue(String(result));
    } catch {
      setInputValue("Error");
    }
  };

  return (
    <div className="calculator-main-container">
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
                if (btn === "C") {
                  handleDelete();
                } else if (btn === "=") {
                  handleCalculate();
                } else {
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
