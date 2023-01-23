import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Grid } from '@mui/material'
import Sidebar from './components/Sidebar'
import CssBaseline from '@mui/material/CssBaseline'
import SearchField from './components/SearchField'

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
        <Grid item xs={12} md={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={4}>
          <SearchField />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App
