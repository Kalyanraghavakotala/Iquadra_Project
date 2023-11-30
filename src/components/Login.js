import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Marquee from "react-fast-marquee";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import '../index.css';
function Login() {
  const navig = useNavigate();

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "white",
    opacity: "1"
  };

  const inputStyle = {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    marginBottom: "15px",
    width: "100%",
    backgroundColor: "white"
  };
  const inputContainer = {
    width: "100%",
  };
  const formStyle = {
    width: "80%",
    margin: "0 auto",
  };

  const formContainer = {
    backgroundColor: "#495788",
    padding: "50px",
    // opacity: "0.5",
    borderRadius: " 10px",
    boxShadow: "5px 5px 5px"
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [logged, setlogged] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    const respon = await fetch('http://localhost:8002/sendpassword', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const k = await respon.json();
    alert(JSON.stringify(k));
  };
  const handelUsername = (e) => {
    setUsername(e.target.value);
    // console.log(username)
  }

  const handelPassword = (e) => {
    setPassword(e.target.value);
    // console.log(roll)
  }

  //fetching data from  database to the front end.
  const getUsers = async () => {
    sessionStorage.clear();
    try {
      const response = await fetch('http://localhost:8002/getdata', {
        method: 'GET'
      });
      const result = await response.json();
      setUsers(result);
      console.log(result)

    }
    catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  const handleLogin = (e) => {
    const user = users.find((user) => user.email === username && user.password === password)
    if (!user) {
      document.getElementById('error').innerHTML = "Username or Passowrd is incorrect";
    }
    else {
      console.log(user);
      localStorage.setItem("first", user.first);
      localStorage.setItem("last", user.last);
      localStorage.setItem("middle", user.middle);
      localStorage.setItem("username", user.first + " " + user.last);
      localStorage.setItem("usermail", user.email);
      localStorage.setItem("imgadr", user.imgadr);
      localStorage.setItem("current", user.current);
      localStorage.setItem("perman", user.perman);
      localStorage.setItem("mobile", user.mobile);
      setlogged(true);
    }
    // setlogged(true);
  };




  if (logged) {
    navig('/dashboard');
  }
  else {
    // If the user is not logged in, render the login form
    return (

      <div className='row login' style={{ height: '100vh' }} >
        <div className='col-md-6 offset-md-3' style={{ marginTop: '2%', marginBottom: '2' }}>
          <Marquee style={{ color: 'red' }}>Please wait for some time We load the details from backend!!
          </Marquee>
          <div style={formContainer}>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }} style={formStyle}>
              <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
                Login with your Credentials
              </h2>
              < span id='error' style={{ color: 'red' }}></span>
              <div style={inputContainer}>
                <label style={labelStyle}>User Email:</label>
                <input type="text" name="username" value={username} placeholder='enter user email'
                  onChange={handelUsername}
                  style={inputStyle}
                />
              </div><br />
              <div style={inputContainer}>
                <label style={labelStyle}>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handelPassword}
                  style={inputStyle}
                />
              </div><br />
              <div className='row' style={{ marginTop: '1%' }}>
                <div>
                  <div style={{ display: 'flex', height: '50px', width: '100%', justifyContent: 'space-between' }}>
                    <Button style={{ color: 'blue', backgroundColor: 'white', border: '0px solid white' }} onClick={handleShow}>Forgot Password ?</Button>
                    <Button style={{ color: 'blue', backgroundColor: 'white', border: '0px solid white' }} onClick={() => navig('/register')} >New User?</Button>
                  </div>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Enter you mail to change password </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                      <form style={{ maxWidth: '500px', width: '100%' }} onSubmit={handleSubmit}>
                        <p id='error1' style={{ color: 'red' }}></p>
                        <label htmlFor="name" style={{ fontSize: '18px', fontWeight: 'bold' }}>Email : </label>
                        <input type="text" id="name" name="email" required onChange={handleChange} style={{ padding: '8px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box', marginTop: '8px', marginBottom: '16px' }} />
                        <label htmlFor="name" style={{ fontSize: '18px', fontWeight: 'bold' }}>Security Question:What is your Place of Birth ? </label>
                        <input type="text" id="name" name="security" required onChange={handleChange} style={{ padding: '8px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box', marginTop: '8px', marginBottom: '16px' }} />

                      </form>
                    </Modal.Body>
                    <Modal.Footer>

                      <Button variant="danger" onClick={() => { handleSubmit(); }}>Submit</Button>
                    </Modal.Footer>
                  </Modal>

                </div>
              </div>
              <center>
                <button type="submit" className="btn btn-success" style={{ padding: "10px 20px" }}>
                  Login
                </button>
              </center>
            </form>
          </div>
        </div >
      </div >

    );
  }
}

export default Login;
