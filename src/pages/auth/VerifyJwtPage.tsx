import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
// @mui
import { Link, Typography, CircularProgress } from '@mui/material';
// components
import Iconify from '../../components/iconify';
// sections
// assets
import { EmailInboxIcon } from '../../assets/icons';
// axios
import axios from '../../utils/axios';
// routes
import { PATH_AUTH } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function VerifyJwtPage() {


    const params = new URLSearchParams(window.location.search);
    const token = params.get('token')
    const [verified, setVerified] = useState(false)
    const [success, setSuccess] = useState(false)
    console.log(token);

    const verify = useCallback(async () => {
        try {
            const response = await axios.get(`/verify?token=${token}`);
            console.log(response);
            setVerified(true);
            if (response.status === 200) setSuccess(true);
        } catch (error) {
            console.log(error);
            setVerified(true);
            setSuccess(false);
            console.log({ error: { error: ['Cannot connect to api.'] } });
        }
    }, [token]);

    useEffect(() => {
        const fetchData = async () => verify();
        fetchData();
    }, [verify]);

    if (!verified) return <CircularProgress />


    return (
        success ?
            <>
                <Helmet>
                    <title> Verify Code | Camp Paradise</title>
                </Helmet>

                <EmailInboxIcon sx={{ mb: 5, height: 96 }} />

                <Typography variant="h3" paragraph>
                    E-mail verified!
                </Typography>


                <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                    Your email has been verified.
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
            </> :
            <>
                <Helmet>
                    <title> Verify Code | Camp Paradise</title>
                </Helmet>

                <EmailInboxIcon sx={{ mb: 5, height: 96 }} />

                <Typography variant="h3" paragraph>
                    Failed to verify your email!
                </Typography>

                <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                    Please check yoor E-mail.
                </Typography>

                <Typography variant="body2" sx={{ my: 3 }}>
                    Didn&apos;t receive an E-mail? &nbsp;
                    <RouterLink to={PATH_AUTH.resend}> <Link variant="subtitle2">Resend E-mail</Link></RouterLink>
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
