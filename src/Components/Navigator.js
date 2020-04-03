import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';


const Navigator = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

return (
    <div>
        
<nav className="navbar navbar-expand-lg navbar-light bg -light">
<Link className="navbar-brand" to ="/" >Personal Trainer</Link>
<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      ><Link className="nav-link"to="/">Home</Link>
      <Link className="nav-link"to="/training">Training</Link>
      <Link className="nav-link"to="/customers">Customers</Link>
      <Link className="nav-link"to="/calendar">Calendar</Link>
       
      </Menu>


</nav>

</div>
)
}
export default Navigator;