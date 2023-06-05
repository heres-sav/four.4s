import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { AllOperator, AllOperatorLabel, DecimalCase, Operator as OperatorType, OperatorCase } from "../utils";

const Operator = ({ data, disabled, handleClick }: {
  data: OperatorCase | DecimalCase
  disabled: boolean
  handleClick: () => void
}) => (
  <Box
    width="64px"
    height="64px"
    display="flex"
    justifyContent="center"
    alignItems="center"
    border="1px solid var(--bright-white)"
    margin="4px 0px"
    bgcolor={disabled ? "var(--cool-black)" : "var(--highlight)"}
    sx={{
      cursor: "pointer",
      opacity: disabled ? 0.5 : 1
    }}
    onClick={handleClick}>
    <Typography
      className="menu-label-text"
      color="var(--bright-white)"
      fontWeight="800"
      textAlign="center">{data.label}</Typography>
  </Box>
)

const Operators = ({ operators, decimals, toggleSelect }: {
  operators: Array<OperatorCase>
  decimals: Array<DecimalCase>
  toggleSelect: (w: string, v: number) => void
}) => (
  <Box
    id="operators-container"
    display="flex"
    bgcolor="var(--primary)">
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
  </Box>
)

export default Operators
