// @mui
import {
    Box,
    Card,
    Stack,
    Button,
    Divider,
    TextField,
    CardHeader,
    Typography,
    CardContent,
    InputAdornment,
    Link
} from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
    total: number;
    discount?: number;
    subtotal: number;
    shipping?: number;
    onEdit?: VoidFunction;
    enableEdit?: boolean;
    onApplyDiscount?: (discount: number) => void;
    enableDiscount?: boolean;
};

export default function CheckoutSummary({
    total,
    onEdit,
    discount,
    subtotal,
    shipping,
    onApplyDiscount,
    enableEdit = false,
    enableDiscount = false,
}: Props) {
    const displayShipping = shipping !== null ? 'Free' : '-';

    return (
        <Card sx={{ mb: 3 }}>
            <CardHeader
                title="Order Summary"
                action={
                    enableEdit && (
                        <Button size="small" onClick={onEdit} startIcon={<Iconify icon="eva:edit-fill" />}>
                            Edit
                        </Button>
                    )
                }
            />

            <CardContent>
                <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Sub Total
                        </Typography>
                        <Typography variant="subtitle2">{fCurrency(subtotal)}</Typography>
                    </Stack>
                    {/*
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Discount
            </Typography>
            <Typography variant="subtitle2">{discount ? fCurrency(-discount) : '-'}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Shipping
            </Typography>
            <Typography variant="subtitle2">
              {shipping ? fCurrency(shipping) : displayShipping}
            </Typography>
          </Stack>
        */}

                    <Divider />

                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="subtitle1">Total</Typography>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                                {fCurrency(total)}
                            </Typography>
                            <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                                By making this purchase you are agreeing to <Link target="_blank" to={PATH_DASHBOARD.general.guidelines} component={RouterLink}>Camp Guidelines</Link>
                            </Typography>
                        </Box>
                    </Stack>

                    {enableDiscount && onApplyDiscount && (
                        <TextField
                            fullWidth
                            placeholder="Discount codes / Gifts"
                            // value="DISCOUNTS"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button onClick={() => onApplyDiscount(0)} sx={{ mr: -0.5 }}>
                                            Apply
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}
