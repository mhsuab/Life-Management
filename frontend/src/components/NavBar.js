import React from 'react';
import { Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { navBarColor, serviceTitle } from './../config';

const divStyle = {
    width: "100%",
    backgroundColor: navBarColor,
    display: "flex",
    flexDirection: "row"
};

const NavBar = () => (
    <div style={divStyle}>
        <Header style={{ flexGrow: 100, margin: '20px', justifyContent: 'center', color: '#fff' }} as='h1' textAlign='center'>
            { serviceTitle }
        </Header>
    </div>
)

// export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default NavBar;