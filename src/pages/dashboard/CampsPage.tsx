// react
import { useEffect, useState, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Button, Typography } from '@mui/material';
// routes
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { PATH_DASHBOARD } from '../../routes/paths';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// axios
import axios from '../../utils/axios';
// _mock_
import AXIOS from 'axios';

// components
import { useSettingsContext } from '../../components/settings';
// sections
import { AppWelcome } from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets/illustrations';
// storage
import localStorageAvailable from '../../utils/localStorageAvailable';
import { Camp } from '../../@types/camp';
// ----------------------------------------------------------------------

export default function CampsPage() {
  const { user } = useAuthContext();

  const storageAvailable = localStorageAvailable();

  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  const [camps, setCamps] = useState<Array<Camp> | undefined>();
  const [upcomingCamps, setUpcomingCamps] = useState<Array<Camp> | undefined>();
  const [previousCamps, setPreviousCamps] = useState<Array<Camp> | undefined>();

  type CampAgreement = {
    campId: string;
    acceptedOn: string | null;
    userId: string | null;
  };

  let guidelinesAgreements: CampAgreement[] = [];
  try {
    guidelinesAgreements = JSON.parse(
      storageAvailable ? localStorage.getItem('guidelineAgreements') ?? '[]' : '[]'
    );
  } catch {}

  const getCamps = useCallback(async () => {
    try {
      const { data: events } = await axios.get('/current_events');
      const { data: upcoming } = await axios.get('/upcoming_events');
      const { data: previous } = await axios.get('/previous_events');
      setCamps(events);
      setUpcomingCamps(upcoming);
      setPreviousCamps(previous);
    } catch (error) {
      console.log(error);
    }
  }, [storageAvailable]);

  useEffect(() => {
    getCamps();
  }, [getCamps]);

  const DisplayButton = ({ camp }: { camp: Camp }) => {
    if (
      !guidelinesAgreements.find(
        (agreement: CampAgreement) =>
          agreement.campId === camp.id.toString() &&
          !!agreement.acceptedOn &&
          agreement.userId === user?.id.toString()
      )
    ) {
      return (
        <Button
          component={RouterLink}
          to={PATH_DASHBOARD.general.camp_guidelines(camp.id)}
          variant="contained"
        >
          Read and Accept Guidelines To Register
        </Button>
      );
    }
    return camp.reservations?.length < 1 ? (
      <Button
        component={RouterLink}
        to={PATH_DASHBOARD.general.buildings(camp.id)}
        variant="contained"
      >
        Register
      </Button>
    ) : (
      <Button
        component={RouterLink}
        to={PATH_DASHBOARD.general.buildings(camp.id)}
        variant="contained"
      >
        View
      </Button>
    );
  };

  const timeToReadble = (dateStr: string) => {
    const dateObj = new Date(dateStr);
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // months from 1-12, add 1 because getMonth() is 0-based
    const day = String(dateObj.getUTCDate()).padStart(2, '0');
    const year = dateObj.getUTCFullYear();
    return `${month}/${day}/${year}`;
  };

  return camps ? (
    <>
      <Helmet>
        <title>Camps | Camp Paradise</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography paragraph variant="h4" sx={{ whiteSpace: 'pre-line' }}>
          Current Camps
        </Typography>
        <Grid container spacing={3}>
          {camps != null ? (
            camps.map((camp: Camp) => (
              <Grid key={`current-camp-${camp.id}`} item xs={12} md={12}>
                <AppWelcome
                  style={{ padding: '3em' }}
                  title={camp.name}
                  campDates={`${timeToReadble(camp.start_on)}—${timeToReadble(camp.end_on)}`}
                  registrationDates={`${timeToReadble(camp.registration_start_at)}—${timeToReadble(
                    camp.registration_end_at
                  )}`}
                  // img={
                  //     <SeoIllustration
                  //         sx={{
                  //             p: 3,
                  //             width: 360,
                  //         }}
                  //     />
                  // }
                  action={<DisplayButton camp={camp} />}
                />
              </Grid>
            ))
          ) : (
            <LoadingScreen />
          )}
          {camps !== null && camps.length === 0 ? (
            <Grid item xs={12} md={12}>
              <Typography variant="h3">No Camps Yet</Typography>
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </>
  ) : null;
}
