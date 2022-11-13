import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { ToggleButton, ToggleButtonGroup } from 'ui-neumorphism'
import Icon from '@mdi/react';
import {
    mdiHome,
    mdiTextBoxOutline,
    mdiAccount,
    mdiLogout,
    mdiTent
} from '@mdi/js'

const Footer = () => {
    const { user, logoutUser } = useContext(AuthContext)
    const location = useLocation();
    const [path, setPath] = useState(location.pathname);
    const navigate = useNavigate()

    const handleStandaloneChange = (e, path2) => {
        setPath(path2);
        console.log("ATH");
        console.log(path2);
    }
    console.log(path);
    let dark = false;
    return user ?
        (<ToggleButtonGroup
            value={path}
            className='fitness-app-nav-bar'>
            <ToggleButton
                value="/camps"
                onChange={(e) => handleStandaloneChange(e, '/camps')}
                selected={path === '/camps'}
                dark={dark}
                onClick={() => navigate('/camps')}
            >
                <Icon path={mdiTent} size={0.9} />
            </ToggleButton >
            <ToggleButton
                value="/"
                onChange={(e) => handleStandaloneChange(e, '/guidelines')}
                selected={path === '/guidelines'}
                dark={dark}
                onClick={() => navigate('/guidelines')}>
                <Icon path={mdiTextBoxOutline} size={0.8} />
            </ToggleButton>
            <ToggleButton
                value="/account"
                onChange={(e) => handleStandaloneChange(e, '/account')}
                selected={path === '/account'}
                dark={dark}
                onClick={() => navigate('/account')}>
                <Icon path={mdiAccount} size={0.9} />
            </ToggleButton>
            <ToggleButton
                value="/logout"
                onChange={(e) => handleStandaloneChange(e, '/')}
                selected={path === '/'}
                dark={dark}
                onClick={logoutUser}>
                <Icon path={mdiLogout} size={0.8} />
            </ToggleButton>
        </ToggleButtonGroup >) : <></>
}

export default Footer 
