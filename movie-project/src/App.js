import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Sidebar from './components/Sidebar'
import CssBaseline from '@mui/material/CssBaseline'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Sidebar />
    </ThemeProvider>
  );
}

export default App
