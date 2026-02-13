import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserView from './components/UserView';
import UserEdit from './components/UserEdit';
import './styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserView />} />
        <Route path="/users/:id/edit" element={<UserEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
