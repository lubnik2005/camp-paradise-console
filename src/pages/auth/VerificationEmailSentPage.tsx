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

export default function VerificationEmailSentPage() {
    return (
        <>
            <Helmet>
                <title> Verification E-mail Sent | Camp Paradise</title>
            </Helmet>

            <SentIcon sx={{ mb: 5, height: 96 }} />

            <Typography variant="h3" paragraph>
                New Verification E-mail sent!
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                Please check your e-mail for the verification e-mail.
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
