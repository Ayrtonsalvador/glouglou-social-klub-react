import React, { useState } from 'react';

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
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { connect } from 'react-redux';

function CardVin({ bouteille, token }) {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [liked, setliked] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    var coloricon = ""

    if (liked) {
        coloricon = "#CC3300"
    } else {
        coloricon = ""
    }

    const addFavoris = async () => {
        setliked(!liked);

        var data = await fetch(`/add-favoris`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `IdFF=${bouteille._id}&IdViFF=${bouteille.IdVigneron._id}&tokenFF=${token}`
        })
    }

    // -------------MAP CATALOGUE------------- \\  

    return (
        <Grid item xs={6} md={3} xl={2} spacing={2} >
            <Card className={classes.root} style={{ margin: 10 }}>
                <CardHeader
                    id={bouteille._id}
                />
                <h5 style={{ marginLeft: 10, marginBottom: 0 }}> {bouteille.Nom}</h5>
                <p style={{ marginLeft: 10, marginBottom: 0 }}> {bouteille.Millesime}</p>
                <p style={{ marginLeft: 10 }}> {bouteille.AOC}</p>

                <CardMedia
                    className={classes.media}
                    image={bouteille.Photo}
                />
                <CardContent style={{ width: "100%", height: "30%" }}>
                    <Typography variant="h6" color="textSecondary" component="p">
                        {bouteille.Cepage}
                    </Typography>
                    <div id="parent" style={{height:130}}>
                    <Typography id="child" variant="body2" color="textSecondary" component="p">
                        {bouteille.Desc}
                    </Typography>
                    </div>
                </CardContent>
                <CardActions disableSpacing>

                    <IconButton style={{ outline: 'none' }} onClick={addFavoris} aria-label="add to favorites">
                        <FavoriteIcon style={{ color: coloricon }} />
                    </IconButton>

                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={() => { handleExpandClick() }}
                        aria-expanded={expanded}
                        aria-label="show more"
                        style={{ outline: 'none' }}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>

                            <Avatar aria-label="recipe" className={classes.avatar} src={bouteille.IdVigneron.Photo}>
                            </Avatar>
                            
                            <h5 style={{ marginTop: 10, marginBottom: 0 }}>
                                {bouteille.IdVigneron.Nom} </h5>
                            <Typography variant="h6"  component="p" style={{ margin: 0, fontSize: 14 }}>
                                {bouteille.IdVigneron.Domaine}
                            </Typography>
                            <Typography variant="h6" component="p" style={{ marginTop: -4, marginBottom: 10, fontSize: 14 }}>
                                {bouteille.IdVigneron.Ville}
                            </Typography>
                            
                        <Typography variant="body2" color="textSecondary" component="p">
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
