import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import HomePage from './components/HomePage'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Discover from './components/Discover'
import MoviePage from './components/MoviePage'
import SearchPage from './components/SearchPage'
import Footer from './components/Footer'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Montserrat'
  }
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
          <Route path='/search/:searchWord' element={<SearchPage />}></Route>
        </Routes>
      </HashRouter>
      <Footer />
    </ThemeProvider >
  );
}

export default App
