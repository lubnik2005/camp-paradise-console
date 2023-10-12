import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  CircularProgress,
  Grid,
  Button,
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
  Typography,
} from '@mui/material';
import Scrollbar from '../../components/scrollbar';
import { TableHeadCustom } from '../../components/table';
// react
import { useEffect, useState, useCallback } from 'react';
// _mock_
// components
import { useSettingsContext } from '../../components/settings';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

export default function ReservationsPage() {
  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  const [reservations, setReservations] = useState<any[] | null>(null);
  const fetchReservations = useCallback(async () => {
    try {
      const { data } = await axios.get(`/reservations`);
      console.log('setReservations');
      console.log(data);
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
            <Card>
              <CardHeader
                title="Reservations"
                subheader="View Current and Past Reservations"
                sx={{ mb: 3 }}
              />

              <TableContainer sx={{ overflow: 'unset' }}>
                <Scrollbar>
                  <Table sx={{ minWidth: 960 }}>
                    <TableHeadCustom
                      headLabel={[
                        { id: 'first_name', label: 'First Name' },
                        { id: 'last_name', label: 'Last Name' },
                        { id: 'price', label: 'Price' },
                        { id: 'event', label: 'Event' },
                        { id: 'room', label: 'Room' },
                        { id: 'cot', label: 'Cot' },
                        { id: 'created_at', label: 'Date Purchased' },
                        { id: 'refund', label: 'Refund' },
                      ]}
                    />

                    <TableBody>
                      {reservations !== null &&
                        reservations.map((row) => (
                          <ReservationDetailsRow
                            key={row.id}
                            row={row}
                            fetchReservations={fetchReservations}
                          />
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
  event: { id: number; name: string };
  room: { id: number; name: string };
  cot: { id: number; description: string };
  price: number;
  created_at: string;
  refund: number;
  id: number;
};

type ReservationDetailsRowProps = {
  row: RowProps;
  fetchReservations: () => void;
};

function ReservationDetailsRow({ row, fetchReservations }: ReservationDetailsRowProps) {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isLight = theme.palette.mode === 'light';

  return (
    <TableRow>
      <TableCell>{row.first_name}</TableCell>
      <TableCell>{row.last_name}</TableCell>
      <TableCell>
        {(row.price / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </TableCell>
      <TableCell>{row.event.name}</TableCell>
      <TableCell>{row.room.name}</TableCell>
      <TableCell>{row.cot.description}</TableCell>
      <TableCell>{row.created_at.substr(0, 10)}</TableCell>
      <TableCell>
        {!isLoading ? (
          <Button
            onClick={async () => {
              if (!window.confirm(`Are you sure you want to to refund $${row.refund / 100}`))
                return;

              setIsLoading(true);
              try {
                const { data } = await axios.post('/refund', row);
              } catch {}
              console.log('TEMP');
              fetchReservations();
            }}
            disabled={!row.refund}
          >
            {!row.refund ? 'No ' : null}
            Refund{' '}
            {!row.refund
              ? null
              : (row.refund / 100).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
          </Button>
        ) : (
          <CircularProgress />
        )}
      </TableCell>
    </TableRow>
  );
}
