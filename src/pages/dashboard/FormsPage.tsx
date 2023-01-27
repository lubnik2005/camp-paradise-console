import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
// react
import { useEffect, useState, useCallback } from 'react';
// _mock_
import { _bookingNew, _bookingsOverview, _bookingReview } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// axios
import axios from "../../utils/axios";
// sections
import {
    Forms,
    BookingBookedRoom,
    BookingTotalIncomes,
    BookingRoomAvailable,
    BookingNewestBooking,
    BookingWidgetSummary,
    BookingCheckInWidgets,
    BookingCustomerReviews,
    BookingReservationStats,
} from '../../sections/@dashboard/general/booking';
// assets
import {
    BookingIllustration,
    CheckInIllustration,
    CheckOutIllustration,
} from '../../assets/illustrations';
// storage
import localStorageAvailable from '../../utils/localStorageAvailable';

// ----------------------------------------------------------------------

export default function FormsPage() {
    const theme = useTheme();

    const { themeStretch } = useSettingsContext();
    const storageAvailable = localStorageAvailable();

    const [forms, setForms] = useState(null);
    const getForms = useCallback(async () => {
        try {
            const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
            const { data } = await axios.get(`/forms?token=${accessToken}`)
            setForms(data);
        } catch (error) {
            console.log(error);
        }
    }, [storageAvailable]);

    useEffect(() => {
        getForms();
    }, [getForms]);


    return (
        <>
            <Helmet>
                <title> General: Booking | Minimal UI</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Forms
                            title="Forms"
                            tableData={forms ?? []}
                            tableLabels={[
                                { id: 'name', label: 'Form' },
                                { id: 'required', label: 'Required' },
                                { id: 'status', label: 'Status' },
                                { id: 'completedOn', label: 'Completed On' },
                            ]}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
