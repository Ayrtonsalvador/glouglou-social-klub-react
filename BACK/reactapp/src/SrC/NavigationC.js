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
import { connect } from 'react-redux';

function NavigationC({addToken}) {

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
        <AppBar position="fixed" color="#FFFFFF" style={{height:70}}>
          <Toolbar>

            <div className={classes.title} style={{marginLeft:60}}>
            <Typography  variant="h4" >
            <Link to='/CatalogueC' style={{ textDecoration: 'none', color:"#fdd835", marginRight:20}}>
              Catalogue
              </Link>
            </Typography>

            <Typography  variant="h4" >
            <Link to='/FavorisC' style={{ textDecoration: 'none', color:"#fdd835", marginRight:20}}>
              Mes favoris
              </Link>
            </Typography>

             <Typography variant="h4" >
            <Link to='/MessagerieC' style={{ textDecoration: 'none', color:"#fdd835", marginRight:20}}>    
              Mes messages
              </Link>
            </Typography>          
            </div>
            <Button style={{ color:"#fdd835"}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <Typography variant="h6" style={{fontWeight: "bold"}}> Mon profil </Typography>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link to='/ProfilC' style={{ textDecoration: 'none', color:"black"}}>
                <MenuItem onClick={handleClose}>Parametres</MenuItem>
                </Link>

                <Link to='/' style={{ textDecoration: 'none', color:"black"}}>
                <MenuItem onClick={ () => {handleClose(); addToken("")}}>Déconnexion</MenuItem>
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
      display:"flex",
      flexDirection:"row",
      justifyContent:"flex-start"
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
)(NavigationC);