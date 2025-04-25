import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import Header from './Components/HelperComponents/Header';
import Home from './Components/RouteComponents/Home';
import Login from './Components/RouteComponents/Login';
import Error from './Components/HelperComponents/Error';
import FullSizeMap from './Components/HelperComponents/FullSizeMap'

import { useEffect, useState } from 'react';
import GetCurrentUser from './Controllers/Users/GetCurrentUser';
import Manage from './Components/RouteComponents/Manage';

function App() {

  const [viewCountries, setViewCountries] = useState(null);
  const [isFullSizeMapVisible, SetIsFullSizeMapVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');

  async function GetUser() {
      const user = await GetCurrentUser(setError);
      if(user && user.id !== -1)
        setCurrentUser(user);
  }

  useEffect(() => {
    GetUser();
  }, [])
  
  return (
    <BrowserRouter>
      <FullSizeMap isVisible={isFullSizeMapVisible} setIsVisible={SetIsFullSizeMapVisible} selectedCountries={viewCountries} />
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Error message={error} />
        <Routes>
            <Route element={
            <Home SetError={setError}
            viewCountries={viewCountries} setViewCountries={setViewCountries} SetIsFullSizeMapVisible={SetIsFullSizeMapVisible} 
            />} path='/'/>
            <Route path='/login' element={<Login SetError={setError} setCurrentUser={setCurrentUser} />} />
            <Route path='/manage' element={<Manage currentUser={currentUser} SetError={setError} />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
