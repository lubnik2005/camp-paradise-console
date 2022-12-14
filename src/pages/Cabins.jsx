import React, { useState, useEffect, useContext } from "react";
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthContext'
import { Outlet, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { ToggleButton, Card, Subtitle2, Caption, IconButton, H4, H5, H6 } from 'ui-neumorphism'
import ChevronRightIcon from '~icons/mdi/chevron-right';
import TentIcon from '~icons/mdi/tent';


const Cabins = () => {

    const [rooms, setRooms] = useState(localStorage.getItem('rooms') ? JSON.parse(localStorage.getItem('rooms')) : []);
    let { user, accessToken, logoutUser } = useContext(AuthContext);
    const location = useLocation();
    const camp = location.state?.camp;


    const getRooms = async (eventId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}rooms?token=${accessToken.accessToken}&event_id=${eventId}`);
            const data = await response.json();
            if (response.status === 200) {
                localStorage.setItem(`rooms`, JSON.stringify(data));
                return data
            }
        }

        catch (e) { }
        return [];
    }
    React.useEffect(() => {
        const fetchData = async () => setRooms(await getRooms(camp.id));
        if (camp) fetchData();
    }, []);

    if (!camp) return <Navigate to={'/camps'} />

    const dark = false;


    const Rooms = () => {
        return rooms ? rooms.map(room =>
            <Card key={`upcoming-camp-${room.id}`} rounded={false} elevation={2} style={{ padding: '16px', marginBottom: '1.5em', marginTop: '.5em' }
            }>
                <div
                    style={{
                        display: 'flex',
                        position: 'relative'
                    }}
                >
                    <Card
                        outlined
                        dark={dark}
                        style={{ padding: '4px', width: '46px', height: '46px' }}
                    >
                        <TentIcon style={{ fontSize: '2em', color: 'var(--primary)' }} />
                    </Card>
                    <Card

                        flat
                        dark={dark}
                        style={{ marginLeft: '12px', overflow: 'unset' }}
                    >
                        <Subtitle2 style={{ margin: '0px 0px' }}>
                            {room.name}
                        </Subtitle2>
                        <Card
                            flat
                            style={{
                                display: 'flex',
                                overflow: 'unset',
                                alignItems: 'center',
                            }}
                        >
                            <Caption secondary component='span'>
                                3/4 cots filled
                            </Caption>
                            <Link key={`cabin-${room.id})}`} to="/room" state={{ camp, room }}>
                                <IconButton
                                    style={{ position: 'absolute', right: '10px', top: '5px' }}
                                    text={false}
                                    dark={dark}
                                    size='large'
                                    rounded
                                >
                                    <ChevronRightIcon style={{ fontSize: '2em', color: 'var(--primary)' }} />
                                </IconButton>
                            </Link>
                        </Card>
                    </Card>
                </div>
            </Card >
        ) : null
    }



    return (
        <div className="content" >
            <h4 align="center">{camp.name}</h4>
            <h3 align="center">Cabins</h3>
            <Rooms />
            {rooms.filter(room => room.type == 'cabin').map((room) => <Link key={`cabin-${room.id})}`} to="/room" state={{ camp, room }}>
                <div
                    align="center"
                    className="card upcoming"
                >
                    {room.name}</div>
            </Link>
            )}
        </ div>
    );
}

export default Cabins;

