import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
// sections
import AuthResendVerificationForm from '../../sections/auth/AuthResendVerificationForm';
// assets
import { PasswordIcon } from '../../assets/icons';

// ----------------------------------------------------------------------

export default function ResendVerificationPage() {
    return (
        <>
            <Helmet>
                <title> Resend Verification Page | Camp Paradise</title>
            </Helmet>

            <PasswordIcon sx={{ mb: 5, height: 96 }} />

            <Typography variant="h3" paragraph>
                Verify E-mail
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                To start using your account, please verify your email.
            </Typography>

            <AuthResendVerificationForm />

            <Link
                component={RouterLink}
                to={PATH_AUTH.login}
                color="inherit"
                variant="subtitle2"
                sx={{
                    mt: 3,
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
