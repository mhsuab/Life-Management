import React from "react";
import Week from './Week';
import Calendar from './Calendar';
import Note from './Note';
import Todo from './Todo';
import { Header, Grid } from 'semantic-ui-react'
import './styles.css'

// const MainPage = () => {
//     return (
//         <div>
//             <Grid columns='equal' padding-right='0' padding-left='0'>
//                 <GridColumn>
//                         <Calendar />
//                         <Note />
//                 </GridColumn>
//                 <GridColumn width={13}>
//                     <Week />
//                     <Todo />
//                 </GridColumn>
//             </Grid>
//         </div>
//     )
// }

const mainStyle = {
    padding: '20px',
    display: 'grid',
    background: '#555',
    width: '100vw',
    height: '90vh',
    gridTemplateColumns: '15% 70% 10%',
    gridTemplateRows:'70% 30%',
    gridGap: '10px'
}

const MainPage = () => {
    return (
        <>
        {/* <Header as='h1' style={{justifyContent: 'center', margin:'20px'}}>Life Management</Header> */}
        <div style={mainStyle}>
            <Calendar />
            <div></div>
            <div></div>
            <Note />
            <Todo />
            <div></div>
        </div>
        </>
    )
}

export default MainPage;