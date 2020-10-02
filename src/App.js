import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Pages/Home';

function App() {
  return (

    <BrowserRouter>
    <div className='App'>
      <Route path='/' exact component={Home} />
    </div>
  </BrowserRouter>

  );
}

export default App;
