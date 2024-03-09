import { createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
  typography: {
    fontFamily: ['Outfit', 'sans-serif'].join(',')
  },
  palette: {
    mode: 'dark'
  }
})

const lightTheme = createTheme({
  typography: {
    fontFamily: ['Outfit', 'sans-serif'].join(',')
  },
  palette: {
    mode: 'light'
  }
})
export { darkTheme, lightTheme }
