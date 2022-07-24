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
let results = []

const recursiveCall = (set, prevValue, n, k, call) => {
    if (k === 1) {
        // result
        results.push(prevValue)
        return;
    }
    
    for (let i = 0; i < n; ++i) {
        // Ascending
        const result = call(prevValue, set[i])
        recursiveCall(set, result, n, k - 1, call)
    }
}

const firstCall = (set, data) => {
    let newSet = []
    for (let i = 0; i < set.length; ++i)
        for(let j = 0; j < data.length; ++j)
            for(let k = 0; k < data.length; ++k)
                newSet.push(callBasics(set[i], data[j], data[k]))
    return newSet
}

// (((x, x), x), x)
const recursiveCallAsc = (set, data) => {
    let left = firstCall(set, data)
    let middleLeft = []
    for (let i = 0; i < set.length; ++i)
        for (let j = 0; j < left.length; ++j)
            for (let k = 0; k < data.length; ++k)
                middleLeft.push(callBasics(set[i], left[j], data[k]))
    
    for (let i = 0; i < set.length; ++i) {
        for (let j = 0; j < middleLeft.length; ++j)
            for (let k = 0; k < data.length; ++k)
                results.push(callBasics(set[i], middleLeft[j], data[k]))
    }
}
// (x, (x, (x, x)))
const recursiveCallDesc = (set, data) => {
    let right = firstCall(set, data)
    let middleRight = []
    for (let i = 0; i < set.length; ++i)
        for (let j = 0; j < right.length; ++j)
            for (let k = 0; k < data.length; ++k)
                middleRight.push(callBasics(set[i], data[k], right[j]))
    for (let i = 0; i < set.length; ++i)
        for (let j = 0; j < middleRight.length; ++j)
            for (let k = 0; k < data.length; ++k)
                results.push(callBasics(set[i], data[k], middleRight[j]))
}
// ((x, x), (x, x))
// THIS HAS NEEDS TO BE MODIFIED WITH THE NEW APPROACH
const edgeToMiddle = (set, data) => {
    let edge = firstCall(set, data)
    for (let i = 0; i < edge.length; ++i)
        for (let j = 0; j < set.length; ++j)
            recursiveCall(edge, edge[i], edge.length, 2, (value1, value2) => {
                return callBasics(set[j], value1, value2)
            })
}
// (x, ((x, x), x))
const middleToRightToLeft = (set, data, k) => {
    let middle = firstCall(set, data)
    let right = []
    for (let i = 0; i < set.length; ++i)
        for (let j = 0; j < middle.length; ++j)
            for (let k = 0; k < data.length; ++k)
                right.push(callBasics(set[i], middle[j], data[k]))
    for (let i = 0; i < set.length; ++i)
        for (let j = 0; j < right.length; ++j)
            for (let k = 0; k < data.length; ++k)
                results.push(callBasics(set[i], data[k], right[j]))
}
// ((x, (x, x)), x)
const middleToLeftToRight = (set, data, k) => {
    let middle = firstCall(set, data)
    let left = []
    for (let i = 0; i < set.length; ++i)
        for (let j = 0; j < middle.length; ++j)
            for (let k = 0; k < data.length; ++k)
                left.push(callBasics(set[i], data[k], middle[j]))
    for (let i = 0; i < set.length; ++i)
        for (let j = 0; j < left.length; ++j)
            for (let k = 0; k < data.length; ++k)
                results.push(callBasics(set[i], left[j], data[k]))
}

const getBrain = () => {
    results = []
    let methods = ['add', 'sub', 'mul', 'div']
    recursiveCallAsc(methods, dataSet)
    recursiveCallDesc(methods, dataSet)
    edgeToMiddle(methods, dataSet)
    middleToRightToLeft(methods, dataSet)
    middleToLeftToRight(methods, dataSet)
    return results
}
  
export default getBrain