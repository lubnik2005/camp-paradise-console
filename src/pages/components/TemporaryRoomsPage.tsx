import { Helmet } from 'react-helmet-async';
// @mui
import { useEffect, useState, useCallback } from 'react';
import LoadingScreen from 'src/components/loading-screen';
import {
    Container,
    Grid,
    Box,
    List,
    Divider,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemButton,

} from '@mui/material';
import { Link as RouterLink, useParams, useLocation, useNavigate } from 'react-router-dom';
// utils
import axios from '../../utils/axios';
import localStorageAvailable from '../../utils/localStorageAvailable';
// navigate
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// _mock_


// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
    AppWelcome,
} from '../../sections/@dashboard/general/app';

import { Camp } from '../../@types/camp';


// assets

// ----------------------------------------------------------------------

export default function TemporaryRoomsPage({ title, query }: { title: string, query: string }) {
    const { user } = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();
    const { campId } = useParams();
    const [rooms, setRooms] = useState<Array<Room> | undefined>();
    const [camp, setCamp] = useState<Camp | undefined>();
    const storageAvailable = localStorageAvailable();

    const getRooms = useCallback(async () => {
        try {
            const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
            const response = await axios.get(`rooms?token=${accessToken}&event_id=${campId}`)
            console.log(response);
            setRooms(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [storageAvailable, campId]);

    const getCamps = useCallback(async () => {
        try {
            const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
            const { data } = await axios.get(`/upcoming_events?token=${accessToken}`)
            const find = data.find((c: Camp) => c.id === parseInt(campId ?? '', 10));
            setCamp(find);
            if (!find) navigate(PATH_DASHBOARD.general.camps);
        } catch (error) {
            console.log(error);
        }
        if (!campId) navigate(PATH_DASHBOARD.general.camps)
    }, [storageAvailable, campId, navigate]);

    interface Room {
        id: number,
        type: string,
        name: string,
    }

    const { themeStretch } = useSettingsContext();

    useEffect(() => {
        getRooms();
    }, [getRooms, campId]);

    useEffect(() => {
        getCamps();
    }, [getCamps, campId]);


    if (!campId) navigate(PATH_DASHBOARD.general.camps);
    return (
        <>
            <Helmet>
                <title> General: App | Minimal UI</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} >
                        {camp ? <AppWelcome
                            title={camp.name}
                            description={`${camp.start_on.slice(0, 10).replace(/-/g, '/')} — ${camp.end_on.slice(0, 10).replace(/-/g, '/')}`}
                            img={<img
                                alt="undraw_into_the_night_vumi"
                                style={{
                                    padding: '1.2em',
                                    width: 360,
                                }}
                                src="/assets/undraw_into_the_night_vumi.svg" />}
                            action={<>{title}</>}
                        /> : <LoadingScreen />}
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Box sx={{ width: '100%' }}>
                            <nav aria-label="main mailbox folders">
                                {camp && rooms !== undefined ? rooms.filter((room: Room) => room.type === query).map((room: Room) =>
                                    <List key={`room-${room.id}`}>
                                        <ListItem>
                                            <ListItemButton component={RouterLink} to={PATH_DASHBOARD.general.cots(camp.id, room.id)} >
                                                <ListItemIcon />
                                                <ListItemText primary={room.name} />
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </List>) : <LoadingScreen />}
                            </nav>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
