import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';

function NavigationV({ addToken }) {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="#FFFFFF" style={{ height: 70 }}>
        <Toolbar>

          <div className={classes.title} style={{ marginLeft: 60 }}>

            <Typography variant="h4" >
              <Link to='/CaveV' style={{ textDecoration: 'none', color: "#fdd835", marginRight: 20 }}>
                Ma cave
              </Link>
            </Typography>

            <Typography variant="h4" >
              <Link to='/MessagerieV' style={{ textDecoration: 'none', color: "#fdd835", marginRight: 20 }}>
                Mes messages
              </Link>
            </Typography>

            <Link to='/BouteilleV' style={{ textDecoration: 'none', color: "#fdd835", marginRight: 20 }}>
            <IconButton style={{ outline: 'none' }}>
                <AddCircleIcon style={{ color: "#fdd835" }} />
                </IconButton>
            </Link>

          </div>
          <Button style={{ color: "#fdd835" }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <Typography variant="h6" style={{ fontWeight: "bold" }}> Mon profil </Typography>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link to='/ProfilV' style={{ textDecoration: 'none', color: "black" }}>
              <MenuItem onClick={handleClose}>Parametres</MenuItem>
            </Link>

            <Link to='/' style={{ textDecoration: 'none', color: "black" }}>
              <MenuItem onClick={() => { handleClose(); addToken("") }}>Déconnexion</MenuItem>
            </Link>
          </Menu>

        </Toolbar>
      </AppBar>
    </div>

  );

}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
}));


function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: 'addToken', token: token })
    },
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(NavigationV);