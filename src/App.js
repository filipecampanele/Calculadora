import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [firstValue, setFirstValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  function inputNumber(number) {
    if (waitingForSecondValue) {
      setDisplay(number);
      setWaitingForSecondValue(false);
      return;
    }

    setDisplay(display === "0" ? number : display + number);
  }

  function inputDecimal() {
    if (waitingForSecondValue) {
      setDisplay("0.");
      setWaitingForSecondValue(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }

  function clearCalculator() {
    setDisplay("0");
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(false);
  }

  function deleteNumber() {
    if (display.length === 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  }

  function calculate(first, second, operation) {
    switch (operation) {
      case "+":
        return first + second;

      case "-":
        return first - second;

      case "×":
        return first * second;

      case "÷":
        return second === 0 ? "Erro" : first / second;

      default:
        return second;
    }
  }

  function handleOperator(nextOperator) {
    const inputValue = parseFloat(display);

    if (operator && waitingForSecondValue) {
      setOperator(nextOperator);
      return;
    }

    if (firstValue === null) {
      setFirstValue(inputValue);
    } else if (operator) {
      const result = calculate(firstValue, inputValue, operator);

      setDisplay(String(result));
      setFirstValue(result);
    }

    setWaitingForSecondValue(true);
    setOperator(nextOperator);
  }

  function handleEqual() {
    if (operator === null || firstValue === null) {
      return;
    }

    const secondValue = parseFloat(display);
    const result = calculate(firstValue, secondValue, operator);

    setDisplay(String(result));
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(true);
  }

  function toggleSign() {
    if (display === "0") return;

    setDisplay(
      display.startsWith("-")
        ? display.slice(1)
        : "-" + display
    );
  }

  return (
    <main className="calculator-container">
      <div className="calculator">

        <div className="display">
          {display}
        </div>

        <div className="buttons">

          <button
            className="function"
            onClick={clearCalculator}
          >
            AC
          </button>

          <button
            className="function"
            onClick={deleteNumber}
          >
            DEL
          </button>

          <button
            className="function"
            onClick={toggleSign}
          >
            +/-
          </button>

          <button
            className="operator"
            onClick={() => handleOperator("÷")}
          >
            ÷
          </button>


          <button onClick={() => inputNumber("7")}>
            7
          </button>

          <button onClick={() => inputNumber("8")}>
            8
          </button>

          <button onClick={() => inputNumber("9")}>
            9
          </button>

          <button
            className="operator"
            onClick={() => handleOperator("×")}
          >
            ×
          </button>


          <button onClick={() => inputNumber("4")}>
            4
          </button>

          <button onClick={() => inputNumber("5")}>
            5
          </button>

          <button onClick={() => inputNumber("6")}>
            6
          </button>

          <button
            className="operator"
            onClick={() => handleOperator("-")}
          >
            −
          </button>


          <button onClick={() => inputNumber("1")}>
            1
          </button>

          <button onClick={() => inputNumber("2")}>
            2
          </button>

          <button onClick={() => inputNumber("3")}>
            3
          </button>

          <button
            className="operator"
            onClick={() => handleOperator("+")}
          >
            +
          </button>


          <button
            className="zero"
            onClick={() => inputNumber("0")}
          >
            0
          </button>

          <button onClick={inputDecimal}>
            .
          </button>

          <button
            className="equals"
            onClick={handleEqual}
          >
            =
          </button>

        </div>
      </div>
    </main>
  );
}

export default App;
