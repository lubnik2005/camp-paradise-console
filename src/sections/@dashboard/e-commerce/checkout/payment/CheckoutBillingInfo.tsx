// @mui
import { Card, Button, Typography, CardHeader, CardContent } from '@mui/material';
// @types
import { ICheckoutBillingAddress } from '../../../../../@types/product';
// components
import Iconify from '../../../../../components/iconify';
import { useAuthContext } from "../../../../../auth/useAuthContext";

// ----------------------------------------------------------------------

type Props = {
    billing: ICheckoutBillingAddress | null;
    onBackStep: VoidFunction;
};

export default function CheckoutBillingInfo({ billing, onBackStep }: Props) {
    const { user } = useAuthContext();
    return (
        <Card sx={{ mb: 3 }}>
            <CardHeader title="User Info" />
            <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                    {user?.first_name}&nbsp;{user?.last_name}&nbsp;
                </Typography>

                <Typography variant="body2" >
                    {user?.email}
                </Typography>
            </CardContent>
        </Card>
    );
}
