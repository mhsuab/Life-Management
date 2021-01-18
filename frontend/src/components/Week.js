import React from "react";
import OneDay from './OneDay';
import './styles.css'

const WeekStyle = {
    display: 'grid',
    background: '#FFFFFF',
    width: '100%',
    height: '60vh',
    gridTemplateColumns: '20% 20% 20% 20% 20%'

}

const Week = () => (
    <div style={WeekStyle }>
        <OneDay currentDate='2020-12-23' schedulerData={[{ startDate: '2020-12-23T18:30', endDate: '2020-12-23T21:00', title: 'Meeting' }]} />
        <OneDay currentDate='2020-12-24'/>
        <OneDay currentDate='2020-12-25'/>
        <OneDay currentDate='2020-12-26'/>
        <OneDay currentDate='2020-12-27'/>
    </div>
)

export default Week