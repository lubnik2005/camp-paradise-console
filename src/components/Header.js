import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
    let { user, logoutUser } = useContext(AuthContext)
    return (
        <div>
            <Link to="/" >Camp Paradise</Link>
            {user ? (
                <div>
                    <Link to="/account">Account</Link>
                    <div onClick={logoutUser}>Logout</div>
                </div>
            ) : (
                <div>
                    <Link to="/register" >Register</Link>
                    <Link to="/login" >Login</Link>
                </div>
            )}

        </div>
    )
}

export default Header
