import { requirePropFactory } from '@material-ui/core';
import React from 'react';
import { sideBarColor } from './../config';

const sideBarStyle = {
    height: '90vh',
    background: sideBarColor
}

const SideBar = () => {
    console.log(sideBarColor);
    return (
        <div style={ sideBarStyle }>
            {/* <Calendar /> */}
        </div>
    )
}

export default SideBar;