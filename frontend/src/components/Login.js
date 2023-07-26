import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = (props) => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }
    // this is the url where backend is hosted
    const host = "http://localhost:5000"
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }) // body data type 
        });
        const json = await response.json();
        //console.log(json)
        if (json.success) {
            props.showAlert("Loged in successfully", "success")
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
            <h2 className='my-3'>Login  to Up-2-Date</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input value={credentials.email} type="email" name="email" onChange={onChange} className="form-control" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={onChange} value={credentials.password} type="password" name="password" className="form-control" id="password" />
                </div>

                <button type="submit" className="btn btn-success">Login</button>
            </form>
        </div>
    )
}
