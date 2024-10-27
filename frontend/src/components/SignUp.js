import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

export default function SignUp() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" });
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{5,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading to true on submit

        if (!validatePassword(credentials.password)) {
            setPasswordError("Password must be at least 5 characters long and contain at least one uppercase or lowercase letter, and one special character");
            setLoading(false); // Reset loading state
            return;
        } else {
            setPasswordError("");
        }

        try {
            const response = await fetch("http://localhost:5000/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.location
                })
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                alert("User created successfully!");
                // Clear form fields after successful submission
                setCredentials({ name: "", email: "", password: "", location: "" });
            } else {
                alert("Failed to create user.");
            }
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Error creating user. Please try again.');
        } finally {
            setLoading(false); // Reset loading state after the API call
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    const handleLocationChange = (event) => {
        const location = event.target.value;
        if (/^[a-zA-Z\s]*$/.test(location)) { // Ensure location only contains alphabets and spaces
            setCredentials({ ...credentials, location });
        }
    };

    return (
        <>
            <div className="signup-container">
                <div className="signup-form">
                    <div className="signup-content">
                        <h2 className="signup-title">Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Name"
                                    name="name"
                                    value={credentials.name}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={onChange}
                                    required
                                />
                                <small id="emailHelp" className="form-text text-muted">
                                    We'll never share your email with anyone else.
                                </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={onChange}
                                    required
                                />
                                {passwordError && <small className="form-text text-danger">{passwordError}</small>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputAddress">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputAddress"
                                    placeholder="Address"
                                    name="location"
                                    value={credentials.location}
                                    onChange={handleLocationChange}
                                    required
                                />
                            </div>
                            <div className="form-group form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="exampleCheck1"
                                    required
                                />
                                <label className="form-check-label" htmlFor="exampleCheck1">
                                    I agree
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                    <div className="login-link">
                        <p>Already a user? <Link to="/login">Login</Link></p>
                    </div>
                </div>
                <div className="signup-image">
                    <img src="https://i.pinimg.com/564x/f4/8f/1b/f48f1b7f47f2f18cb9cec9f0af53e765.jpg" alt="Background" />
                </div>
            </div>
        </>
    );
}
