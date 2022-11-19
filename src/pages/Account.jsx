import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'
import { ToggleButton, Card, Subtitle2, Caption, IconButton, H4, H5, TextField, ListItemGroup, ListItem, Button } from 'ui-neumorphism'
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





const Account = () => {

    let { user, accessToken, logoutUser } = useContext(AuthContext)
    const dark = false;
    return (
        <div className="content">
            <H4 dark={dark} style={{ fontWeight: '500' }}>
                Account
            </H4>
            <Card elevation={1} style={{ marginTop: '10px' }}>
                <H5 dark={dark} style={{ fontWeight: '500', padding: '10px' }}>
                    Name
                </H5>
                <TextField value={user.first_name} placeholder="First Name" />
                <TextField value={user.last_name} placeholder="Last Name" />
                <TextField disabled value={user.sex == 'm' ? 'Male' : 'Female'} placeholder="Gender" />
                <TextField disabled value={user.email} placeholder="E-mail" />
                <TextField disabled value={user.created_at} placeholder="Created At" />
            </Card>
            <Card elevation={1} style={{ marginTop: '10px' }}>
                <H5 dark={dark} style={{ fontWeight: '500', padding: '10px' }}>
                    Church
                </H5>
                <ListItemGroup
                    value={'59 Street'}
                    link
                >
                    <ListItem active title={'Independent Baptist Church (Astoria)'} />
                    <ListItem title={'59 Street'} />
                    <ListItem title={'Dry Creek'} />
                    <ListItem title={'Pinedale'} />
                    <ListItem title={`Other: ${user.church}`} />
                </ListItemGroup>
            </Card>
            <Button style={{ marginTop: '10px', padding: '10px' }} >Save</Button>
            <Card elevation={1} style={{ marginTop: '10px' }}>
                <H5 dark={dark} style={{ fontWeight: '500', padding: '10px' }}>
                    Registrations
                </H5>
            </Card>
        </div>
    );
}

export default Account;
