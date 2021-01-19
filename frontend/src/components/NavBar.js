import React, { useContext } from 'react';
import { Header, Menu, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { navBarColor, serviceTitle } from './../config';

import { AuthContext } from '../context/auth';

const divStyle = {
    width: "100%",
    backgroundColor: navBarColor,
    display: "flex",
    flexDirection: "row"
};

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    const pathname = window.location.pathname;

    const NavBar = user ? (
        <Menu pointing secondary style={divStyle}>
            <Menu.Item 
                name={user.username} 
                active 
                style={{ borderColor:'#fff', color:'#fff' }}
            >
                <Icon name='user' />
                {user.username} 
            </Menu.Item>
            <Header 
                style={{ flexGrow: 100, margin: '20px', justifyContent: 'center', color: '#fff' }}
                as='h1' 
                textAlign='center'
            >
                { serviceTitle }
            </Header>    
            <Menu.Menu position="right">
                <Menu.Item>
                    <Button 
                        color='instagram'    
                        onClick={logout} 
                        as={Link} 
                        to='/home'
                    >
                        Logout
                    </Button>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu pointing secondary style={divStyle}>
            <Header style={{ flexGrow: 100, margin: '20px', justifyContent: 'center', color: '#fff' }} as='h1' textAlign='center'>
                { serviceTitle }
            </Header>
        </Menu>
    );

    return NavBar
}

// export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default NavBar;