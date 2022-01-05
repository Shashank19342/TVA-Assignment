import React from "react";
import './App.css';
import User from "./components/User";
import UserDetail from "./components/UserDetail";
import {BrowserRouter, Routes , Route} from 'react-router-dom';

function App() {

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Routes>
          <Route path="/:id" element={<UserDetail />} />
          <Route path="/" exact element={<User />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
