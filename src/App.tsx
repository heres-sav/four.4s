import { useEffect, useState } from 'react';
import { Box, Button, InputBase, List, ListItem, ListItemIcon, ListItemText, Slider, Typography } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import getBrain from './utils/brain';
import { BasicProps, DecimalCase, OperatorCase } from './utils';
import Operators from './components/operators';
import { DECIMALS, OPERATORS } from './utils/constants';
import './App.css';

function App(): JSX.Element {
  const [isAdvance, setAdvance] = useState<boolean>(false);
  const [problem, setProblem] = useState<number>(4)
  const [userIp, setUserIp] = useState<number>(0);
  const [result, setResult] = useState<Array<JSX.Element>>([]);
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
    const _results = getBrain([...operators, ...decimals], problem)
    setResult([])
    let values: Array<JSX.Element> = []
    _results.forEach((item: BasicProps) => {
      if(userIp !== null && Number(userIp) === item.numericResult) {
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
    setResults(_results)
  }, [userIp, decimals, operators, problem])
  return (
    <Box
      id="app-container"
      height="100vh"
      overflow="hidden">
      <Box
        id="app-left-container"
        bgcolor="var(--primary)">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end">
          <Typography
            id="title"
            fontWeight="300"
            color="var(--bright-white)"
          >four <strong>{problem}</strong>s</Typography>
          <Button
            variant="outlined"
            startIcon={<LightbulbOutlinedIcon />}
            color="inherit"
            onClick={() => {
              setProblem(4)
              setOperators(OPERATORS.map(each => {
                each.enabled = true
                return each
              }))
              setDecimals(DECIMALS.map(each => {
                each.enabled = true
                return each
              }))
              setAdvance(!isAdvance)
            }}>
            { !isAdvance ? "Advance" : "Back 2 Basic"}
          </Button>
        </Box>
        {
          isAdvance ? <Slider
            defaultValue={problem}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={2}
            max={9}
            onChange={(e: Event, v: number | number[]) => setProblem(v as number)}
          /> :
          <Box height="30px" />
        }
        <Typography
          id='description'
          fontWeight="300"
          color="var(--bright-white)">
          {`Use exactly four ${problem}’s to form every integer from 0 to 50 (may be till 100),
          using only the operators +, −, ×, /, () (brackets), . (decimal point), √ (square root)
          and ! (factorial).`}
        </Typography>
        <Typography
          className='extras'
          fontSize="16px"
          fontWeight="800"
          color="var(--bright-white)">Limitations
        </Typography>
        <List
          className='extras'>
          <ListItem
            disableGutters>
            <ListItemIcon>
              <CircleIcon
                fontSize='small'
                htmlColor="var(--bright-white)"
              />
            </ListItemIcon>
            <ListItemText
              sx={{
                fontSize: 16,
                fontWeight: "100",
                color: "var(--bright-white)"
              }}
              primary={`The algorithm considers concatenation of two ${problem}'s as ${problem}${problem}, but
              not three or four ${problem}'s. As per the problem statement already mentioned the upper constraint
              is not more than 100, so it will not be efficient if we take three ${problem}'s concatenation (i.e
              ${problem}${problem}${problem}) into account.`} />
          </ListItem>
          <ListItem
            disableGutters>
            <ListItemIcon>
              <CircleIcon
                fontSize='small'
                htmlColor="var(--bright-white)"
              />
            </ListItemIcon>
            <ListItemText
              sx={{
                color: "var(--bright-white)"
              }}
              primary={`The algorithm doesn't consider to the power of ${problem} [eg. the program doesn't use
              (${problem}${problem}/${problem})^${problem}].
              \nThat’s why the program doesn’t have the solution for
              81 [i.e. 81 = (4/4-4)^4]`} />
          </ListItem>
          <ListItem
            disableGutters>
            <ListItemIcon>
              <CircleIcon
                fontSize='small'
                htmlColor="var(--bright-white)"
              />
            </ListItemIcon>
            <ListItemText
              sx={{
                color: "var(--bright-white)"
              }}
              primary={`Unsolved numbers less than 100 are 73, 77, 81, 87, 93, 99`} />
          </ListItem>
        </List>
        <Box
          display="flex"
          alignItems="flex-end">
          <Typography
            className='secondary-component-text'
            pr="12px"
            fontSize="32px"
            fontWeight="300"
            color="var(--bright-white)">Give all the solutions for</Typography>
          <InputBase
            type="number"
            inputProps={{
              style: {
                textAlign: "right",
                color: "var(--bright-white)",
                border: "1px solid var(--bright-white)",
                borderRadius: "4px"
              }
            }}
            value={userIp}
            onChange={e => setUserIp(Number(e.target.value))}
          />
        </Box>
        <Typography
          className='secondary-component-text'
          fontSize="32px"
          fontWeight="300"
          color="var(--bright-white)">Number of solutions found <strong>{result.length}</strong></Typography>
        <Box
          display="flex"
          alignItems="flex-end"
          justifyContent="space-between">
          <Typography
            className='all-combination-text'
            fontWeight="100"
            color="var(--bright-white)">Combinations Calculated</Typography>
          <Typography
            className='all-combination-text'
            fontWeight="800"
            color="var(--bright-white)">{results.length}</Typography>
        </Box>
      </Box>
      {
        isAdvance ?
        <Operators
          operators={operators}
          decimals={decimals}
          toggleSelect={toggleSelect}
        /> :
        <Box />
      }
      <Box
        p="20px"
        sx={{
          height: "100%",
          overflowY: "scroll"
        }}>
        {result}
      </Box>
    </Box>
  );
}

export default App;