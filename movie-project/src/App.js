import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Grid } from '@mui/material'
import Sidebar from './components/Sidebar'
import CssBaseline from '@mui/material/CssBaseline'
import SearchField from './components/SearchField'
import HomePage from './components/HomePage'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid container>
        <Grid md={12}>
          <HomePage />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App
