import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import logo from '../../images/Logo.svg';
import './Header.css';

const Header = () => {

    const { user, logOut } = useContext(AuthContext);
    const navLinks = ['Shop', 'Orders', 'Inventory', 'About'];

    return (
        <div>
            <nav className='header'>
                <img src={logo} alt="logo" />
                <div>
                    {
                        navLinks.map((navLink, idx) => <NavLink
                            key={idx}
                            to={navLink.toLowerCase()}
                            style={({ isActive }) =>
                                isActive ? { color: 'orange' } : undefined
                            }
                        >{navLink}</NavLink>)
                    }
                    {
                        user?.uid ?
                            <>
                                <button onClick={logOut}>Log Out</button>
                            </>
                            :
                            <>
                                <NavLink to="/login" style={({ isActive }) =>
                                    isActive ? { color: 'orange' } : undefined
                                }>Log In</NavLink>

                                <NavLink to="/signup" style={({ isActive }) =>
                                    isActive ? { color: 'orange' } : undefined
                                }>Sign Up</NavLink>
                            </>
                    }
                </div>
            </nav>
        </div>
    );
};

export default Header;