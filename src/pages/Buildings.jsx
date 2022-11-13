import React, { useState, useEffect, useContext } from 'react'
import { Navigate } from "react-router-dom";
import AuthContext from '../context/AuthContext'
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";
import { ToggleButton, Card, Subtitle2, Caption, IconButton, H4, H5, H6 } from 'ui-neumorphism'
import Icon from '@mdi/react';
import {
    mdiTicket,
    mdiChevronRight,
    mdiForest,
    mdiTent,
    mdiAccountMultiple,
    mdiPodiumGold,
    mdiEarth,
    mdiHome,
    mdiBell,
    mdiAccount,
    mdiChartLine,
    mdiRun,
} from '@mdi/js'

import 'ui-neumorphism/dist/index.css'



const Buildings = () => {

    const location = useLocation();
    let { user } = useContext(AuthContext)
    const camp = location.state?.camp;
    const dark = false;

    const CampInfo = () => {

        if (!camp) return <Navigate to={'/camps'} />
        return (
            <div >
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
                                <Icon path={mdiRun} size={2.5} color='var(--primary)' />
                                <H5 style={{ padding: '4px 0px' }}>20</H5>

                                <Caption style={{ padding: '4px 0px' }} secondary>
                                    Cap: 480
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
                                <Icon path={mdiForest} size={1.5} color='var(--primary)' />
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
                                        10 spots available
                                    </Caption>
                                    <Link to={"cabins"} state={{ camp }} >
                                        <IconButton
                                            style={{ position: 'absolute', right: '10px', top: '5px' }}
                                            text={false}
                                            dark={dark}
                                            size='large'
                                            rounded
                                        >
                                            <Icon
                                                path={mdiChevronRight}
                                                size={0.7}
                                                color='var(--primary)'
                                            />
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
                                <Icon path={mdiAccountMultiple} size={1.5} color='var(--primary)' />
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
                                        10 spots available
                                    </Caption>
                                    <Link to={"cabins"} state={{ camp }} >
                                        <IconButton
                                            style={{ position: 'absolute', right: '10px', top: '5px' }}
                                            text={false}
                                            dark={dark}
                                            size='large'
                                            rounded
                                        >
                                            <Icon
                                                path={mdiChevronRight}
                                                size={0.7}
                                                color='var(--primary)'
                                            />
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
                                <Icon path={mdiPodiumGold} size={1.5} color='var(--primary)' />
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
                                        10 spots available
                                    </Caption>
                                    <Link to={"cabins"} state={{ camp }} >
                                        <IconButton
                                            style={{ position: 'absolute', right: '10px', top: '5px' }}
                                            text={false}
                                            dark={dark}
                                            size='large'
                                            rounded
                                        >
                                            <Icon
                                                path={mdiChevronRight}
                                                size={0.7}
                                                color='var(--primary)'
                                            />
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

