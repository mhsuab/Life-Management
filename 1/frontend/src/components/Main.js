import React, { useEffect, useRef, useState } from "react";
import Week from './Week';
import Calendar from './Calendar';
import Fcalendar from './FullCalendar';
import { Grid, GridRow } from 'semantic-ui-react'


function MainPage() {
    //const {} = Week()
    return (
        <div >
            <Grid>
                <GridRow>
                    <Fcalendar />
                    <Week />
                </GridRow>
            </Grid>
        </div>
    )
}

export default MainPage;