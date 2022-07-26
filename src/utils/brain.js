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

const firstCall = (set, data1, data2) => {
    let newSet = []
    for (let i = 0; i < set.length; ++i)
        for(let j = 0; j < data1.length; ++j)
            for(let k = 0; k < data2.length; ++k)
                newSet.push(callBasics(set[i], data1[j], data2[k]))
    return newSet
}

// (((x, x), x), x)
const leftToRight = (set, data) => {
    let left = firstCall(set, data, data)
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
const rightToLeft = (set, data) => {
    let right = firstCall(set, data, data)
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
const edgeToMiddle = (set, data) => {
    let edge = firstCall(set, data, data)
    for (let i = 0; i < set.length; ++i)
        for (let j = 0; j < edge.length; ++j)
            for (let k = 0; k < edge.length; ++k)
                results.push(callBasics(set[i], edge[j], edge[k]))
}
// (x, ((x, x), x))
const middleToRightToLeft = (set, data, k) => {
    let middle = firstCall(set, data, data)
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
    let middle = firstCall(set, data, data)
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

// Now also adding concatenation
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

// ((x, x), x)
const leftToRight2 = (set, data1, data2) => {
    let left = firstCall(set, data1, data2)
    for (let i = 0; i < set.length; ++i)
        for (let j = 0; j < left.length; ++j)
            for (let k = 0; k < data2.length; ++k)
                results.push(callBasics(set[i], left[j], data2[k]))
}
// (x, (x, x))
const rightToLeft2 = (set, data1, data2) => {
    let right = firstCall(set, data1, data2)
    for (let i = 0; i < set.length; ++i)
        for (let j = 0; j < data2.length; ++j)
            for (let k = 0; k < right.length; ++k)
                results.push(callBasics(set[i], data2[j], right[k]))
}

const getBrain = () => {
    results = []
    let methods = ['add', 'sub', 'mul', 'div']
    leftToRight(methods, dataSet)
    rightToLeft(methods, dataSet)
    edgeToMiddle(methods, dataSet)
    middleToRightToLeft(methods, dataSet)
    middleToLeftToRight(methods, dataSet)

    leftToRight2(methods, dataSet2, dataSet)
    rightToLeft2(methods, dataSet2, dataSet)

    return results
}

export default getBrain