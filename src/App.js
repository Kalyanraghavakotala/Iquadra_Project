import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Addcontact from './components/Addcontact';
import Dash from './components/Dash';
import Login from './components/Login';
import Register from './components/Register';
import ReminderPage from './components/Reminder';
import ChangeDetails from './components/ChangeDetails';
import TodoList from './components/TodoList';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <div className="space">
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<Dash />} />
            <Route path='/contacts' element={<Contact />} />
            <Route path='/addcontact' element={<Addcontact />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/register' element={<Register />} />
            <Route path='/reminder' element={<ReminderPage />} />
            <Route path='/changedetails' element={<ChangeDetails />} />
            <Route path='/todo' element={<TodoList />} />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>

    </>
  );
}

export default App;
