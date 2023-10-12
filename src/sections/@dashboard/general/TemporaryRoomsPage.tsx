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
  Typography,
} from '@mui/material';
import { Link as RouterLink, useParams, useLocation, useNavigate } from 'react-router-dom';
// utils
import axios from '../../../utils/axios';
import localStorageAvailable from '../../../utils/localStorageAvailable';
// navigate
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// _mock_

// components
import { useSettingsContext } from '../../../components/settings';
// sections
import { AppWelcome } from './app';

import { Camp } from '../../../@types/camp';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';

// assets

// ----------------------------------------------------------------------

export default function TemporaryRoomsPage({ title, query }: { title: string; query: string }) {
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { campId } = useParams();
  const [rooms, setRooms] = useState<Array<Room> | undefined>();
  const [camp, setCamp] = useState<Camp | undefined>();

  const getRooms = useCallback(async () => {
    try {
      const response = await axios.get(`rooms?event_id=${campId}`);
      console.log(response);
      setRooms(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [campId]);

  const getCamps = useCallback(async () => {
    try {
      const { data } = await axios.get('/events');
      const find = data.find((c: Camp) => c.id === parseInt(campId ?? '', 10));
      setCamp(find);
      if (!find) navigate(PATH_DASHBOARD.general.camps);
    } catch (error) {
      console.log(error);
    }
    if (!campId) navigate(PATH_DASHBOARD.general.camps);
  }, [campId, navigate]);

  interface Room {
    id: number;
    type: string;
    name: string;
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
        <title> {title} | Camp Paradise</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            {camp ? (
              <AppWelcome
                title={camp.name}
                registrationDates={`${camp.start_on.slice(0, 10).replace(/-/g, '/')} — ${camp.end_on
                  .slice(0, 10)
                  .replace(/-/g, '/')}`}
                img={
                  <Box sx={{ display: { xs: 'none', md: 'inherit' } }}>
                    <img
                      alt="undraw_into_the_night_vumi"
                      style={{
                        padding: '1.2em',
                        width: 360,
                      }}
                      src="/assets/undraw_into_the_night_vumi.svg"
                    />
                  </Box>
                }
                action={
                  <CustomBreadcrumbs
                    links={[
                      { name: 'All camps', href: PATH_DASHBOARD.general.camps },
                      { name: camp.name, href: PATH_DASHBOARD.general.buildings(camp.id) },
                      { name: title },
                    ]}
                  />
                }
              />
            ) : (
              <LoadingScreen />
            )}
          </Grid>
          <Grid item xs={12} md={12}>
            <Box sx={{ width: '100%' }}>
              <nav aria-label="main mailbox folders">
                {camp && rooms !== undefined ? (
                  rooms
                    .filter((room: Room) => room.type === query)
                    .map((room: Room) => (
                      <List key={`room-${room.id}`}>
                        <ListItem>
                          <ListItemButton
                            component={RouterLink}
                            to={PATH_DASHBOARD.general.cots(camp.id, room.id)}
                          >
                            <ListItemIcon />
                            <ListItemText primary={room.name} />
                          </ListItemButton>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </List>
                    ))
                ) : (
                  <LoadingScreen />
                )}
                {camp &&
                rooms !== undefined &&
                rooms.filter((room: Room) => room.type === query).length === 0 ? (
                  <Grid item xs={12} md={12}>
                    <Typography variant="h4">Not Available</Typography>
                  </Grid>
                ) : null}
              </nav>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
