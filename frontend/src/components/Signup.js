import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
require('dotenv').config();

export const Signup = (props) => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirm_password: "" })
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }
    // this is the url where backend is hosted
    const host = process.env.REACT_APP_HOST || 'http://localhost:5000';
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const { name, email, password } = credentials;
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }) // body data type 
        });
        const json = await response.json();
        //console.log(json)
        if (json.success) {
            props.showAlert("Account created successfully", "success")
            // save the auth-token and redirect to home page
            localStorage.setItem('token', json.authToken)
            navigate("/")
        }
        else {
            props.showAlert("Invalid credentials", "danger")
        }

    }
    return (
        <div className='container'>
            <h2 className='my-3'>Sign Up  to Up-2-Date</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Username</label>
                    <input onChange={onChange} type="name" name="name" className="form-control" id="name" minLength={2} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" onChange={onChange} className="form-control" id="email" aria-describedby="emailHelp" required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={onChange} type="password" name="password" className="form-control" id="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                    <input onChange={onChange} type="password" name="confirm_password" className="form-control" id="confirm_password" minLength={5} required />
                </div>

                <button type="submit" className="btn btn-success">Sign Up</button>
            </form>
        </div>
    )
}
