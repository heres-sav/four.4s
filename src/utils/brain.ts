import { BasicProps, DecimalCase, Operator, OperatorCase } from "."
import {
    callBasics,
    factorial
} from "./operators"

let results: Array<BasicProps> = []

const firstCall = (ops: Array<Operator>, data1: Array<BasicProps>, data2: Array<BasicProps>) => {
    let newSet = []
    for (let i = 0; i < ops.length; ++i)
        for(let j = 0; j < data1.length; ++j)
            for(let k = 0; k < data2.length; ++k)
                newSet.push(callBasics(ops[i], data1[j], data2[k]))
    return newSet
}

// (((x, x), x), x)
const leftToRight = (ops: Array<Operator>, data: Array<BasicProps>) => {
    let left = firstCall(ops, data, data)
    let middleLeft = []
    for (let i = 0; i < ops.length; ++i)
        for (let j = 0; j < left.length; ++j)
            for (let k = 0; k < data.length; ++k)
                middleLeft.push(callBasics(ops[i], left[j], data[k]))
    for (let i = 0; i < ops.length; ++i) {
        for (let j = 0; j < middleLeft.length; ++j)
            for (let k = 0; k < data.length; ++k)
                results.push(callBasics(ops[i], middleLeft[j], data[k]))
    }
}
// (x, (x, (x, x)))
const rightToLeft = (ops: Array<Operator>, data: Array<BasicProps>) => {
    let right = firstCall(ops, data, data)
    let middleRight = []
    for (let i = 0; i < ops.length; ++i)
        for (let j = 0; j < right.length; ++j)
            for (let k = 0; k < data.length; ++k)
                middleRight.push(callBasics(ops[i], data[k], right[j]))
    for (let i = 0; i < ops.length; ++i)
        for (let j = 0; j < middleRight.length; ++j)
            for (let k = 0; k < data.length; ++k)
                results.push(callBasics(ops[i], data[k], middleRight[j]))
}
// ((x, x), (x, x))
const edgeToMiddle = (ops: Array<Operator>, data: Array<BasicProps>) => {
    let edge = firstCall(ops, data, data)
    for (let i = 0; i < ops.length; ++i)
        for (let j = 0; j < edge.length; ++j)
            for (let k = 0; k < edge.length; ++k)
                results.push(callBasics(ops[i], edge[j], edge[k]))
}
// (x, ((x, x), x))
const middleToRightToLeft = (ops: Array<Operator>, data: Array<BasicProps>) => {
    let middle = firstCall(ops, data, data)
    let right = []
    for (let i = 0; i < ops.length; ++i)
        for (let j = 0; j < middle.length; ++j)
            for (let k = 0; k < data.length; ++k)
                right.push(callBasics(ops[i], middle[j], data[k]))
    for (let i = 0; i < ops.length; ++i)
        for (let j = 0; j < right.length; ++j)
            for (let k = 0; k < data.length; ++k)
                results.push(callBasics(ops[i], data[k], right[j]))
}
// ((x, (x, x)), x)
const middleToLeftToRight = (ops: Array<Operator>, data: Array<BasicProps>) => {
    let middle = firstCall(ops, data, data)
    let left = []
    for (let i = 0; i < ops.length; ++i)
        for (let j = 0; j < middle.length; ++j)
            for (let k = 0; k < data.length; ++k)
                left.push(callBasics(ops[i], data[k], middle[j]))
    for (let i = 0; i < ops.length; ++i)
        for (let j = 0; j < left.length; ++j)
            for (let k = 0; k < data.length; ++k)
                results.push(callBasics(ops[i], left[j], data[k]))
}

// ((x, x), x)
const leftToRight2 = (ops: Array<Operator>, data1: Array<BasicProps>, data2: Array<BasicProps>) => {
    let left = firstCall(ops, data1, data2)
    for (let i = 0; i < ops.length; ++i)
        for (let j = 0; j < left.length; ++j)
            for (let k = 0; k < data2.length; ++k)
                results.push(callBasics(ops[i], left[j], data2[k]))
}
// (x, (x, x))
const rightToLeft2 = (ops: Array<Operator>, data1: Array<BasicProps>, data2: Array<BasicProps>) => {
    let right = firstCall(ops, data1, data2)
    for (let i = 0; i < ops.length; ++i)
        for (let j = 0; j < data2.length; ++j)
            for (let k = 0; k < right.length; ++k)
                results.push(callBasics(ops[i], data2[j], right[k]))
}

const getBrain = (operators: Array<OperatorCase | DecimalCase>, main = 4) => {
    results = []
    let ops: Array<Operator> = []
    const dataSet: Array<BasicProps> = [
        // 4 The Real Number
        {
            numericResult: main,
            formulaString: `${main}`,
            structuralResult: [`${main}`]
        },
    ]
    // Now also adding concatenation
    const dataSet2: Array<BasicProps> = []
    operators.forEach((op: OperatorCase | DecimalCase) => {
        if(!op.enabled) return
        switch (op.value) {
            case 'add':
                ops.push(op.value)
                return
            case 'sub':
                ops.push(op.value)
                return
            case 'mul':
                ops.push(op.value)
                return
            case 'div':
                ops.push(op.value)
                return
            case 'sqrt':
                dataSet.push(
                    // Square root of 4
                    {
                        numericResult: Math.sqrt(main),
                        formulaString: `√${main}`,
                        structuralResult: [`√${main}`]
                    }
                )
                return
            case 'dec':
                dataSet.push(
                    // Decimal 4
                    {
                        numericResult: main/10,
                        formulaString: `.${main}`,
                        structuralResult: [`.${main}`]
                    }
                )
                return
            case 'fact':
                dataSet.push(
                    // 4 Factorial
                    {
                        numericResult: factorial(main),
                        formulaString: `${main}!`,
                        structuralResult: [`${main}!`]
                    }
                )
                return
            case '##':
                dataSet2.push(
                    {
                        numericResult: main*10 + main,
                        formulaString: `${main}${main}`,
                        structuralResult: [`${main}${main}`]
                    }
                )
                return
            case '#.#':
                dataSet2.push(
                    {
                        numericResult: main + main/10,
                        formulaString: `${main}.${main}`,
                        structuralResult: [`${main}.${main}`]
                    }
                )
                return
        }
    });
    leftToRight(ops, dataSet)
    rightToLeft(ops, dataSet)
    edgeToMiddle(ops, dataSet)
    middleToRightToLeft(ops, dataSet)
    middleToLeftToRight(ops, dataSet)

    leftToRight2(ops, dataSet2, dataSet)
    rightToLeft2(ops, dataSet2, dataSet)

    return results
}

export default getBrain