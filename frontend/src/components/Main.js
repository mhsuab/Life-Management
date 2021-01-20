import React from "react";
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
    gridTemplateRows: '70% 30%',
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

const tmpStyle = {
    display: 'grid',
    background: mainBackground,
    width: '100vw',
    height: '93vh',
    gridTemplateColumns: '90% 10%',
}

const MainPage = () => {
    return (
        <div style={tmpStyle}>
            <div style={mainStyle}>
                <div style={leftStyle}>
                    <Calendar />
                    <Note />
                </div>
                <div style={rightStyle}>
                    <Week />
                    <Todo />
                </div>
            </div>
            <SideBar/>
        </div>
    )
}

export default MainPage;