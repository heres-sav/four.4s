// Addition
const addItems = (item1 : [decimal], item2 : [decimal]) => {
    return ((item1 * 10) + (item2 * 10)) / 10
}
// Subtraction
const subtract = (item1 : [decimal], item2 : [decimal]) => {
    return ((item1 * 10) - (item2 * 10)) / 10
}
// Multiplication
const multiply = (item1 : [decimal], item2 : [decimal]) => {
    return (item1 * item2)
}
// Division
const divide = (item1 : [decimal], item2 : [decimal]) => {
    return ((item1 * 10) / (item2 * 10))
}
// Square root
const squareRoot = (item) => {
    return Math.sqrt(item)
}
// Factorial
const factorial = (item) => {
    let result = 1
    for(let iter = item; iter>1; iter--)
        result *= iter
    return result
}
// Set decimal, upto one decimal place
const setDecimal = (item) => {
    return item/10
}
// Concatenating, two items
const concatenate = (item1, item2) =>{
    return item1*10 + item2
}

export const callBasics = (what, value1, value2) => {
    // console.log(value1 + ' , ' + value2);
    switch (what) {
        case 'add':
            return {
                numericResult: Number(addItems(value1.numericResult, value2.numericResult)),
                formulaString: '(' + value1.formulaString + ' + ' + value2.formulaString + ')'
            }
        case 'sub':
            return {
                numericResult: Number(subtract(value1.numericResult, value2.numericResult)),
                formulaString: '(' + value1.formulaString + ' - ' + value2.formulaString + ')'
            }
        case 'mul':
            return {
                numericResult: Number(multiply(value1.numericResult, value2.numericResult)),
                formulaString: '(' + value1.formulaString + ' x ' + value2.formulaString + ')'
            }
        case 'div':
            return {
                numericResult: Number(divide(value1.numericResult, value2.numericResult)),
                formulaString: '(' + value1.formulaString + ' / ' + value2.formulaString + ')'
            }
        // case 'cnt':
        //     return {
        //         numericResult: concatenate(value1.numericResult, value2.numericResult),
        //         formulaString: '(' + value1 + '' + value2 + ')'
        //     }
        default:
            return
    }
}

export const callBasicsAsc = (what, prefix, value1, value2) => {
    switch (what) {
        case 'add':
            return {
                numericResult: addItems(value1, value2),
                formulaString: prefix + ' + ' + value2 + ')'
            }
        case 'sub':
            return {
                numericResult: subtract(value1, value2),
                formulaString: prefix + ' - ' + value2 + ')'
            }
        case 'mul':
            return {
                numericResult: multiply(value1, value2),
                formulaString: prefix + ' x ' + value2 + ')'
            }
        case 'div':
            return {
                numericResult: divide(value1, value2),
                formulaString: prefix + ' / ' + value2 + ')'
            }
        // case 'cnt':
        //     return {
        //         numericResult: concatenate(value1, value2),
        //         formulaString: prefix + '' + value2
        //     }
        default:
            return
    }
}

export const callBasicsDesc = (what, prefix, value1, value2) => {
    switch (what) {
        case 'add':
            return {
                numericResult: addItems(value1, value2),
                formulaString: '(' + value1 + ' + ' + prefix
            }
        case 'sub':
            return {
                numericResult: subtract(value1, value2),
                formulaString: '(' + value1 + ' - ' + prefix
            }
        case 'mul':
            return {
                numericResult: multiply(value1, value2),
                formulaString: '(' + value1 + ' x ' + prefix
            }
        case 'div':
            return {
                numericResult: divide(value1, value2),
                formulaString: '(' + value1 + ' / ' + prefix
            }
        // case 'cnt':
        //     return {
        //         numericResult: concatenate(value1, value2),
        //         formulaString: prefix + '' + value2
        //     }
        default:
            return
    }
}

export const callExtras = (what, value) => {
    switch (what) {
        case 'sqr':
            return squareRoot(value)
        case 'fct':
            return factorial(value)
        case 'dec':
            return setDecimal(value)
        default:
            break;
    }
}