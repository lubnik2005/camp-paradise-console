import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
    let { user, logoutUser } = useContext(AuthContext)
    return (
        <div>
            <Link to="/" >Camp Paradise</Link>
            {user ? (
                <p onClick={logoutUser}>Logout</p>
            ) : (
                <Link to="/login" >Login</Link>
            )}

            {user && <p>Hello {user.email}</p>}

        </div>
    )
}

export default Header
