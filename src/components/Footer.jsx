import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { ToggleButton, ToggleButtonGroup } from 'ui-neumorphism'
import map from '../map.jpeg'
import Icon from '@mdi/react';
import {
    mdiHome,
    mdiTextBoxOutline,
    mdiAccount,
    mdiLogout,
    mdiMap,
    mdiTent
} from '@mdi/js'

const Footer = () => {
    const { user, logoutUser } = useContext(AuthContext)
    const location = useLocation();
    const [path, setPath] = useState(location.pathname);
    const [mapVisible, setMapVisible] = useState(false);
    const navigate = useNavigate();

    const handleStandaloneChange = (e, path2) => {
        setPath(path2);
        console.log("ATH");
        console.log(path2);
    }

    const Map = () => {
        return mapVisible ? (
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', minWidth: '50px', height: 'calc(100% - 70px)', overflowX: 'scroll', overflowY: 'auto'

            }
            }>
                <img style={{ height: 'calc(100% - 10px)', minWidth: '50px', minHeight: '100px', margin: '0 auto' }} src={map}></img>
            </div >
        ) : null;
    }

    let dark = false;
    console.log(mdiTextBoxOutline);
    console.log(mdiMap);
    return user ?
        (<>
            <Map />
            <ToggleButtonGroup
                value='/camps'
                className='fitness-app-nav-bar'>
                <ToggleButton
                    value={"/camps"}
                    onChange={(e) => handleStandaloneChange(e, '/camps')}
                    selected={path === '/camps'}
                    dark={dark}
                    onClick={() => navigate('/camps')}
                >
                    {/*<Icon path={typeof mdiTent === 'object' ? '' : mdiTent} size={0.9} />*/}
                </ToggleButton >
                <ToggleButton
                    value="/"
                    onChange={(e) => handleStandaloneChange(e, '/guidelines')}
                    selected={path === '/guidelines'}
                    dark={dark}
                    onClick={() => navigate('/guidelines')}>
                    {/*<Icon path={typeof mdiTextBoxOutline === 'object' ? '' : mdiTextBoxOutline} size={0.9} />*/}
                </ToggleButton>
                <ToggleButton
                    value="/map"
                    onClick={() => setMapVisible(!mapVisible)}
                    dark={dark}>
                    {/*<Icon path={typeof mdiMap === 'object' ? '' : mdiMap} size={0.9} />*/}
                </ToggleButton>
                <ToggleButton
                    value="/account"
                    onChange={(e) => handleStandaloneChange(e, '/account')}
                    selected={path === '/account'}
                    dark={dark}
                    onClick={() => navigate('/account')}>
                    {/*<Icon path={typeof mdiAccount === 'object' ? '' : mdiAccount} size={0.9} />*/}
                </ToggleButton>
                <ToggleButton
                    value="/logout"
                    onChange={(e) => handleStandaloneChange(e, '/')}
                    selected={path === '/'}
                    dark={dark}
                    onClick={logoutUser}>
                    {/*<Icon path={typeof mdiLogout === 'object' ? '' : mdiLogout} size={0.9} />*/}
                </ToggleButton>
            </ToggleButtonGroup >
        </>) : <></>
}

export default Footer 
