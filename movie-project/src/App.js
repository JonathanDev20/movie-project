import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Grid } from '@mui/material'
import Sidebar from './components/Sidebar'
import CssBaseline from '@mui/material/CssBaseline'
import SearchField from './components/SearchField'
import HomePage from './components/HomePage'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Discover from './components/Discover'
import MoviePage from './components/MoviePage'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route exact path='/' element={<HomePage />}></Route>
          <Route path='/discover' element={<Discover />}></Route>
          <Route path='/movie/:id' element={<MoviePage />}></Route>
        </Routes>
      </HashRouter>
    </ThemeProvider >
  );
}

export default App
