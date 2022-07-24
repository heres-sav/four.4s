import { useEffect, useState } from 'react';

const IpResults = ({ data }) => {
  const [userIp, setUserIp] = useState('');
  const [result, setResult] = useState([]);
  useEffect(() => {
    setResult([])
    if(Array.isArray(data)) {
      let values = []
      data.forEach(item => {
        if(userIp && Number(userIp) === item.numericResult) {
          values.push(<h3
            key={item.formulaString}
            className="App-result"
          >{item.formulaString + ' = ' + item.numericResult}</h3>)
        }
      })
      if(values.length === 0)
        setResult(<h3
          key='unique'
          className="App-result"
        >
          No solutions found within the given constraints
        </h3>)
      else setResult(values)
    }
    else
      setResult(<h1
        key='unique'
        className="App-result"
      >
        ???
      </h1>)
  }, [userIp])
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h3 className="App-detail">Combinations calculated: {data.length}</h3>
          <h3 className="App-detail">Number of solutions found: {result.length}</h3>
          <input className="App-input" value={userIp} onChange={event => setUserIp(event.target.value)}/>
          <div className="result-container">
            <div style={{ padding: "20px" }}>
              {result}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default IpResults