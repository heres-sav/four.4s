import {
    callBasics,
    callBasicsAsc,
    callBasicsDesc
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
const combinationCallOf3 = (set, left, right, push) => {
    let newSet = []
    for (let i = 0; i < set.length; ++i)
        for (let j = 0; j < left.length; ++j)
            for (let k = 0; k < right.length; ++k) {
                if(!push) newSet.push(callBasics(set[i], left[j], right[k]))
                else push(callBasics(set[i], left[j], right[k]))
            }
    if(!push)
        return newSet
}
const combinationCallOf2 = (set, left, right) => {
    let newSet = []
    for (let i = 0; i < set.length; ++i)
        for (let j = 0; j < left.length; ++j)
            for (let k = 0; k < right.length; ++k)
                newSet.push(callBasics(set[i], left[j], right[k]))
    return newSet
}

// (((x, x), x), x)
const recursiveCallAsc = (set, data) => {
    let left = firstCall(set, data)
    let middleLeft = combinationCallOf3(set, left, data)
    combinationCallOf3(set, middleLeft, data, (value) => results.push(value))
}
// (x, (x, (x, x)))
const recursiveCallDesc = (set, data) => {
    let right = firstCall(set, data)
    let middleRight = combinationCallOf3(set, data, right)
    combinationCallOf3(set, data, middleRight, (value) => results.push(value))
}
// (x, ((x, x), x))
const middleToRightToLeft = (set, data) => {
    let middle = firstCall(set, data)
    let right = combinationCallOf3(set, data, middle)
    combinationCallOf3(set, data, right, (value) => results.push(value))
}
// ((x, (x, x)), x)
const middleToLeftToRight = (set, data) => {
    let middle = firstCall(set, data)
    let left = combinationCallOf3(set, data, middle)
    combinationCallOf3(set, left, data, (value) => results.push(value))
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