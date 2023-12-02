import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Watermark } from 'antd';

function ChangeDetails() {
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
    // const imgadr=localStorage.getItem('imgadr');
    // const user=localStorage.getItem('username');
    const email = localStorage.getItem('usermail');
    const mobile = localStorage.getItem('mobile');
    const perman = localStorage.getItem("perman");
    const first = localStorage.getItem("first");
    const last = localStorage.getItem("last");
    let middle = localStorage.getItem("middle");
    if (middle === undefined)
        middle = "NA"
    const [details, setdetails] = useState({ 'email': email });
    const [redirect, setredirect] = useState(false);
    const handleChange = (event) => {
        setdetails({
            ...details,
            [event.target.name]: event.target.value
        })
    };
    const photoTaken = (e) => {
        let file = e.target.files[0];
        if (!file || !/image\/.*/.test(file.type)) return;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setdetails({ ...details, 'imgadr': reader.result })
            console.log(reader.result)
        }
        reader.onerror = function () {
            alert('please select profile photo')
        }

    }
    const handleSubmit = async () => {
        setredirect(true);

        const respon = await fetch('http://localhost:8002/changedetails', {
            method: 'POST',
            body: JSON.stringify(details),
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log(respon);

    };

    // useEffect(() => {
    //     if (!localStorage.getItem('usermail')) navig('/')
    // })
    if (redirect) {
        for (const key in details) {
            if (details.hasOwnProperty(key)) {
                localStorage.setItem(key, details[key]);
            }
        }
        navig('/dashboard');
    }

    else {

        // If the user is not logged in, render the login form
        return (
            <>
                <Watermark content={['iQuadra', 'aditya']} offset={[0, 0]}>

                    <div className='row login' style={{ height: '100vh' }} >
                        <div className='col-md-6 offset-md-3' style={{ marginTop: '2%', marginBottom: '2' }}>

                            <div style={formContainer}>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit()


                                }} style={formStyle}>
                                    <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
                                        Register
                                    </h2>
                                    < span id='error' style={{ color: 'red' }}></span>
                                    <div style={inputContainer}>
                                        <label style={labelStyle}>First Name:</label>
                                        <input type="text" name="first" value={first}
                                            onChange={handleChange} disabled
                                            style={inputStyle}
                                        />
                                    </div><br />
                                    <div style={inputContainer}>
                                        <label style={labelStyle}>Middle Name:</label>
                                        <input type="text" name="middle"
                                            onChange={handleChange} value={middle} disabled
                                            style={inputStyle}
                                        />
                                    </div><br />
                                    <div style={inputContainer}>
                                        <label style={labelStyle}>Last Name:</label>
                                        <input type="text" name="last"
                                            onChange={handleChange} value={last} disabled
                                            style={inputStyle}
                                        />
                                    </div><br />
                                    <div style={inputContainer}>
                                        <label style={labelStyle}>Email:</label>
                                        <input type="email" name="email"
                                            onChange={handleChange} value={email} disabled
                                            style={inputStyle}
                                        />
                                    </div><br />
                                    <div style={inputContainer}>
                                        <label style={labelStyle}>Password:</label>
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                            style={inputStyle}
                                        />
                                    </div><br />
                                    <div style={inputContainer}>
                                        <label style={labelStyle}>Confirm Password:</label>
                                        <input
                                            type="password"
                                            name="c_password"
                                            onChange={handleChange}
                                            style={inputStyle}
                                        />
                                    </div><br />
                                    <div style={inputContainer}>
                                        <label style={labelStyle}>Mobile:</label>
                                        <input type="text" name="mobile"
                                            onChange={handleChange} value={mobile} disabled
                                            style={inputStyle}
                                        />
                                    </div><br />
                                    <div style={inputContainer}>
                                        <label style={labelStyle}>Current Address:</label>
                                        <input type="text" name="current"
                                            onChange={handleChange}
                                            style={inputStyle}
                                        />
                                    </div>
                                    <br /><div style={inputContainer}>
                                        <label style={labelStyle}>Permanent Address:</label>
                                        <input type="text" name="permanent"
                                            onChange={handleChange} value={perman} disabled
                                            style={inputStyle}
                                        />
                                    </div>
                                    <div style={inputContainer}>
                                        <label style={labelStyle}>Upload Picture:</label>
                                        <input type="file" accept=' .jpg, .png, .jpeg' name="image"
                                            style={inputStyle}
                                            onChange={photoTaken}
                                        />
                                    </div>
                                    <center>
                                        <button type="submit" className="btn btn-success" style={{ padding: "10px 20px" }}>
                                            Submit
                                        </button>
                                    </center>
                                </form>
                            </div>
                        </div>
                    </div>
                </Watermark>
            </>
        );
    }
}

export default ChangeDetails;