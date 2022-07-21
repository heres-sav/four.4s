import {
    callBasicsAsc,
    callBasicsDesc
} from "./operators.js"

const data = 4
const length = 4
let results = []

// (((x, x), x), x)
const recursiveCallAsc = (set, prevValue, prevString, n, k) => {
    if (k === 1) {
        results.push({
            numericResult: prevValue,
            formulaString: prevString
        });
        return;
    }
    
    for (let i = 0; i < n; ++i) {
        // Ascending
        const { numericResult, formulaString } = callBasicsAsc(set[i], prevString, prevValue, data)

        recursiveCallAsc(set, numericResult, formulaString, n, k - 1)
    }

}
// (x, (x, (x, x)))
const recursiveCallDesc = (set, postValue, postString, n, k) => {
    if (k === 1) {
        results.push({
            numericResult: postValue,
            formulaString: postString
        });
        return;
    }
    
    for (let i = 0; i < n; ++i) {
        // Descending
        const { numericResult, formulaString } = callBasicsDesc(set[i], postString, data, postValue)

        recursiveCallDesc(set, numericResult, formulaString, n, k - 1)
    }

}
// ((x, x), (x, x))
const bigToSmall = (set, postValue, postString, n, k) => {
    
}
// (x, ((x, x), x))
// ((x, (x, x)), x)

const getBrain = () => {
    results = []
    let methods = ['add', 'sub', 'mul', 'div']
    recursiveCallAsc(
        methods,
        data,
        '((('+data,
        methods.length,
        length
    );
    recursiveCallDesc(
        methods,
        data,
        data+')))',
        methods.length,
        length
    );
    return results
}
  
export default getBrain