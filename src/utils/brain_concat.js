import {
    callBasics
} from "./operators.ts"

const dataSet = [
    // 4 The Real Number
    {
        numericResult: 4,
        formulaString: '4'
    },
    // 4 Factorial
    {
        numericResult: 24,
        formulaString: '4!'
    },
    // Square root of 4
    {
        numericResult: 2,
        formulaString: '√4'
    },
    // Decimal 4
    {
        numericResult: 0.4,
        formulaString: '.4'
    }
]
const dataSet2 = [
    {
        numericResult: 44,
        formulaString: '44'
    },
    {
        numericResult: 4.4,
        formulaString: '4.4'
    }
]
let results = []

const firstCall = (set, data1, data2) => {
    let newSet = []
    for (let i = 0; i < set.length; ++i)
        for(let j = 0; j < data1.length; ++j)
            for(let k = 0; k < data2.length; ++k)
                newSet.push(callBasics(set[i], data1[j], data2[k]))
    return newSet
}

// ((x, x), x)
const leftToRight = (set, data1, data2) => {
    let left = firstCall(set, data1, data2)
    for (let i = 0; i < set.length; ++i)
        for (let j = 0; j < left.length; ++j)
            for (let k = 0; k < data2.length; ++k)
                results.push(callBasics(set[i], left[j], data2[k]))
}
// (x, (x, x))
const rightToLeft = (set, data1, data2) => {
    let right = firstCall(set, data1, data2)
    for (let i = 0; i < set.length; ++i)
        for (let j = 0; j < data2.length; ++j)
            for (let k = 0; k < right.length; ++k)
                results.push(callBasics(set[i], data2[j], right[k]))
}

const getBrain = () => {
    results = []
    let methods = ['add', 'sub', 'mul', 'div']
    // return firstCall(methods, dataSet2, dataSet)
    leftToRight(methods, dataSet2, dataSet)
    rightToLeft(methods, dataSet2, dataSet)
    return results
}

export default getBrain