import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { createMuiTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


function NavigationC() {

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
        <AppBar position="static" color="#FFFFFF">
          <Toolbar>

            <div className={classes.title}>
            <Typography  variant="h6" >
            <Link to='/SrcatalogueC' style={{ textDecoration: 'none', color:"#fdd835", marginRight:20}}>
              Catalogue
              </Link>
            </Typography>

            <Typography  variant="h6" >
            <Link to='/SrfavorisC' style={{ textDecoration: 'none', color:"#fdd835", marginRight:20}}>
              Mes favoris
              </Link>
            </Typography>

             <Typography variant="h6" >
            <Link to='/SrmessagerieC' style={{ textDecoration: 'none', color:"#fdd835", marginRight:20}}>    
              Mes messages
              </Link>
            </Typography>          
            </div>

            <Button style={{ color:"#fdd835"}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Mon profil
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link to='/SrprofilC' style={{ textDecoration: 'none', color:"black"}}>
                <MenuItem onClick={handleClose}>Parametres</MenuItem>
                </Link>
                <MenuItem onClick={handleClose}>Déconnexion</MenuItem>
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
      display:"flex",
      flexDirection:"row",
      justifyContent:"flex-start"
    },
  }));


export default NavigationC;