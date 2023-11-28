// @mui
import { Link, Button, Divider, Typography, Stack, DialogProps } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// components
import Iconify from '../../../../components/iconify';
import { DialogAnimate } from '../../../../components/animate';
// assets
import { OrderCompleteIllustration } from '../../../../assets/illustrations';
import { IProductCheckoutState } from '../../../../@types/product';
import { PATH_DASHBOARD } from 'src/routes/paths';

import { REPLY_CONTACT_EMAIL } from '../../../../config-global';

// ----------------------------------------------------------------------

interface Props extends DialogProps {
    onReset: VoidFunction;
    onDownloadPDF: VoidFunction;
    checkout: IProductCheckoutState;
}

export default function CheckoutOrderComplete({ open, onReset, checkout, onDownloadPDF }: Props) {
    const { cart } = checkout;
    return (
        <DialogAnimate
            fullScreen
            open={open}
            PaperProps={{
                sx: {
                    maxWidth: { md: 'calc(100% - 48px)' },
                    maxHeight: { md: 'calc(100% - 48px)' },
                },
            }}
        >
            <Stack
                spacing={5}
                sx={{
                    m: 'auto',
                    maxWidth: 480,
                    textAlign: 'center',
                    px: { xs: 2, sm: 0 },
                }}
            >
                <Typography variant="h4">Thank you for your purchase!</Typography>

                {/* <OrderCompleteIllustration sx={{ height: 260 }} /> */}

                <Typography>
                    Thanks for placing your order:
                    <br />
                    <br />
                    {cart.map((product) => <>
                        <Link component={RouterLink} target="_blank" to={PATH_DASHBOARD.general.reservations}>{product.name}</Link><br />
                    </>)}
                    <br />
                    <br />
                    <br />
                    All the best,<br />
                    Camp Paradise Team
                </Typography>
                <Divider sx={{ borderStyle: 'dashed' }} />
                <Stack
                    spacing={2}
                    justifyContent="space-between"
                    direction={{ xs: 'column-reverse', sm: 'row' }}
                >
                    <Button
                        fullWidth
                        size="large"
                        color="inherit"
                        variant="outlined"
                        onClick={onReset}
                        startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                    >
                        Back to Camps
                    </Button>
                </Stack>
                <Typography
                    variant="caption"
                    color="text.disabled" >
                    <br />
                    You should receive an email with a receipt of your purchase.
                    <br />
                    You should also now see your reserved spot
                    on the reservations page. Depending on the event, you may not be able to purchase any more spots.
                    <br /> If you have any questions or if you did not receive an email and/or you cannot
                    see your purchase on the reservations please contact us: <a href={`mailto:${REPLY_CONTACT_EMAIL}`} target="_blank">{REPLY_CONTACT_EMAIL}</a><br /><br />
                </Typography>
            </Stack>
        </DialogAnimate >
    );
}
