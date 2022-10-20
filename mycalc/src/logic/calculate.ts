export type Operator = "+" | "-";
export type NumberCode =
  "0" |
  "1" |
  "2" |
  "3" |
  "4" |
  "5" |
  "6" |
  "7" |
  "8" |
  "9";
export type ButtonCode = NumberCode | Operator | "." | "D" | "AC" | "=";

export function calculate(button: ButtonCode, state: State): State {

  switch(button) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      return handleNumberButton(button, state);
      break;

    case "+":
    case "-":
      return handleOperatorButton(button, state);
      break;

    case ".":
      return handleDotButton(state);
      break;

    case "D":
      return handleDeleteButton(state);
      break;

    case "AC":
      return handleAllClearButton();
      break;

    case "=":
      return handleEqualButton(state);
      break;
  }



  return state;
}

export interface State {
  current: string;
  operand: number;
  operator: string | null;
  isNextClear: boolean;
}


function handleNumberButton(button: NumberCode, state: State): State {
  if(state.isNextClear) {
    return {
      current: button,
      operand: state.operand,
      operator: state.operator,
      isNextClear: false,
    }
  }
  if(state.current === "0") {
    return {
      current: button,
      operand: state.operand,
      operator: state.operator,
      isNextClear: false,
    }
  }
  return {
    current: state.current + button,
    operand: state.operand,
    operator: state.operator,
    isNextClear: state.isNextClear,
  }
}

function handleOperatorButton(button: Operator, state: State): State {
  if(state.operator === null) {
    return {
      current: state.current,
      operand: parseFloat(state.current),
      operator: button,
      isNextClear : true,
    }
  }
  const nextValue = operate(state);
  return {
    current: `${nextValue}`,
    operand: nextValue,
    operator: button,
    isNextClear: true,
  }
}

function handleDotButton(state: State): State {
  if(state.current.indexOf('.') !== -1) {
    return state;
  }
  return {
    current: state.current + ".",
    operand: state.operand,
    operator: state.operator,
    isNextClear: false,
  }
}

function handleDeleteButton(state: State): State {
  if(state.current.length === 1) {
    return {
      current: "0",
      operand: state.operand,
      operator: state.operator,
      isNextClear: false,
    }
  }
  return {
    current: state.current.substring(0, state.current.length - 1),
    operand: state.operand,
    operator: state.operator,
    isNextClear: false,
  }
}

function handleAllClearButton(): State {
  return {
    current: "0",
    operand: 0,
    operator: null,
    isNextClear: false
  }
}

function handleEqualButton(state: State): State {
  if(state.operator === null) {
    return state;
  }
  const nextValue = operate(state);
  return {
    current: `${nextValue}`,
    operand: 0,
    operator: null,
    isNextClear: true,
  }
}



function operate(state: State): number {
  const current = parseFloat(state.current);
  if(state.operator === "+") {
    return state.operand + current;
  } else if(state.operator === "-") {
    return state.operand - current;
  }
  return current;

}

