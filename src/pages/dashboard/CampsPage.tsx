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
import axios from "../../utils/axios";
// _mock_


// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
    AppWelcome,
} from '../../sections/@dashboard/general/app';
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

    type CampAgreement = {
        campId: string,
        acceptedOn: string | null
    }

    let guidelinesAgreements: CampAgreement[] = [];
    try {
        guidelinesAgreements = JSON.parse(storageAvailable ? localStorage.getItem('guidelineAgreements') ?? '[]' : '[]');
    } catch {
    }

    const getCamps = useCallback(async () => {
        try {
            const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
            const response = await axios.get(`/events?token=${accessToken}`)
            setCamps(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [storageAvailable]);

    useEffect(() => {
        getCamps();
    }, [getCamps]);


    const DisplayButton = ({ camp }: { camp: Camp }) => {
        if (!guidelinesAgreements.find((agreement: CampAgreement) => agreement.campId === camp.id.toString() && !!agreement.acceptedOn)) {
            return <Button component={RouterLink} to={PATH_DASHBOARD.general.camp_guidelines(camp.id)} variant="contained">
                Read and Accept Guidelines To Register
            </Button>
        }
        return camp.reservations.length < 1 ?
            <Button component={RouterLink} to={PATH_DASHBOARD.general.buildings(camp.id)} variant="contained">Register</Button>
            : <Button component={RouterLink} to={PATH_DASHBOARD.general.buildings(camp.id)} variant="contained">View</Button>;
    }

    return (camps ?
        <>
            <Helmet>
                <title>Camps | Camp Paradise</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid container spacing={3}>
                    {camps != null ? camps.map((camp: Camp) => <Grid
                        key={`upcoming-camp-${camp.id}`}
                        item
                        xs={12}
                        md={12} >
                        <AppWelcome
                            style={{ padding: '3em' }}
                            title={camp.name}
                            description={`${camp.start_on.slice(0, 10).replace(/-/g, '/')} — ${camp.end_on.slice(0, 10).replace(/-/g, '/')}`}
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
                    </Grid>) : <LoadingScreen />}
                    {camps !== null && camps.length === 0 ? <Grid item
                        xs={12}
                        md={12} >
                        <Typography variant="h3" >No Camps Yet</Typography>
                    </Grid> : null}
                </Grid>
            </Container>
        </> : null);
}
