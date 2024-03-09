import { BasicProps, Operator } from "."
import {
    callBasics
} from "./operators"

const dataSet = [
    // 4 The Real Number
    {
        numericResult: 4,
        formulaString: '4',
        structuralResult: ['4']
    },
    // 4 Factorial
    {
        numericResult: 24,
        formulaString: '4!',
        structuralResult: ['4!']
    },
    // Square root of 4
    {
        numericResult: 2,
        formulaString: '√4',
        structuralResult: ['√4']
    },
    // Decimal 4
    {
        numericResult: 0.4,
        formulaString: '.4',
        structuralResult: ['.4']
    }
]
const dataSet2 = [
    {
        numericResult: 44,
        formulaString: '44',
        structuralResult: ['44']
    },
    {
        numericResult: 4.4,
        formulaString: '4.4',
        structuralResult: ['4.4']
    }
]
let results: Array<BasicProps> = []

const firstCall = (ops: Array<Operator>, data1: Array<BasicProps>, data2: Array<BasicProps>) => {
    let newSet = []
    for (let i = 0; i < ops.length; ++i)
        for(let j = 0; j < data1.length; ++j)
            for(let k = 0; k < data2.length; ++k)
                newSet.push(callBasics(ops[i], data1[j], data2[k]))
    return newSet
}

// ((x, x), x)
const leftToRight = (ops: Array<Operator>, data1: Array<BasicProps>, data2: Array<BasicProps>) => {
    let left = firstCall(ops, data1, data2)
    for (let i = 0; i < ops.length; ++i)
        for (let j = 0; j < left.length; ++j)
            for (let k = 0; k < data2.length; ++k)
                results.push(callBasics(ops[i], left[j], data2[k]))
}
// (x, (x, x))
const rightToLeft = (ops: Array<Operator>, data1: Array<BasicProps>, data2: Array<BasicProps>) => {
    let right = firstCall(ops, data1, data2)
    for (let i = 0; i < ops.length; ++i)
        for (let j = 0; j < data2.length; ++j)
            for (let k = 0; k < right.length; ++k)
                results.push(callBasics(ops[i], data2[j], right[k]))
}

const getBrain = () => {
    results = []
    let methods: Array<Operator> = ['add', 'sub', 'mul', 'div']
    // return firstCall(methods, dataSet2, dataSet)
    leftToRight(methods, dataSet2, dataSet)
    rightToLeft(methods, dataSet2, dataSet)
    return results
}

export default getBrain