import React from 'react';
import { Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const divStyle = {
  width: "100%",
  backgroundColor: "#E4E9F2",
  display: "flex",
  flexDirection: "row"
};

const NavBar = () => (
  <div style={divStyle}>
    <Header style={{flexGrow: 100, margin: '20px', justifyContent: 'center'}} as='h1' textAlign='center'>
        Life Management
    </Header>
  </div>
)

// export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default NavBar;