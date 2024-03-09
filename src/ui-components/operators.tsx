import { Button, Stack, Typography } from "@mui/material";
import { DecimalCase, OperatorCase } from "../utils";

const Operator = ({ data, disabled, handleClick }: {
  data: OperatorCase | DecimalCase
  disabled: boolean
  handleClick: () => void
}) => (
  <Button id="button-op" sx={{ borderRadius: "12px", margin: "12px", border: disabled ? "none" : "1px solid #1976d2" }}
    onClick={handleClick}>
    <Typography variant="h4" className="operator" color="#1976d2" fontWeight="600" textAlign="center">{data.label}</Typography>
  </Button>
)

const Operators = ({ operators, decimals, toggleSelect }: {
  operators: Array<OperatorCase>
  decimals: Array<DecimalCase>
  toggleSelect: (w: string, v: number) => void
}) => (
  <Stack id="advance-ops" direction="row" justifyContent="center">
    {
      operators.map((item, index: number) =>
        <Operator
          data={item}
          disabled={!item.enabled}
          handleClick={() => toggleSelect("operator", index)}
        />
      )
    }
    {
      decimals.map((item, index: number) =>
        <Operator
          data={item}
          disabled={!item.enabled}
          handleClick={() => toggleSelect("decimal", index)}
        />
      )
    }
  </Stack>
)

export default Operators
