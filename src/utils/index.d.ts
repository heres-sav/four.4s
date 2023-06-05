export type Operator = 'add' | 'sub' | 'mul' | 'div'
export type AllOperatorLabel = '+' | '-' | 'x' | '/' | '√' | '.' | '!'
export type AllOperator = 'add' | 'sub' | 'mul' | 'div' | 'sqrt' | 'dec' | 'fact'

export interface DecimalCase {
  label: string
  value: string
  enabled?: boolean
}

export interface OperatorCase {
  label: AllOperatorLabel
  value: AllOperator
  enabled?: boolean
}

export interface BasicProps {
  numericResult: number
  formulaString: string
}