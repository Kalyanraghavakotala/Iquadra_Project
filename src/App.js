import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Addcontact from './components/Addcontact';
import Dash from './components/Dash';
import Login from './components/Login';
import Register from './components/Register';
import ReminderPage from './components/Reminder';
import ChangeDetails from './components/ChangeDetails';
import TodoList from './components/TodoList';
import Contact from './components/Contact';
function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dash />} />
          <Route path='/contacts' element={<Contact />} />
          <Route path='/addcontact' element={<Addcontact />} />

          <Route path='/register' element={<Register />} />
          <Route path='/reminder' element={<ReminderPage />} />
          <Route path='/changedetails' element={<ChangeDetails />} />
          <Route path='/todo' element={<TodoList />} />

        </Routes>

      </BrowserRouter>

    </>
  );
}

export default App;
