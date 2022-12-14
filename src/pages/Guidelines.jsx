import React, { useState, useEffect, useContext } from 'react'
import { Navigate } from "react-router-dom";
import AuthContext from '../context/AuthContext'
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";
import { ToggleButton, Card, Subtitle2, Caption, IconButton, H4, H5, H6 } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'



const Guidelines = () => {

    const location = useLocation();
    let { user } = useContext(AuthContext)
    const camp = location.state?.camp;
    const dark = false;

    return (
        <div className="content">
            <H4 dark={dark} style={{ fontWeight: '500' }}>
                Guidelines
            </H4>
            <Card elevation={0} style={{ padding: '10px' }}>
                Our camp is built on the principle Jesus left for us in His Word: “Let all things be done decently and in order.” 1 Corinthians 14:40. Camp leaders have designated a team of security to ensure camp guidelines are followed. Security are expected to enforce all the guidelines graciously and firmly. A schedule will be posted of required activities (i.e. group morning devotions, church services, and teaching sessions) and optional activities (i.e. meals and recreational activities).
                RegistrationI will sign up and pay for camp before arrival.
                I will bring a health and permission sheet printed from the site and signed by my parents (if I am under age 18)
                I will arrange my own transportation to and from camp and bring my own bedding.
                I will arrive at camp during the arrival time.
                I will park where designated by security and not move my vehicle during camp.
                I will sleep only in my registered room for the duration of camp.
                I will not leave the camp property during camp. Camp property boundaries are posted.
                I will contact the head of security, ideally before camp, to request reasonable exceptions (example: to arrive late, leave early, or leave camp briefly for work or school).
                ScheduleI will get up on time in the morning and attend in entirety all required activities.Security has the right to check my room at any time during required activities. If I am too sick to attend I will get an excuse note from a health worker and send it to security prior to the activity I miss.
                I will not get or request food from the kitchen outside of posted mealtimes. Out of respect to God and the kitchen staff, I will come to the kitchen just before the opening prayer and vacate the dining hall just after the closing prayer. I will not accept more food than I can eat at a meal and I will clean up my spot at the table after I finish. If I have a serious complaint against the kitchen staff I will graciously and immediately appeal first to the head of the kitchen, and if necessary next to the head of camp. I will contact the head of the kitchen prior to camp to request reasonable dietary accommodations.
                I understand there is no cell-phone coverage or Wifi internet available during camp. A land-line phone will be available to share during free time.
                I will be in my room and be quiet from the hours of 1am to 8am so others can rest.
                SecurityI will respectfully obey the principles taught in our IUC ECB churches in regards to behavior, speech, music, dress, games, reading and viewing material, and relationships.
                I will not bring drugs, alcohol, tobacco, weapons, firearms, fireworks, off-road vehicles, or illegal or offensive items to camp.
                I understand that any violation means (1) I could be sent home without reimbursement of funds, (2) I may be reported to my family/civil/church authorities, and (3) I could be held responsible to pay for any damaging behavior.
                I will do my best to have a positive attitude and “in everything give thanks.” (1 Thessalonians 5:18)
                I will, if I have a complaint against security (i.e. for being rough or inconsistent in enforcing the guidelines) appeal first to the head of security in a timely and gracious manner during camp, and if necessary, appeal next to the ordained minister in charge of camp.

            </Card>
        </div>
    )
}

export default Guidelines;

