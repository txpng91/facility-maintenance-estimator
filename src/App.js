// important imports
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateTask from './components/CreateTask';
import EditTask from './components/EditTask';
import Main from './components/Main';
import Info from './components/Info';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/create' element={<CreateTask />} />
          <Route path='/edit' element={<EditTask />} />
          <Route path='/info' element={<Info />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
