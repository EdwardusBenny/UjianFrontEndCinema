import React, {Component} from 'react';
import {Nav, Navbar, NavItem, NavDropdown,MenuItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'universal-cookie';
import {keepLogin} from '../actions';
import {doLogOut} from '../actions/logout';
const cookies = new Cookies();
class Header extends Component
{
  componentWillMount()
  {
    const cookienya=cookies.get("bertasbihcat");
    if(cookienya!==undefined)
    {
      this.props.keepLogin(cookienya);
    }
  }
  componentWillReceiveProps(newProp){
    if(newProp.auth.username==="")
    {
      cookies.remove("bertasbihcat");
    }
  }
  fungsiLogOut =()=>{
    this.props.doLogOut();
   
 
    }

  renderNavbar = ()=>
  {
    
    if(this.props.auth.username!=="")
    {
      return(
        
        <Navbar fixedTop={true} inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      <Link to="/">CinemaXXI Bertasbih</Link>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
      <NavItem eventKey={2}>
        <Link to="/">MovieList</Link>
      </NavItem>
      <NavDropdown eventKey={3} title={this.props.auth.username} id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}><Link to="/Book"> Book</Link></MenuItem>

        <MenuItem divider />
        <MenuItem eventKey={3.2} onSelect={this.fungsiLogOut}> LogOut</MenuItem>
      </NavDropdown>
    </Nav>

  </Navbar.Collapse>
</Navbar>
        
    );
   
    }
    
    return(
        
      <Navbar fixedTop={true} inverse collapseOnSelect>
<Navbar.Header>
  <Navbar.Brand>
  <Link to="/">CinemaXXI Bertasbih</Link>
  </Navbar.Brand>
  <Navbar.Toggle />
</Navbar.Header>
<Navbar.Collapse>
  <Nav>
    <NavItem eventKey={2} href="#">
    <Link to="/">MovieList</Link>
    </NavItem>
  </Nav>
  <Nav pullRight>
    <NavItem eventKey={1} href="#">
    <Link to="/Login">Login</Link>
    </NavItem>
    <NavItem eventKey={2} href="#">
    <Link to="/Regis">Regis</Link>
    </NavItem>
  </Nav>
</Navbar.Collapse>
</Navbar>
      
  );
 
  }
  render(){    
    return(
      this.renderNavbar()
    );
  }
}

// class Header extends Component{
//     state = {kucing:"Hello apa kabar?"}
//     render(){
//         var a=5+7
//         return(
//             <div>
//             <div>{this.state.kucing}</div>
//             <div>apa kabar</div>
//             <div>{a}</div>
//             </div>
//         );
//     }
// }
const mapStateToProps = (state)=>{
  const auth = state.auth;
  return {auth};
}

export default connect(mapStateToProps,{doLogOut,keepLogin})(Header);