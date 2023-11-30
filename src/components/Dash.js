import React from 'react';
// import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
function Dash() {

  const navig = useNavigate();
  var imgadr = localStorage.getItem('imgadr');
  var user = localStorage.getItem('username');
  var email = localStorage.getItem('usermail');
  var mobile = localStorage.getItem('mobile');
  var current = localStorage.getItem("current");
  var perman = localStorage.getItem("perman");
  function load() {
    imgadr = localStorage.getItem('imgadr');
    user = localStorage.getItem('username');
    email = localStorage.getItem('usermail');
    mobile = localStorage.getItem('mobile');
    current = localStorage.getItem("current");
    perman = localStorage.getItem("perman");
  }
  function change() {
    navig('/changedetails');
  }
  useEffect(() => {
    load();
  });
  return (
    <>
      <Header />

      <div className='x'><br />
        <button style={{ marginLeft: '10px' }} onClick={change} className='btn btn-primary'>change Details</button>

        <center ><h2><b>Student Details</b></h2></center>
        <div className='row'>
          <div className='col-md-4'></div>
          <div className='col-md-4' style={{ boxShadow: '5px 5px 4px' }}>
            <center>
              <img src={imgadr} height={'150px'} alt='reload' />
              <br />
            </center><br />
            <Table responsive bordered='true'>
              <thead></thead>
              <tbody>
                <tr>
                  <th>Name :</th>
                  <td>&nbsp;{user}</td>
                </tr>

                <tr>
                  <th>Email:</th>
                  <td>&nbsp;{email}</td>
                </tr>
                <tr>
                  <th>mobile:</th>
                  <td>&nbsp;{mobile}</td>
                </tr>
                <tr>
                  <th>Current Address:</th>
                  <td>&nbsp;{current}</td>
                </tr>
                <tr>
                  <th>Permanent Address</th>
                  <td>&nbsp;{perman}</td>
                </tr>
              </tbody>
            </Table>

          </div >



        </div>
      </div>
      <br />


      <Footer />
    </>
  )
}

export default Dash
