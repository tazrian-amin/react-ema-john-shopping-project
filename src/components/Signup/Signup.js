import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './Signup.css';

const Signup = () => {

    const { createUser } = useContext(AuthContext);

    const [error, setError] = useState(null);

    const handleSubmit = event => {
        event.preventDefault();
        setError(null);

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        if (password.length < 6) {
            setError('Password must contain at least 6 characters');
        }

        if (password !== confirm) {
            setError("Passwords didn't matched");
            return;
        }

        createUser(email, password)
            .then(res => {
                const user = res.user;
                console.log(user);
                form.reset();
            })
            .catch(err => {
                setError(err.message);
                console.error(err);
            })
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Signup</h2>
            <form onSubmit={handleSubmit} className='input-container'>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" />
                </div>
                <input className='btn-submit' type="submit" value="Signup" />
                <p>Already have an account? <Link to="/login">Log In</Link></p>
                <p className='text-error'>{error}</p>
            </form>
        </div>
    );
};

export default Signup;