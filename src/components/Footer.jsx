import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { ToggleButton, ToggleButtonGroup } from 'ui-neumorphism'
import map from '../map.jpeg'
import TextBoxOutlineIcon from '~icons/mdi/text-box-outline'
import AccountIcon from '~icons/mdi/account'
import LogoutIcon from '~icons/mdi/logout'
import MapIcon from '~icons/mdi/map'
import TentIcon from '~icons/mdi/tent'

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
                    <TentIcon style={{ fontSize: '2em' }} />
                </ToggleButton >
                <ToggleButton
                    value="/"
                    onChange={(e) => handleStandaloneChange(e, '/guidelines')}
                    selected={path === '/guidelines'}
                    dark={dark}
                    onClick={() => navigate('/guidelines')}>
                    <TextBoxOutlineIcon style={{ fontSize: '2em' }} />
                </ToggleButton>
                <ToggleButton
                    value="/map"
                    onClick={() => setMapVisible(!mapVisible)}
                    dark={dark}>
                    <MapIcon style={{ fontSize: '2em' }} />
                </ToggleButton>
                <ToggleButton
                    value="/account"
                    onChange={(e) => handleStandaloneChange(e, '/account')}
                    selected={path === '/account'}
                    dark={dark}
                    onClick={() => navigate('/account')}>
                    <AccountIcon style={{ fontSize: '2em' }} />
                </ToggleButton>
                <ToggleButton
                    value="/logout"
                    onChange={(e) => handleStandaloneChange(e, '/')}
                    selected={path === '/'}
                    dark={dark}
                    onClick={logoutUser}>
                    <LogoutIcon style={{ fontSize: '2em' }} />
                </ToggleButton>
            </ToggleButtonGroup >
        </>) : <></>
}

export default Footer 
