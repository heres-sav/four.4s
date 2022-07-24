import { useEffect, useState } from 'react';
import './App.css';
import getBrain from './utils/brain';
import IpResults from './components/IpResults';

function App() {
  const showAll = false;
  const [resultsUI, setResults] = useState([]);
  const results = getBrain();
  if(showAll) {
    let values = []
    results.forEach(item => {
      values.push(<h3
        className="App-detail"
      >{item.formulaString + ' = ' + item.numericResult}</h3>)
    })
    setResults(values)
  }
  return (
    <div className="App">
      <header className="App-container">
        {
          showAll ?
          (<div>{resultsUI}</div>)
          : (<IpResults data={results} />)
        }
      </header>
    </div>
  );
}

export default App;
