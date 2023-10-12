import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography, Button, Link } from '@mui/material';
// components
import { useNavigate, useParams } from 'react-router-dom';
import { useSettingsContext } from '../../components/settings';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import localStorageAvailable from '../../utils/localStorageAvailable';
// auth
import { useAuthContext } from '../../auth/useAuthContext';

export default function GuidelinePage() {
  const { themeStretch } = useSettingsContext();
  const storageAvailable = localStorageAvailable();
  const navigate = useNavigate();
  const { campId } = useParams();
  const { user } = useAuthContext();

  type CampAgreement = {
    campId: string;
    acceptedOn: string | null;
    userId: string | null;
  };

  const handleAgree = () => {
    let guidelinesAgreements: CampAgreement[] = [];
    try {
      guidelinesAgreements = JSON.parse(
        storageAvailable ? localStorage.getItem('guidelineAgreements') ?? '[]' : '[]'
      );
    } catch {}
    if (!campId) return;
    console.log(user);
    const camp: CampAgreement = {
      campId: campId,
      acceptedOn: new Date().toTimeString(),
      userId: user?.id.toString(),
    };
    guidelinesAgreements.push(camp);
    console.log(guidelinesAgreements);
    localStorage.setItem('guidelineAgreements', JSON.stringify(guidelinesAgreements));
    navigate(PATH_DASHBOARD.general.forms);
  };

  return (
    <>
      <Helmet>
        <title> Guidelines</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h6"> Guidelines </Typography>
      </Container>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="body1">
          Our camp is built on the principle Jesus left for us in His Word: “Let all things be done
          decently and in order.” 1 Corinthians 14:40. Camp leaders have designated a team of
          security to ensure camp guidelines are followed. Security are expected to enforce all the
          guidelines graciously and firmly. A schedule will be posted of required activities (i.e.
          group morning devotions, church services, and teaching sessions) and optional activities
          (i.e. meals and recreational activities).
        </Typography>
        <Typography variant="h5"> Registration</Typography>
        <ol>
          <li>I will sign up and pay for camp before arrival.</li>
          <li>
            I will bring a health and permission sheet printed from the site and signed by my
            parents (if I am under age 18)
          </li>
          <li>I will arrange my own transportation to and from camp and bring my own bedding.</li>
          <li>I will arrive at camp during the arrival time.</li>
          <li>I will park where designated by security and not move my vehicle during camp.</li>
          <li>I will sleep only in my registered room for the duration of camp.</li>
          <li>
            I will not leave the camp property during camp. Camp property boundaries are posted.
          </li>
          <li>
            I will contact the head of security, ideally before camp, to request reasonable
            exceptions (example: to arrive late, leave early, or leave camp briefly for work or
            school).
          </li>
          <li>
            I understand that attending camp is voluntary. Health information shared during
            registration is for my own benefit if an emergency arises. As such, it will be kept as
            confidential as the situation dictates and as our current platform provides.
          </li>
        </ol>
        <Typography variant="h5">Schedule</Typography>
        <ol>
          <li>
            I will get up on time in the morning and attend in entirety all required activities.
            Security has the right to check my room at any time during required activities. If I am
            too sick to attend I will get an excuse note from a health worker and send it to
            security prior to the activity I miss.
          </li>
          <li>
            I will not get or request food from the kitchen outside of posted mealtimes. Out of
            respect to God and the kitchen staff, I will come to the kitchen just before the opening
            prayer and vacate the dining hall just after the closing prayer. I will not accept more
            food than I can eat at a meal and I will clean up my spot at the table after I finish.
            If I have a serious complaint against the kitchen staff I will immediately and
            graciously first appeal to the head of the kitchen, and if necessary, then to the head
            of camp. I will contact the head of the kitchen prior to camp to request reasonable
            dietary accommodations.
          </li>
          <li>
            I understand there is no cell-phone coverage or Wifi internet available during camp. A
            land-line phone will be available to share during free time.
          </li>
          <li>
            I will be in my room and be quiet from the hours of 1am to 8am so others can rest.
          </li>
        </ol>
        <Typography variant="h5">Security</Typography>
        <ol>
          <li>
            I will respectfully obey the principles taught in our IUC ECB churches in regards to
            behavior, speech, music, dress, games, reading and viewing material, and relationships.
          </li>
          <li>
            I will not bring drugs, alcohol, tobacco, weapons, firearms, fireworks, off-road
            vehicles, or illegal or offensive items to camp.
          </li>
          <li>
            I understand that any violation means (1) I could be sent home without reimbursement of
            funds, (2) I may be reported to my family/civil/church authorities, and (3) I could be
            held responsible to pay for any damaging behavior.
          </li>
          <li>
            I will do my best to have a positive attitude and “in everything give thanks.” (1
            Thessalonians 5:18)
          </li>
          <li>
            I will, if I have a complaint against security (i.e. for being rough or inconsistent in
            enforcing the guidelines) appeal first to the head of security in a timely and gracious
            manner during camp, and if necessary, appeal next to the ordained minister in charge of
            camp.
          </li>
        </ol>
        <Typography variant="h5">Refunds</Typography>
        <ol>
          <li>
            I understand that refunds may not always be available, and the refund percentage may
            change without notice.
          </li>
          <li>
            I understand that refunds will at most be the price of the reservation MINUS the stripe
            fee (
            <Link target="_blank" href="https://stripe.com/pricing">
              Stripe Pricing
            </Link>
            ) ie. $120.00 = $117.06 + <i>$2.94 (stripe fee)</i>
          </li>
        </ol>
        {campId ? (
          <Button fullWidth variant="contained" onClick={handleAgree}>
            Agree
          </Button>
        ) : null}
      </Container>
    </>
  );
}
