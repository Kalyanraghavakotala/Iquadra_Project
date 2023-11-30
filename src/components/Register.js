import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
function Register() {
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
    const [redirect, setredirect] = useState(false);
    const [details, setdetails] = useState({});
    const handleChange = (event) => {
        setdetails({
            ...details,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = async () => {
        setredirect(true);
        const respon = await fetch('http://localhost:8002/signup', {
            method: 'POST',
            body: JSON.stringify(details),
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log(respon);

    };



    const photoTaken = (e) => {
        let file = e.target.files[0];
        if (!file || !/image\/.*/.test(file.type)) return;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setdetails({ ...details, 'imgadr': reader.result })
        }
        reader.onerror = function () {
            alert('please select profile photo')
        }

    }

    if (redirect) {
        navig('/');
    }
    else {

        // If the user is not logged in, render the login form
        return (
            <>
                <Header />
                <div className='row login' style={{ height: '100vh' }} >
                    <div className='col-md-6 offset-md-3' style={{ marginTop: '2%', marginBottom: '2' }}>

                        <div style={formContainer}>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();


                            }} style={formStyle}>
                                <h2 style={{ textAlign: "center", marginBottom: "25px", color: 'white' }}>
                                    Register
                                </h2>
                                < span id='error' style={{ color: 'red' }}></span>
                                <div style={inputContainer}>
                                    <label style={labelStyle}>First Name:</label>
                                    <input type="text" name="first"
                                        onChange={handleChange}
                                        style={inputStyle}
                                    />
                                </div><br />
                                <div style={inputContainer}>
                                    <label style={labelStyle}>Middle Name:</label>
                                    <input type="text" name="middle"
                                        onChange={handleChange}
                                        style={inputStyle}
                                    />
                                </div><br />
                                <div style={inputContainer}>
                                    <label style={labelStyle}>Last Name:</label>
                                    <input type="text" name="last"
                                        onChange={handleChange}
                                        style={inputStyle}
                                    />
                                </div><br />
                                <div style={inputContainer}>
                                    <label style={labelStyle}>Email:</label>
                                    <input type="email" name="email"
                                        onChange={handleChange}
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
                                        onChange={handleChange}
                                        style={inputStyle}
                                    />
                                </div><br />
                                <div style={inputContainer}>
                                    <label style={labelStyle}> Security Question:What is your Place of Birth ?</label>
                                    <input type="text" name="security"
                                        onChange={handleChange} placeholder='Remember this answer it is used to recover password'
                                        style={inputStyle}
                                    />
                                </div><br />
                                <div style={inputContainer}>
                                    <label style={labelStyle}> Current Address:</label>
                                    <input type="text" name="current"
                                        onChange={handleChange}
                                        style={inputStyle}
                                    />
                                </div><br />
                                <div style={inputContainer}>
                                    <label style={labelStyle}> Permanent Address:</label>
                                    <input type="text" name="perman"
                                        onChange={handleChange}
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
                                    <br />
                                    <br />
                                    <h5 style={{ color: 'white', margin: "0 auto" }}>Please wait for some time after registration</h5>
                                </center>
                            </form>

                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        );
    }
}

export default Register