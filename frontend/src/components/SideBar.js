import React from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react';
import Calendar from './Calendar';

const SideBar = () => {
    console.log('sidebar');
    return (
        <div >
            <Calendar />
        </div>
    )
}

export default SideBar;