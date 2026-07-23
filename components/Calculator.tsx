"use client";

import { useCallback, useEffect, useState } from "react";
import {
  backspace,
  calculate,
  clearAll,
  initialCalculatorState,
  inputDigit,
  inputOperator,
  inputPercent,
  toggleSign,
  type CalculatorState,
  type Operator,
} from "@/lib/calculator";

const BUTTONS: { label: string; type: "digit" | "operator" | "action"; value?: string }[] = [
  { label: "C", type: "action", value: "clear" },
  { label: "±", type: "action", value: "sign" },
  { label: "%", type: "action", value: "percent" },
  { label: "÷", type: "operator", value: "÷" },
  { label: "7", type: "digit", value: "7" },
  { label: "8", type: "digit", value: "8" },
  { label: "9", type: "digit", value: "9" },
  { label: "×", type: "operator", value: "×" },
  { label: "4", type: "digit", value: "4" },
  { label: "5", type: "digit", value: "5" },
  { label: "6", type: "digit", value: "6" },
  { label: "-", type: "operator", value: "-" },
  { label: "1", type: "digit", value: "1" },
  { label: "2", type: "digit", value: "2" },
  { label: "3", type: "digit", value: "3" },
  { label: "+", type: "operator", value: "+" },
  { label: "0", type: "digit", value: "0" },
  { label: ".", type: "digit", value: "." },
  { label: "⌫", type: "action", value: "backspace" },
  { label: "=", type: "action", value: "equals" },
];

function getButtonClass(type: string, label: string): string {
  if (type === "operator") return "calc-btn calc-btn-operator";
  if (label === "=") return "calc-btn calc-btn-equals";
  if (type === "action") return "calc-btn calc-btn-action";
  return "calc-btn calc-btn-digit";
}

export default function Calculator() {
  const [state, setState] = useState<CalculatorState>(initialCalculatorState);

  const handleButton = useCallback((type: string, value?: string) => {
    setState((current) => {
      if (type === "digit" && value) return inputDigit(current, value);
      if (type === "operator" && value) return inputOperator(current, value as Operator);
      if (value === "clear") return clearAll();
      if (value === "sign") return toggleSign(current);
      if (value === "percent") return inputPercent(current);
      if (value === "backspace") return backspace(current);
      if (value === "equals") return calculate(current);
      return current;
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      if (/^\d$/.test(key)) {
        event.preventDefault();
        handleButton("digit", key);
        return;
      }

      if (key === ".") {
        event.preventDefault();
        handleButton("digit", ".");
        return;
      }

      if (key === "+" || key === "-") {
        event.preventDefault();
        handleButton("operator", key);
        return;
      }

      if (key === "*") {
        event.preventDefault();
        handleButton("operator", "×");
        return;
      }

      if (key === "/") {
        event.preventDefault();
        handleButton("operator", "÷");
        return;
      }

      if (key === "Enter" || key === "=") {
        event.preventDefault();
        handleButton("action", "equals");
        return;
      }

      if (key === "Escape" || key.toLowerCase() === "c") {
        event.preventDefault();
        handleButton("action", "clear");
        return;
      }

      if (key === "Backspace") {
        event.preventDefault();
        handleButton("action", "backspace");
        return;
      }

      if (key === "%") {
        event.preventDefault();
        handleButton("action", "percent");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleButton]);

  const expression =
    state.operator && state.previousValue !== null
      ? `${state.previousValue} ${state.operator}`
      : "";

  return (
    <section className="calculator-section">
      <div className="container">
        <div className="calculator">
          <div className="calc-display" aria-live="polite" aria-label="Calculator display">
            {expression && <p className="calc-expression">{expression}</p>}
            <p className={`calc-value${state.display === "Error" ? " calc-error" : ""}`}>
              {state.display}
            </p>
          </div>

          <div className="calc-keypad" role="group" aria-label="Calculator keypad">
            {BUTTONS.map(({ label, type, value }) => (
              <button
                key={label}
                type="button"
                className={getButtonClass(type, label)}
                onClick={() => handleButton(type, value ?? label)}
                aria-label={label === "⌫" ? "Backspace" : label}
              >
                {label}
              </button>
            ))}
          </div>

          <p className="calc-hint">Tip: use your keyboard — numbers, operators, Enter, Escape, and Backspace.</p>
        </div>
      </div>
    </section>
  );
}
