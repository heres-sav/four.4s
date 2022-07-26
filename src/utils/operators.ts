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
// Concatenating, two items
const concatenate = (item1 : [decimal], item2 : [decimal]) =>{
    return item1*10 + item2
}

export const callBasics = (what : [string], value1 : [decimal], value2 : [decimal]) => {
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