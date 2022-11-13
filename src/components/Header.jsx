import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
    let { user, logoutUser } = useContext(AuthContext)
    return (
        <div>
            {user ? (
                <div>
                    <Link to="/" >Camp Paradise</Link>
                    <Link to="/account">Account</Link>
                    <div onClick={logoutUser}>Logout</div>
                </div>
            ) : (<></>)}
        </div>
    )
}

export default Header
