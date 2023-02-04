import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
// routes
import { PATH_DASHBOARD, PATH_AUTH } from '../../routes/paths';
// @mui
import { Container, Box, Typography, Switch, FormControlLabel, TextField, RadioGroup, Radio, Card, Stack, CardContent, CardHeader } from '@mui/material';
import FormProvider, { RHFTextField, RHFRadioGroup } from '../../components/hook-form';
import Iconify from '../../components/iconify';
import { LoadingButton } from '@mui/lab';
// components
import { useSettingsContext } from '../../components/settings';
import { useEffect, useState } from 'react';
// utils 
import axios from '../../utils/axios';
import localStorageAvailable from '../../utils/localStorageAvailable';
import { Navigate } from 'react-router';

// ----------------------------------------------------------------------
export default function FormPage() {
    const { themeStretch } = useSettingsContext();
    const navigate = useNavigate();

    const ChangePassWordSchema = Yup.object().shape({
        isMinor: Yup.string().required('Age is required'),
        hasMedicalProblems: Yup.string().when('isMinor', {
            is: 'true',
            then: Yup.string().required('Please select if any medical problems'),
        }),
        medicalProblems: Yup.string().when(['isMinor', 'hasMedicalProblems'], {
            is: (isMinor: string, hasMedicalProblems: string) => isMinor === 'true' && hasMedicalProblems === 'true',
            then: Yup.string().required('Please provide a comma separated list of medical problems'),
        }),
        hasAllergies: Yup.string().when('isMinor', {
            is: 'true',
            then: Yup.string().required('Please select if any allergies'),
        }),
        allergies: Yup.string().when(['isMinor', 'hasAllergies'], {
            is: (isMinor: string, hasAllergies: string) => isMinor === 'true' && hasAllergies === 'true',
            then: Yup.string().required('Please provide a comma separated list of allergies'),
        }),
        immunizations: Yup.string().when('isMinor', {
            is: 'true',
            then: Yup.string().required('Please select if any immunizations'),
        }),
        hasMedicines: Yup.string().when('isMinor', {
            is: 'true',
            then: Yup.string().required('Please select if any medicines'),
        }),
        medicineDose: Yup.string().when(['isMinor', 'hasMedicines'], {
            is: (isMinor: string, hasMedicines: string) => isMinor === 'true' && hasMedicines === 'true',
            then: Yup.string().required('Please provide a the dose of the medication'),
        }),
        medicineFrequency: Yup.string().when(['isMinor', 'hasMedicines'], {
            is: (isMinor: string, hasMedicines: string) => isMinor === 'true' && hasMedicines === 'true',
            then: Yup.string().required('Please provide a how often the medicines should be taken'),
        }),
        medicineAbility: Yup.string().when(['isMinor', 'hasMedicines'], {
            is: (isMinor: string, hasMedicines: string) => isMinor === 'true' && hasMedicines === 'true',
            then: Yup.string().required('Please provide if the minor can take it on his/her own'),
        }),
        minorFullName: Yup.string().when('isMinor', {
            is: 'true',
            then: Yup.string().required('Please provide the minor\'s full name'),
        }),
        guardianFullName: Yup.string().when('isMinor', {
            is: 'true',
            then: Yup.string().required('Please provide the guardian\'s full name'),
        }),
        guardianPhone: Yup.string().when('isMinor', {
            is: 'true',
            then: Yup.string().required('Please provide the guardian\'s phone number'),
        }),
        // oldPassword: Yup.string().required('Old Password is required'),
        // newPassword: Yup.string()
        //     .min(6, 'Password must be at least 6 characters')
        //     .required('New Password is required'),
        // confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    });

    type FormValuesProps = {
        isMinor: string;
        hasMedicalProblems: string;
        hasMedicines: string;
        medicineDose: string;
        medicineFrequency: string;
        medicineAbility: string;
        immunizations: string;
        hasAllergies: string;
        minorFullName: string;
        guardianFullName: string;
        guardianPhone: string;
    }

    const defaultValues = {
        isMinor: 'true',
        hasMedicalProblems: '',
        hasMedicines: '',
        medicineDose: '',
        medicineFrequency: '',
        medicineAbility: '',
        immunizations: '',
        hasAllergies: '',
        minorFullName: '',
        guardianFullName: '',
        guardianPhone: '',
    };

    const methods = useForm({
        resolver: yupResolver(ChangePassWordSchema),
        defaultValues,
    });

    const {
        watch,
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const isMinor = watch('isMinor');
    const hasMedicalProblems = watch('hasMedicalProblems');
    const hasAllergies = watch('hasAllergies');
    const hasMedicines = watch('hasMedicines');
    const storageAvailable = localStorageAvailable();
    const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

    const onSubmit = async (data: FormValuesProps) => {
        try {
            const response = await axios.post(`/form?token=${accessToken}`, {
                data,
                campId: 1,
                formId: 1
                //campId,
            });
            navigate(PATH_DASHBOARD.general.forms);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <Helmet>
                <title> Form | Camp Paradise</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h2">Form</Typography>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Card style={{ marginBottom: '40px' }}>
                        <CardHeader title='Health Form' />
                        <CardContent>
                            <Typography variant="h4">Age</Typography>
                            <RHFRadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="isMinor"
                                options={[{ label: 'Under 18', value: 'true' }, { label: '18+', value: 'false' }]}
                            />
                            {isMinor === 'true' ? <>

                                <Typography variant="h4">Medical Problems</Typography>
                                <Stack direction='row'>
                                    <RHFRadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="hasMedicalProblems"
                                        //onChange={(target, value) => { setHasMedicalProblems(value) }}
                                        options={[
                                            { label: 'No medical problems', value: 'false' },
                                            { label: 'List of medical problems', value: 'true' },
                                        ]}
                                    />
                                    {hasMedicalProblems === 'true' ? <RHFTextField name="medicalProblems" placeholder="List of medical problems" multiline rows={3} variant="outlined" /> : null}
                                </Stack>
                                <Typography variant="h4">Immunizations</Typography>
                                <Stack direction='row'>
                                    <RHFRadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="immunizations"
                                        options={[
                                            { label: 'No immunizations', value: 'none' },
                                            { label: 'Up to date including tetanus', value: 'up-to-date' },
                                            { label: 'Only tetanus', value: 'tetanus' },
                                        ]}
                                    />
                                </Stack>
                                <Typography variant="h4">Allergies</Typography>
                                <Stack direction='row'>
                                    <RHFRadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="hasAllergies"
                                        //onChange={(target, value) => { setHasAllergies(value) }}
                                        options={[
                                            { label: 'No Allergies', value: 'false' },
                                            { label: 'List of allergies and reaction', value: 'true' }]}
                                    />
                                    {hasAllergies === 'true' ? <RHFTextField name="allergies" multiline rows={3} variant="outlined" /> : null}
                                </Stack>
                                <Typography variant="h4">Medicine</Typography>
                                <Typography variant="caption">Medicine bringing to camp</Typography>
                                <Stack direction='row'>
                                    <RHFRadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label-thing"
                                        name="hasMedicines"
                                        //onChange={(target, value) => { setHasMedicines(value) }}
                                        options={[
                                            { label: 'No Medicines', value: 'false' },
                                            { label: 'Medicines (must be in original labeled bottle)', value: 'true' }]}
                                    />
                                    {hasMedicines === 'true' ? <>
                                        <Box>
                                            <RHFTextField name="medicineDose" label="Dose" variant="outlined" />
                                            <RHFTextField name="medicineFrequency" label="How often" variant="outlined" />
                                            <RHFRadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                name="medicineAbility"
                                                label="Able to take on his/her own"
                                                defaultValue=''
                                                options={[
                                                    { label: 'Yes', value: 'true' },
                                                    { label: 'No', value: 'false' }]}
                                            />
                                        </Box>
                                    </> : null}
                                </Stack>
                            </> : null}


                        </CardContent>
                    </Card>
                    {isMinor === 'true' ?
                        <Card >
                            <CardHeader title='Waiver and Release Form (Minor 0-17 years)' />
                            <CardContent>
                                <Typography variant='h4'>Liability Release</Typography>
                                <Typography variant='body2'>
                                    I confirm that I am legally responsible or can legally consent for this minor. As such, I
                                    hereby release the Baptist Christian Camp of California and its officials, agents,
                                    volunteers, contractors and employees from liability for any claims (by me or any third
                                    party) of personal injury or property damages in connection with the minor’s
                                    participation.
                                </Typography>
                                <br />
                                <Typography variant='h4'>Consent for Treatment</Typography>
                                <Typography variant='body2'>
                                    I confirm that I am legally responsible or can legally consent for this minor. As such, I
                                    I hereby give my consent for this minor to be treated by medical personnel in case of
                                    sudden illness or injury while participating in any event, activity, or program facilitated
                                    by or associated with Baptist Christian Camp of California. I understand that the Baptist
                                    Christian Camp of California will not provide any medical insurance for such treatment
                                    and that the cost thereof will be at my expense. I also understand that the minor freely
                                    chooses to self-administer any and all medication (apart from emergency medicine). I
                                    discharge in advance Baptist Christian Camp of California and its medical personnel,
                                    officials, agents, volunteers, contractors and employees from all liability that this minor
                                    may incur from either self-administered medical treatment or treatment provided to
                                    him/her.
                                </Typography>
                                <br />
                                <Typography variant='h4'>Photo Release</Typography>
                                <Typography variant='body2'>
                                    I hereby authorize the Baptist Christian Camp of California to publish the photographs
                                    taken of this minor and this minor’s name for use on the Baptist Christian Camp of
                                    California website or other associated media and/or display photographs of this minor
                                    within the facility. I release the Baptist Christian Camp of California from any
                                    expectation of this minor’s confidentiality. I acknowledge that since participation in any
                                    event, program, or activity hosted by or associated with Baptist Christian Camp of
                                    California is voluntary, neither I nor this minor will receive any financial compensation
                                    for the use of this minor’s name or photographs of this minor in publications and
                                    websites produced by the Baptist Christian Camp of California. I further agree that
                                    participation in any publication and website produced by the Baptist Christian Camp of
                                    California confers no rights of ownership whatsoever.
                                </Typography>

                            </CardContent>
                        </Card> :
                        <Card>
                            <CardHeader title='Consent and Release Form (Adult 18 years +)' />
                            <CardContent>
                                <Typography variant='h4'>Liability Release</Typography>
                                <Typography variant='body2'>
                                    I confirm that I am or will be 18 years of age or older on or before the first day of the camp,
                                    event, activity, or program hosted by Baptist Christian Camp of California. I am truthfully and
                                    accurately reporting my age for the purposes of this waiver. If I falsify my age in any way, my
                                    legal guardian takes full and complete legal responsibility for any legal proceedings that may
                                    arise from any of my participation with Baptist Christian Camp of California. As such, I hereby
                                    release the Baptist Christian Camp of California and its officials, agents, volunteers, contractors
                                    and employees from liability for any claims (by me or any third party) of personal injury or
                                    property damages in connection with my participation.
                                </Typography>
                                <br />
                                <Typography variant='h4'>Consent for Treatment</Typography>
                                <Typography variant='body2'>
                                    I hereby give my consent to be treated by medical personnel in case of sudden illness or injury
                                    while participating in any event, activity, or program facilitated by or associated with Baptist
                                    Christian Camp of California. I understand that the Baptist Christian Camp of California will not
                                    provide any medical insurance for such treatment and that the cost thereof will be at my expense.
                                    I also understand that I freely choose to self-administer any and all medication (apart from
                                    emergency medicine). I discharge in advance Baptist Christian Camp of California and its
                                    medical personnel, officials, agents, volunteers, contractors and employees from all liability that
                                    I may incur from either self-administered medical treatment or treatment provided to me.
                                </Typography>
                                <br />
                                <Typography variant='h4'>Photo Release</Typography>
                                <Typography variant='body2'>
                                    I hereby authorize the Baptist Christian Camp of California to publish the photographs taken of
                                    me and my name for use on the Baptist Christian Camp of California website or other associated
                                    media and/or display photographs of me within the facility. I release the Baptist Christian Camp
                                    of California from any expectation of my confidentiality. I acknowledge that since my
                                    participation in any event, program, or activity hosted by or associated with Baptist Christian
                                    Camp of California is voluntary, I will not receive any financial compensation for the use of my
                                    name or photographs of me in publications and websites produced by the Baptist Christian Camp
                                    of California. I further agree that participation in any publication and website
                                    produced by the Baptist Christian Camp of California confers no rights of ownership
                                    whatsoever.
                                </Typography>

                            </CardContent>
                        </Card>}
                    <Card style={{ marginTop: '40px' }}>
                        <CardContent>
                            {isMinor === 'true' ? <>
                                <Typography>
                                    I have read and understood the foregoing liability release, consent for treatment, and
                                    photo release and agree to all the terms and conditions.

                                </Typography>
                                <RHFTextField style={{ margin: '10px' }} name="minorFullName" label="Minor's Full  Name" variant="outlined" />
                                <RHFTextField style={{ margin: '10px' }} name="guardianFullName" label="Parent/Guardian Full  Name" variant="outlined" />
                                <RHFTextField style={{ margin: '10px' }} name="guardianPhone" label="Parent/Guardian Phone" variant="outlined" />
                            </> :
                                <Typography>
                                    I have read and understood the foregoing liability release, consent for treatment, and
                                    photo release and agree to all the terms and conditions.

                                </Typography>}
                            <LoadingButton
                                style={{ margin: '10px' }}
                                type="submit"
                                variant="contained"
                                loading={isSubmitting}
                                fullWidth
                            >
                                Agree
                            </LoadingButton>
                        </CardContent>
                    </Card>

                </FormProvider>





            </Container >
        </>
    );
}
