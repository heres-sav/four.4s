import { Button } from "@mui/material"

const Press = ({ label, icon, onClick }: { label: string, icon: React.ReactNode, onClick: ()=>void }) => {
  return <Button startIcon={icon} variant="outlined" onClick={onClick}>{label}</Button>
}

export default Press