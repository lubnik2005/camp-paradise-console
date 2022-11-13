import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthContext'
import { ToggleButton, Card, Subtitle2, Caption, IconButton, H4 } from 'ui-neumorphism'
import Icon from '@mdi/react';
import {
    mdiTicket,
    mdiChevronRight,
    mdiTent,
    mdiEarth,
    mdiHome,
    mdiBell,
    mdiAccount,
    mdiChartLine,
} from '@mdi/js'

import 'ui-neumorphism/dist/index.css'


const Camps = () => {

    const [upcomingCamps, setUpcomingCamps] = useState(localStorage.getItem('upcomingCamps') && JSON.parse(localStorage.getItem('upcomingCamps')).status != "Token is Invalid" ? JSON.parse(localStorage.getItem('upcomingCamps')) : []);
    const [previousCamps, setPreviousCamps] = useState(localStorage.getItem('upcomingCamps') && JSON.parse(localStorage.getItem('upcomingCamps')).status != "Token is Invalid" ? JSON.parse(localStorage.getItem('previousCamps')) : []);
    let { user, accessToken, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate();

    const getCamps = async (accessToken, time = null) => {
        // Should be in a separate file, but I'm too dumb to figure out 
        // how to make that clean.
        try {
            const response = await fetch(import.meta.env.VITE_APP_API_URL + `${time ? `${time}_` : ""}events` + `?token=${accessToken}`);
            const data = await response.json();
            if (response.status === 200) {
                console.log("second");
                localStorage.setItem(`${time}Camps`, JSON.stringify(data));
                return data
            }
            if (response["status"] === "Token is Invalid") return [];
            return [];
        }
        catch (e) {
            return [];
        }
    }

    const dark = false;
    React.useEffect(() => {
        const fetchDataU = async () => setUpcomingCamps((await getCamps(accessToken?.accessToken, 'upcoming')) ?? []);
        const fetchDataP = async () => setPreviousCamps((await getCamps(accessToken?.accessToken, 'previous')) ?? []);
        fetchDataU();
        fetchDataP();
    }, [accessToken])

    const UpcomingCamps = () => {
        console.log(upcomingCamps);
        return upcomingCamps ? upcomingCamps.map(camp =>
            <Card key={`upcoming-camp-${camp.id}`} rounded={false} elevation={2} style={{ padding: '16px', marginBottom: '1.5em', marginTop: '.5em' }
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
                        <Icon path={typeof mdiTent === 'object' ? '' : mdiTent} size={1.5} color='var(--primary)' />
                    </Card>
                    <Card

                        flat
                        dark={dark}
                        style={{ marginLeft: '12px', overflow: 'unset' }}
                    >
                        <Subtitle2 style={{ margin: '0px 0px' }}>
                            {camp.name}
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
                                {camp.start_on.slice(0, 10)} - {camp.end_on.slice(0, 10)}
                            </Caption>
                            <Link to={"/buildings"} key={`camp-${camp.id}`} state={{ camp }}>
                                <IconButton
                                    style={{ position: 'absolute', right: '10px', top: '5px' }}
                                    text={false}
                                    dark={dark}
                                    size='large'
                                    rounded
                                >
                                    <Icon
                                        path={typeof mdiChevronRight === 'object' ? '' : mdiChevronRight}
                                        size={0.7}
                                        color='var(--primary)'
                                    />
                                </IconButton>
                            </Link>
                        </Card>
                    </Card>
                </div>
            </Card >
        ) : null
    }

    const PreviousCamps = () => previousCamps ? previousCamps.map(camp => (
        <Card
            key={`camp-${camp.id}`}
            rounded={false} elevation={2} style={{ padding: '16px', marginBottom: '1.5em', marginTop: '.5em' }}>
            <div
                style={{
                    display: 'flex'
                }}
            >
                <Card
                    outlined
                    dark={dark}
                    style={{ padding: '4px', width: '46px', height: '46px' }}
                >
                    <Icon path={typeof mdiEarth === 'object' ? '' : mdiEarth} size={1.5} color='var(--primary)' />
                </Card>
                <Card

                    flat
                    dark={dark}
                    style={{ marginLeft: '12px', overflow: 'unset' }}
                >
                    <Subtitle2 style={{ margin: '0px 0px' }}>
                        {camp.name}
                    </Subtitle2>
                    <Card flat style={{
                        display: 'flex', overflow: 'unset',
                        alignItems: 'center'
                    }}
                    >
                        <Caption secondary component='span'>
                            {camp.start_on.slice(0, 10)} - {camp.end_on.slice(0, 10)}
                        </Caption>
                    </Card>
                </Card>
            </div>
        </Card>

    )) : null

    return (
        <div >
            <span >
                <H4 dark={dark} style={{ fontWeight: '500' }}>
                    Upcoming Camps
                </H4>
                <UpcomingCamps />
                <H4 dark={dark} style={{ fontWeight: '500' }}>
                    Previous Camps
                </H4>
                <PreviousCamps />
            </span>
        </div>
    );
}

export default Camps;