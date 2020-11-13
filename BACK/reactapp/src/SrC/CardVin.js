import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fab from '@material-ui/core/Fab';


import { connect } from 'react-redux';

function CardVin({ bouteille , token }) {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [liked, setliked] = useState(true)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    var color = ""
    if (liked === true){
         color =  "#CC3300"
      } else {
        color = ""
      }
    
    //   ${token}
    const addFavoris = async () => {
        var data = await fetch(`/add-favoris`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `IdFF=${bouteille._id}&IdViFF=${bouteille.IdVigneron._id}&tokenFF=47PlPYcfoj7eORElqNzEHYRhWKNRm9vo`
        })   
        }

    // -------------MAP CATALOGUE------------- \\  

        return (
            <Grid item xs={2}>
                <Card className={classes.root}>
                    <CardHeader
                        id={bouteille._id}
                        title={bouteille.Nom}
                        subheader={bouteille.Millesime}
                    />
                    <CardMedia
                        className={classes.media}
                        image={bouteille.Photo}
                        title="Paella dish"
                    />
                    <CardContent style={{ width: "100%", height: "30%" }}>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {bouteille.Cepage}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {bouteille.Desc}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>

                    <IconButton onClick={()=>{addFavoris(); setliked(!liked)}} aria-label="Message">
                                <FavoriteIcon />
                    </IconButton>

                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={() => {handleExpandClick()}}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Avatar aria-label="recipe" className={classes.avatar} src={bouteille.IdVigneron.Photo}>
                            </Avatar>
                            <Typography paragraph>
                                {bouteille.IdVigneron.Nom}
                            </Typography>
                            <Typography paragraph>
                                {bouteille.IdVigneron.Domaine}
                            </Typography>
                            <Typography paragraph>
                                {bouteille.IdVigneron.Ville}
                            </Typography>
                            <Typography paragraph>
                                {bouteille.IdVigneron.Desc}
                            </Typography>
                            <IconButton aria-label="Message">
                                <MessageIcon />
                            </IconButton>
                        </CardContent>
                    </Collapse>

                </Card>
            </Grid>
        )
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 250
        ,
            whiteSpace: 'wrap',
            marginBottom: theme.spacing(1),
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        container: {
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridGap: theme.spacing(3),
          },
          paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            whiteSpace: 'nowrap',
            marginBottom: theme.spacing(1),
          },
          divider: {
            margin: theme.spacing(2, 0),
          },
    }));
    
    function mapStateToProps(state) {
        return { token: state.token }
    }

    export default connect(
        mapStateToProps,
        null,
    )(CardVin);
