import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
function Header(props) {

  const navig = useNavigate();
  const [login, setLogin] = useState('none')
  useEffect(() => {
    if (localStorage.getItem('usermail')) {
      setLogin('block')
    }
  })
  function reload() {
    sessionStorage.clear();
    localStorage.clear()
    navig('/')
  }
  return (
    <>
      <div style={{ backgroundColor: '#495788', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <h1 style={{ margin: '0' }}>iQuadra</h1>
        <div style={{ display: login }}>
          <br />
          <p style={{ margin: '0', marginRight: '10px' }}>Welcome, {localStorage.getItem('username')}!</p>
          <nav style={{ display: 'inline-block' }}>
            <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
              <li style={{ display: 'inline-block', marginRight: '10px' }}><Link to='/dashboard'>My Profile</Link></li>
              <li style={{ display: 'inline-block', marginRight: '10px' }}><Link to='/contacts'>Contacts</Link></li>
              <li style={{ display: 'inline-block', marginRight: '10px' }}><Link to='/reminder'>Reminders</Link></li>
              <li style={{ display: 'inline-block', marginRight: '10px' }}><Link to='/todo'>TodoList</Link></li>
              <li style={{ display: 'inline-block', marginLeft: '10px' }}>
                <button onClick={reload} style={{ backgroundColor: "#495788", border: '0px solid #495788', color: 'white' }}>
                  <FiLogOut />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div >


    </>
  )
}

export default Header
