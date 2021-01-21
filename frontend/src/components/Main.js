import React, { useState } from "react";
import Week from './Week';
import Calendar from './Calendar';
import Note from './Note';
import Todo from './Todo';
import SideBar from './SideBar';
import '../css/Calendar.css'
import { mainBackground } from './../config';

const mainStyle = {
    display: 'grid',
    gridTemplateColumns: '20% 80%',
}

const leftStyle = {
    padding: '2vh',
    display: 'grid',
    gridTemplateRows: '50% 50%',
    gridGap: '1vh'
}

const rightStyle = {
    paddingTop: '2vh',
    paddingBottom: '1vh',
    paddingRight: '10px',
    display: 'grid',
    gridTemplateRows: '50% 50%',
    gridGap: '1vh',
}

const sideBarStyle = {
    display: 'grid',
    background: mainBackground,
    width: '100vw',
    height: '93vh',
    gridTemplateColumns: '90% 10%',
}

const MainPage = () => {
    const [modified, setModified] = useState(0);
    const handleBlockChange = () => {
        setModified((modified > 100)? 0: modified + 1);
    };

    return (
        <div style={sideBarStyle}>
            <div style={mainStyle}>
                <div style={leftStyle}>
                    <Calendar modified={modified}/>
                    <Note />
                </div>
                <div style={rightStyle}>
                    <Week handleBlockChange={() => handleBlockChange()}/>
                    <Todo />
                </div>
            </div>
            <SideBar/>
        </div>
    )
}

export default MainPage;