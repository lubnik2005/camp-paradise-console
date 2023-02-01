import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../../components/settings';

// ----------------------------------------------------------------------
export default function BlankPage() {
    const { themeStretch } = useSettingsContext();

    return (
        <>
            <Helmet>
                <title> Map | Camp Paradise</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h6"> Map </Typography>
                <img src="/assets/images/about/camp_map_3.jpg" />
            </Container>
        </>
    );
}
