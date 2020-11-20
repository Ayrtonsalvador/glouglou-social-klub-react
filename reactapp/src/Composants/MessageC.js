import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Send from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

function MessageC({ token, msg }) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [MessageSend, setMessageSend] = useState("")

    // MODAL
    const SeeMesssage = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // ECRIRE MESSAGE
    const Envoyer = async () => {
        var data = await fetch(`mailbox-write`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `MessageSend=${MessageSend}&vigneron=${msg.Nom}&caviste=${token}`
        })
        var response = await data.json()
        setMessageSend("")
    }

    if (msg.Texte !== undefined && msg.Texte.length > 100) {
        var splited = (msg.Texte.slice(0, 100) + "...")
    } else if (msg.Texte == undefined) {
        splited = msg.Texte
    }

    return (

        <Grid>
            <Card style={{ margin: 10 }}>
                <CardActionArea style={{ outline: 'none', padding: 20, maxHeight: 150, overflow: 'Hidden' }} onClick={() => { SeeMesssage(msg) }}>
                    <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', }} >

                        <ListItemAvatar>
                            <Avatar src={msg.Photo} />
                        </ListItemAvatar>
                        <div container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            spacing={6}
                        >
                            <h5 style={{ color: "#fdd835" }}>{msg.Nom}</h5>
                            <Typography >{splited}</Typography>
                        </div>
                    </div>
                </CardActionArea>
            </Card>
            <Modal
                style={{ display: "flex", flexDirection: 'row', justifyContent: 'flex-end', marginRight: 40 }}
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
                        <h5 id="transition-modal-title">Répondre à : </h5>
                        <h2 style={{ color: "#fdd835" }} id="transition-modal-title">{msg.Nom} </h2>

                        <Card style={{ outline: 'none', padding: 20, margin: 10, maxWidth: 600 }}>
                            <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', }} >

                                <ListItemAvatar>
                                    <Avatar src={msg.Photo} />
                                </ListItemAvatar>
                                <Typography>{msg.Texte}</Typography>
                            </div>

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
}));


export default connect(
    null,
    null,
)(MessageC);





