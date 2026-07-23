export type Operator = "+" | "-" | "×" | "÷";

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operator: Operator | null;
  waitingForOperand: boolean;
}

export const initialCalculatorState: CalculatorState = {
  display: "0",
  previousValue: null,
  operator: null,
  waitingForOperand: false,
};

export function formatDisplay(value: number): string {
  if (!Number.isFinite(value)) return "Error";

  const rounded = Math.round((value + Number.EPSILON) * 1e10) / 1e10;
  const text = String(rounded);

  if (text.length <= 12) return text;
  return rounded.toExponential(6);
}

function compute(a: number, b: number, operator: Operator): number {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      if (b === 0) return NaN;
      return a / b;
  }
}

export function inputDigit(state: CalculatorState, digit: string): CalculatorState {
  if (state.display === "Error") {
    return { ...initialCalculatorState, display: digit };
  }

  if (state.waitingForOperand) {
    return {
      ...state,
      display: digit,
      waitingForOperand: false,
    };
  }

  if (state.display === "0" && digit !== ".") {
    return { ...state, display: digit };
  }

  if (digit === "." && state.display.includes(".")) {
    return state;
  }

  if (state.display.replace(".", "").length >= 12) {
    return state;
  }

  return { ...state, display: state.display + digit };
}

export function inputOperator(state: CalculatorState, nextOperator: Operator): CalculatorState {
  if (state.display === "Error") {
    return { ...initialCalculatorState, operator: nextOperator, waitingForOperand: true };
  }

  const currentValue = Number.parseFloat(state.display);

  if (state.previousValue === null) {
    return {
      ...state,
      previousValue: currentValue,
      operator: nextOperator,
      waitingForOperand: true,
    };
  }

  if (state.operator && !state.waitingForOperand) {
    const result = compute(state.previousValue, currentValue, state.operator);
    return {
      display: formatDisplay(result),
      previousValue: Number.isFinite(result) ? result : null,
      operator: nextOperator,
      waitingForOperand: true,
    };
  }

  return {
    ...state,
    operator: nextOperator,
    waitingForOperand: true,
  };
}

export function calculate(state: CalculatorState): CalculatorState {
  if (state.display === "Error" || state.previousValue === null || !state.operator) {
    return state;
  }

  const currentValue = Number.parseFloat(state.display);
  const result = compute(state.previousValue, currentValue, state.operator);

  return {
    display: formatDisplay(result),
    previousValue: null,
    operator: null,
    waitingForOperand: true,
  };
}

export function clearAll(): CalculatorState {
  return { ...initialCalculatorState };
}

export function toggleSign(state: CalculatorState): CalculatorState {
  if (state.display === "Error" || state.display === "0") return state;

  return {
    ...state,
    display: state.display.startsWith("-")
      ? state.display.slice(1)
      : `-${state.display}`,
  };
}

export function inputPercent(state: CalculatorState): CalculatorState {
  if (state.display === "Error") return state;

  const value = Number.parseFloat(state.display) / 100;
  return {
    ...state,
    display: formatDisplay(value),
  };
}

export function backspace(state: CalculatorState): CalculatorState {
  if (state.display === "Error" || state.waitingForOperand) {
    return clearAll();
  }

  if (state.display.length <= 1 || (state.display.length === 2 && state.display.startsWith("-"))) {
    return { ...state, display: "0" };
  }

  return { ...state, display: state.display.slice(0, -1) };
}
