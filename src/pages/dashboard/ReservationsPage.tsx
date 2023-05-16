import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import {
    Grid,
    Container,
    Card,
    CardHeader,
    CardContent,
    TableContainer,
    Table,
    TableBody,
    Divider,
    TableRow,
    MenuItem,
    TableCell,
    Link,
    Typography
} from '@mui/material';
import Scrollbar from '../../components/scrollbar';
import { TableHeadCustom } from '../../components/table';
// react
import { useEffect, useState, useCallback } from 'react';
// _mock_
// components
import { useSettingsContext } from '../../components/settings';
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

export default function ReservationsPage() {
    const theme = useTheme();

    const { themeStretch } = useSettingsContext();

    const [reservations, setReservations] = useState<any[] | null>(null);
    const fetchReservations = useCallback(async () => {
        try {
            const { data } = await axios.get(`/reservations`)
            setReservations(data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchReservations();
    }, [fetchReservations]);


    return (
        <>
            <Helmet>
                <title> Reservations | Camp Paradise</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card >
                            <CardHeader title='Reservations' subheader='View Current and Past Reservations' sx={{ mb: 3 }} />

                            <TableContainer sx={{ overflow: 'unset' }}>
                                <Scrollbar>
                                    <Table sx={{ minWidth: 960 }}>
                                        <TableHeadCustom headLabel={[
                                            { id: 'first_name', label: 'First Name' },
                                            { id: 'last_name', label: 'Last Name' },
                                            { id: 'price', label: 'Price' },
                                            { id: 'event', label: 'Event' },
                                            { id: 'room', label: 'Room' },
                                            { id: 'cot', label: 'Cot' },
                                            { id: 'created_at', label: 'Date Purchased' },
                                        ]} />

                                        <TableBody>
                                            {reservations !== null && reservations.map((row) => (
                                                <ReservationDetailsRow key={row.id} row={row} />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Scrollbar>
                            </TableContainer>

                            <Divider />
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );

}

// ----------------------------------------------------------------------

type RowProps = {
    first_name: string;
    last_name: string;
    event: { id: number, name: string };
    room: { id: number, name: string };
    cot: { id: number, description: string };
    price: number;
    created_at: string;
}

type ReservationDetailsRowProps = {
    row: RowProps;
};

function ReservationDetailsRow({ row }: ReservationDetailsRowProps) {
    const theme = useTheme();

    const isLight = theme.palette.mode === 'light';

    return (
        <>
            <TableRow>
                <TableCell>
                    {row.first_name}
                </TableCell>
                <TableCell>
                    {row.last_name}
                </TableCell>
                <TableCell>
                    ${row.price / 100}
                </TableCell>
                <TableCell>
                    {row.event.name}
                </TableCell>
                <TableCell>
                    {row.room.name}
                </TableCell>
                <TableCell>
                    {row.cot.description}
                </TableCell>
                <TableCell>
                    {row.created_at.substr(0, 10)}
                </TableCell>
            </TableRow>
        </>
    );
}

