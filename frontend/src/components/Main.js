import React from "react";
import Week from './Week';
import Calendar from './Calendar';
import Note from './Note';
import Todo from './Todo';
import SideBar from './SideBar';
import { mainBackground } from './../config';

const mainStyle = {
    padding: '20px',
    display: 'grid',
    width: '90vw',
    height: '90vh',
    gridTemplateColumns: '20% 80%',
    gridTemplateRows: '70% 30%',
    gridGap: '10px'
}

const tmpStyle = {
    display: 'grid',
    background: mainBackground,
    width: '100vw',
    height: '90vh',
    gridTemplateColumns: '90% 10%',
}

const MainPage = () => {
    return (
        <div style={tmpStyle}>
            <div style={mainStyle}>
                <Calendar />
                <Week />
                <Note />
                <Todo />
            </div>
            <SideBar />
        </div>
    )
}

export default MainPage;