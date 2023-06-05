import { OperatorCase, DecimalCase } from "."

export const OPERATORS: Array<OperatorCase> = [
  {
    label: "+",
    value: "add",
    enabled: true
  },
  {
    label: "-",
    value: "sub",
    enabled: true
  },
  {
    label: "x",
    value: "mul",
    enabled: true
  },
  {
    label: "/",
    value: "div",
    enabled: true
  },
  {
    label: "√",
    value: "sqrt",
    enabled: true
  },
  {
    label: ".",
    value: "dec",
    enabled: true
  },
  {
    label: "!",
    value: "fact",
    enabled: true
  }
]

export const DECIMALS: Array<DecimalCase> = [
  {
    label: "",
    value: "##",
    enabled: true
  },
  {
    label: "",
    value: "#.#",
    enabled: true
  }
]