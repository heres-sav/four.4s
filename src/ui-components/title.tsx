import { Box, Typography } from "@mui/material";

const Title = ({ label }: {
  label: string
}) => <Box p="6px 12px 7px 12px" bgcolor="#202020" borderRadius="6px">
  <Typography fontFamily="Outfit" fontWeight="800" color="#999999">{label}</Typography>
</Box>

export default Title