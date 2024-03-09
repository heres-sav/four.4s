import { useEffect, useState } from "react";
import { Box, Grid, IconButton, InputBase, Stack, Typography } from "@mui/material";
import Title from "./ui-components/title";
import Press from "./ui-components/button";
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import getBrain from "./utils/brain";
import { BasicProps, DecimalCase, OperatorCase } from "./utils";
import { DECIMALS, OPERATORS } from "./utils/constants";
import { chooseOne } from "./utils/utils";
import Operators from "./ui-components/operators";
import './App.css';

function App(): JSX.Element {
  const [isAdvance, setAdvance] = useState<boolean>(false);
  const [problem, setProblem] = useState<number>(4);
  const [userIp, setUserIp] = useState<number>(100);
  const [result, setResult] = useState<Array<JSX.Element>>([]);
  const [ans, setAns] = useState<JSX.Element>();
  const [results, setResults] = useState<Array<BasicProps>>([]);
  const [operators, setOperators] = useState<Array<OperatorCase>>(OPERATORS);
  const [decimals, setDecimals] = useState<Array<DecimalCase>>(DECIMALS.map((each: DecimalCase) => {
    switch (each.value) {
      case "##":
        each.label = `${problem}${problem}`
        return each
      case "#.#":
        each.label = `${problem}.${problem}`
        return each
      default:
        return each
    }
  }));
  const [index, setIndex] = useState<number>(0);

  const toggleSelect = (what: string, index: number) => {
    if(what === "decimal") {
      const decimalsClone: Array<DecimalCase> = [...decimals]
      decimalsClone[index].enabled = !decimalsClone[index].enabled
      setDecimals(decimalsClone)
    }
    else if(what === "operator") {
      const operatorsClone: Array<OperatorCase> = [...operators]
      operatorsClone[index].enabled = !operatorsClone[index].enabled
      setOperators(operatorsClone)
    }
  }

  useEffect(() => {
    const __results: Array<BasicProps> = []
    const _results = getBrain([...operators, ...decimals], problem)
    setResult([])
    let values: Array<JSX.Element> = []
    _results.forEach((item: BasicProps) => {
      if(userIp !== null && Number(userIp) === item.numericResult) {
        __results.push(item)
        values.push(<Typography
          key={item.formulaString}
          className="solution-text"
          fontWeight="300"
          color="var(--cool-black)"
        >
          {item.formulaString + ' = ' + item.numericResult}
        </Typography>)
      }
    })
    setResult(values)
    setResults(__results)
    setIndex(chooseOne(values.length, index))
  }, [userIp, decimals, operators, problem])

  const renderAnswer = () => {
    return <Stack direction="row" justifyContent="center" alignItems="center" p="0px 12px" width="100%"
      height="160px">
      {results[index]?.structuralResult.map((item: string) => {
        return item.includes('4') ?
        <Typography p="12px" variant="h1" fontWeight="800" borderRadius="12px" bgcolor="#FEC89A">{item}</Typography>
        : <Typography variant="h1">{item}</Typography>
      })}
    </Stack>
  }
  return <Stack id="container" margin="22px 70px">
    <Stack direction="row" justifyContent="space-between">
      <Title label="four.4s" />
      <Press label={ !isAdvance ? "Advance" : "Back to Basic"} icon={<LightbulbCircleIcon />} onClick={() => {
        setAdvance(!isAdvance)
      }}/>
    </Stack>
    <h4 style={{ fontWeight: "200", paddingTop: "12px" }}>Challenge description:</h4>
    <h3>Use exactly four 4’s to form every integer from 0 to 50 (may be till 100), using only the operators +, −, ×, /, () (brackets), . (decimal point), (square root) and ! (factorial).</h3>
    <Stack id="input-section" direction="row" justifyContent="space-between" alignItems="center">
      <Box className="left">
        <Typography variant="h1" fontWeight="600" lineHeight="5rem">Enter a number between 0 - 100</Typography>
      </Box>
      <InputBase sx={{ width: "224px", padding: "0px 24px", border: "4px solid #D9D9D9",
      borderRadius: "12px", textAlign: "center" }} value={userIp} onChange={e => setUserIp(Number(e.target.value))}/>
    </Stack>
    <Typography id="solution-count" p="12px 0px" variant="h3" fontWeight="200">Solutions found: {results.length}</Typography>
    <Stack id="answer-section" direction="row" justifyContent="space-between" alignItems="center" margin="32px 0px">
      {renderAnswer()}
      <IconButton
        sx={{ border: "1px solid #1976d2", borderRadius: "12px", fontSize: "6rem" }}
        onClick={() => setIndex(chooseOne(results.length, index))}>
        <RefreshIcon fontSize="inherit" htmlColor="#1976d2" />
      </IconButton>
    </Stack>
    {
      isAdvance &&
      <Operators
        operators={operators}
        decimals={decimals}
        toggleSelect={toggleSelect}
      />
    }
  </Stack>
}

export default App;