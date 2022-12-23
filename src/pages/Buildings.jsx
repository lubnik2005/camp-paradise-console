import React, { useState, useEffect, useContext } from 'react'
import { Navigate } from "react-router-dom";
import AuthContext from '../context/AuthContext'
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";
import { ToggleButton, Card, Subtitle2, Caption, IconButton, H4, H5, H6 } from 'ui-neumorphism'
import ChevronRightIcon from '~icons/mdi/chevron-right';
import ForestIcon from '~icons/mdi/forest';
import AccountMultipleIcon from '~icons/mdi/account-multiple';
import PodiumGoldIcon from '~icons/mdi/podium-gold';
import RunIcon from '~icons/mdi/run';
import 'ui-neumorphism/dist/index.css'



const Buildings = () => {

    const location = useLocation();
    let { user, accessToken, logoutUser } = useContext(AuthContext);
    let [capacity, setCapacity] = useState({ capacity: '', reserved: '', dorms: '', cabins: '', vip: '' });
    const camp = location.state?.camp;
    const dark = false;

    const getCapacity = async (eventId) => {
        console.log('data1');
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}capacity?token=${accessToken.accessToken}&event_id=${eventId}`);
            const data = await response.json();
            console.log(data);
            if (response.status === 200) {
                console.log('data');
                return data
            }
        }

        catch (e) { console.log(e) }
        return '';
    }
    React.useEffect(() => {
        const fetchData = async () => setCapacity(await getCapacity(camp.id));
        console.log('camp');
        console.log(camp);
        console.log(!!camp?.id);
        if (!!camp?.id) fetchData();
    }, []);

    const CampInfo = () => {

        if (!camp) return <Navigate to={'/camps'} />
        return (
            <div className="content">
                <span >
                    <H4 dark={dark} style={{ fontWeight: '500' }}>
                        {camp.name}
                    </H4>
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Card
                            dark={dark}
                            elevation={3}
                            style={{
                                display: 'flex',
                                marginTop: '32px',
                                width: '194px',
                                height: '194px',
                                borderRadius: '150px',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Card flat
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column'
                                }}
                            >
                                <RunIcon style={{ fontSize: '10em', color: 'var(--primary)' }} />
                                <H5 style={{ padding: '4px 0px' }}>{capacity.reserved}</H5>

                                <Caption style={{ padding: '4px 0px' }} secondary>
                                    Cap: {capacity.capacity}
                                </Caption>
                            </Card>
                        </Card>
                    </div>





                    <H6 style={{ margin: '24px 0px 16px 0px' }}>Buildings</H6>
                    <Card rounded={false} elevation={2} style={{ padding: '16px', marginBottom: '1.5em', marginTop: '.5em' }
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
                                <ForestIcon style={{ fontSize: '2em', color: 'var(--primary)' }} />
                            </Card>
                            <Card

                                flat
                                dark={dark}
                                style={{ marginLeft: '12px', overflow: 'unset' }}
                            >
                                <Subtitle2 style={{ margin: '0px 0px' }}>
                                    Cabins
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
                                        {capacity.cabins} spots available (int total)
                                    </Caption>
                                    <Link to={"cabins"} state={{ camp }} >
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

                    <Card rounded={false} elevation={2} style={{ padding: '16px', marginBottom: '1.5em', marginTop: '.5em' }
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
                                <AccountMultipleIcon style={{ fontSize: '2em', color: 'var(--primary)' }} />
                            </Card>
                            <Card

                                flat
                                dark={dark}
                                style={{ marginLeft: '12px', overflow: 'unset' }}
                            >
                                <Subtitle2 style={{ margin: '0px 0px' }}>
                                    Dorms
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
                                        {capacity.dorms} spots available (in total)
                                    </Caption>
                                    <Link to={"dorm"} state={{ camp }} >
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

                    <Card rounded={false} elevation={2} style={{ padding: '16px', marginBottom: '1.5em', marginTop: '.5em' }
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
                                <PodiumGoldIcon style={{ fontSize: '2em', color: 'var(--primary)' }} />
                            </Card>
                            <Card

                                flat
                                dark={dark}
                                style={{ marginLeft: '12px', overflow: 'unset' }}
                            >
                                <Subtitle2 style={{ margin: '0px 0px' }}>
                                    VIP
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
                                        {capacity.vips} spots available (in total)
                                    </Caption>
                                    <Link to={"cabins"} state={{ camp }} >
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

                </span >
            </div >
        )
    }


    return (
        <div className="container">
            <CampInfo />
        </ div>
    );
}

export default Buildings;

