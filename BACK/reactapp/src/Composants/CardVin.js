import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Send from '@material-ui/icons/Send';
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
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import TextField from '@material-ui/core/TextField';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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

    // -------------SEND MESSAGE------------- \\ 
    const [MessageSend, setMessageSend] = useState("")

    const Envoyer = async () => {

        var data = await fetch(`mailbox-write`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `MessageSend=${MessageSend}&caviste=${token}&vigneron=${bouteille.IdVigneron.Nom}`
        })

        var response = await data.json()
        console.log("REPOSEFB", response)
        setMessageSend("")
    }

    // -------------ADD FAVORIS------------- \\  
    const addFavoris = async () => {

        if (liked == false) {
            setliked(true);

            var data = await fetch(`/add-favoris`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `IdFF=${bouteille._id}&IdViFF=${bouteille.IdVigneron._id}&tokenFF=${token}`
            })

        } else if (liked == false) {
            setliked(false);
            var rawResponse = await fetch(`/delete-favoris/${bouteille.Nom}/${token}`, {
                method: 'DELETE'
            });

        }}

        const [open, setOpen] = React.useState(false);
        const handleOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

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
                        <div id="parent" style={{ height: 130 }}>
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
                            <Typography variant="h4" component="p" style={{ margin: 0, fontSize: 14 }}>
                                {bouteille.IdVigneron.Domaine}
                            </Typography>
                            <Typography variant="h6" component="p" style={{ marginTop: -4, marginBottom: 10, fontSize: 14 }}>
                                {bouteille.IdVigneron.Ville}
                            </Typography>

                            <Typography variant="body2" color="textSecondary" component="p">
                                {bouteille.IdVigneron.Desc}
                            </Typography>
                            <IconButton style={{ outline: 'none', color: "#fdd835" }} aria-label="Message" onClick={() => { handleOpen(bouteille) }}  >
                                <MessageIcon />
                            </IconButton>

                        </CardContent>
                    </Collapse>
                </Card>


                <Modal
                    style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', marginRight: 40 }}
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <h5 id="transition-modal-title">Ecrire à : </h5>
                            <h2 style={{ color: "#fdd835" }} id="transition-modal-title">{bouteille.IdVigneron.Nom} </h2>

                            <Card style={{ outline: 'none', padding: 20, margin: 10, maxWidth: 600 }}>
                            <Avatar aria-label="recipe" className={classes.avatar} src={bouteille.PhotoVi}>
                        </Avatar>

                        <h5 style={{ marginTop: 10, marginBottom: 0 }}>
                            {bouteille.NomVi} </h5>
                        <Typography variant="h6" component="p" style={{ margin: 0, fontSize: 14 }}>
                            {bouteille.DomaineVi}
                        </Typography>
                        <Typography variant="h6" component="p" style={{ marginTop: -4, marginBottom: 10, fontSize: 14 }}>
                            {bouteille.VilleVi}
                        </Typography>

                            </Card>
                            <Card>
                            </Card>
                            <Card style={{ outline: 'none', padding: 20, margin: 10 }}>
                                <CardActions style={{ outline: 'none', paddingLeft: 50, paddingTop: 20 }}>
                                    <TextField style={{ outline: 'none' }} multiline id="standard-textarea" label="Message" fullWidth onChange={(e) => setMessageSend(e.target.value)} />
                                    <IconButton style={{ outline: 'none', color: "#fdd835" }} onClick={() => { Envoyer(); handleClose() }}>
                                        <Send />
                                    </IconButton>
                                </CardActions>
                            </Card>

                        </div>
                    </Fade>
                </Modal>


            </Grid>
        )
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
            padding: theme.spacing(2),
            borderRadius: 5
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
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
