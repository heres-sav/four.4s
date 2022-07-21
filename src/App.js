import { useEffect, useState } from 'react';
import './App.css';
import getBrain from './utils/brain';

function App() {
  const [userIp, setUserIp] = useState('');
  const [result, setResult] = useState([]);
  const results = getBrain();
  useEffect(() => {
    if(Array.isArray(results)) {
      let values = []
      results.forEach(item => {
        if(userIp && Number(userIp) === item.numericResult) {
          values.push(<h3
            key={item.formulaString}
            className="App-detail"
          >{item.formulaString + ' = ' + item.numericResult}</h3>)
        }
      })
      if(values.length === 0)
        setResult(<h3
          key='unique'
          className="App-detail"
        >
          No solutions found within the given constraints
        </h3>)
      else setResult(values)
    }
    else
      setResult(<h1
        key='unique'
        className="App-detail"
      >
        ???
      </h1>)
  }, [userIp])
  return (
    <div className="App">
      <header className="App-header">
        <h3 className="App-detail">Combinations calculated: {results.length}</h3>
        <h3 className="App-detail">Number of solutions found: {result.length}</h3>
        <input className="App-input" value={userIp} onChange={event => setUserIp(event.target.value)}/>
        {result}
      </header>
    </div>
  );
}

export default App;
