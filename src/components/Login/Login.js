import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import "./Login.css";

const Login = () => {

    const { signIn } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = event => {
        event.preventDefault();
        setError(null);

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(res => {
                const user = res.user;
                console.log(user);
                form.reset();
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
            })
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleSubmit} className='input-container'>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                </div>
                <input className='btn-submit' type="submit" value="Login" />
                <p>New to Ema John? <Link to="/signup">Create New Account</Link></p>
                <p className='text-error'>{error}</p>
            </form>
        </div>
    );
};

export default Login;