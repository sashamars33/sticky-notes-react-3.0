import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pageFiles/Home'
import Login from './pageFiles/Login'
import Register from './pageFiles/Register'
import Profile from './pageFiles/Profile'
import Board from './pageFiles/Board'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Router>
    <Navigation /> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/board' element={<PrivateRoute />}>
          <Route path='/board' element={<Board />} />
        </Route>
    </Routes>
    <Footer/>
  </Router>
  );
}

export default App;
