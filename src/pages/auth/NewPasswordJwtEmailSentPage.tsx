import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
// sections
// assets
import { SentIcon } from '../../assets/icons';

// ----------------------------------------------------------------------

export default function NewPasswordPage() {
    return (
        <>
            <Helmet>
                <title> New Password | Camp Paradise</title>
            </Helmet>

            <SentIcon sx={{ mb: 5, height: 96 }} />

            <Typography variant="h3" paragraph>
                Request sent successfully!
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                We&apos;ve sent an email with a reset password link.
            </Typography>

            <Typography variant="body2" sx={{ my: 3 }}>
                Don’t receive an email? &nbsp;
                <Link variant="subtitle2">Resend email</Link>
            </Typography>

            <Link
                component={RouterLink}
                to={PATH_AUTH.login}
                color="inherit"
                variant="subtitle2"
                sx={{
                    mx: 'auto',
                    alignItems: 'center',
                    display: 'inline-flex',
                }}
            >
                <Iconify icon="eva:chevron-left-fill" width={16} />
                Return to sign in
            </Link>
        </>
    );
}
