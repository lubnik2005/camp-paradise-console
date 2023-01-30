import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../../components/settings';

// ----------------------------------------------------------------------
export default function BlankPage() {
    const { themeStretch } = useSettingsContext();

    return (
        <>
            <Helmet>
                <title> Blank Page | Camp Paradise</title>
            </Helmet>

            Medical problems:
            ❏ No medical problems
            ❏ List of medical problems:
            Immunizations:
            ❏ No immunizations
            ❏ Up to date including tetanus
            ❏ Only tetanus
            Allergies:
            ❏ No allergies
            ❏ List of allergies and reaction:
            Medicine bringing to camp:
            ❏ No medicines
            ❏ Name of medicine (must be in original labeled bottle):
            Dose:
            How often:
            Purpose:
            Able to take on his/her own: (Yes/No)
            If you have asthma, please bring an unexpired albuterol inhaler. If you have ever had
            a life-threatening allergic reaction bring an unexpired epinephrine pen (Epi-Pen).
            To be Completed for Campers Under Age 18 if No Parent Will Remain for Camp:
            In the event of an accident or illness during this camp, I agree that my son or
            daughter receives first aid including basic non-prescription medications and if
            necessary, transportation to and treatment at a medical facility. [Appropriate effort will
            be made to contact you as soon as possible .]
            Name of parent: _____________________Signature: _________Phone:__________

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h6"> Blank </Typography>
            </Container>
        </>
    );
}
