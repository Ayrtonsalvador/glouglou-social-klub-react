import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function CaveVide({vide}) {

    const classes = useStyles();
    const [checked, setChecked] = React.useState(false); 

    if (vide) {
      
        setChecked((prev) => !prev);
  
        return (
          <div className={classes.root}>
            <div className={classes.wrapper}>
              <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                <Paper elevation={4} className={classes.paper}>
                  <svg className={classes.svg}>
                    <polygon points="0,100 50,00, 100,100" className={classes.polygon} />
                  </svg>
                </Paper>
              </Slide>
            </div>
          </div>
        );
      };
    }
      const useStyles = makeStyles((theme) => ({
        root: {
          height: 180,
        },
        container: {
          display: 'flex',
        },
        paper: {
          margin: theme.spacing(1),
        },
        svg: {
          width: 100,
          height: 100,
        },
        polygon: {
          fill: theme.palette.common.white,
          stroke: theme.palette.divider,
          strokeWidth: 1,
        },
      }));
  

//<img style={{ borderRadius: 15, backgroundColor: "#FFFFFF", marginTop: 100, width: "50%" }} src="cavevide.png" />
