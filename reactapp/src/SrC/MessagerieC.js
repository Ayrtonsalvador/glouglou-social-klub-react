import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { Container } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Send from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';

import NavigationC from '../Composants/NavigationC';
import MessageC from '../Composants/MessageC';

function MessagerieC({ token, message }) {

    const classes = useStyles();
    const [listMessages, setListMessages] = useState([]);

    useEffect(() => {
        async function loadData() {
            var rawResponse = await fetch(`/mailbox-main/${token}`);
            var response = await rawResponse.json();

            if (response.result == true) {
                setListMessages(response.Caviste.MessagesR)
            }
        }
        loadData()
    }, []);


    return (
        <div>
            <NavigationC />
            <Container fluid={true} style={{ padding: 20, paddingTop: 60, width: "100%", height: '100vh', backgroundColor: "#f5f5f5" }}>


                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    wrap="nowrap"
                >
                    <Grid
                        container
                        direction="column"
                        justify="flex-strat"
                        alignItems="flex-start"
                        spacing={6}
                        item md={4}
                        xs={4}
                        style={{ margin: 40 }}
                    >

                        {listMessages.map((msg, i) => {
                            return (
                                <MessageC key={i} msg={msg} />
                            )
                        })}
                    </Grid>

                    <Grid item md={6} container
                        direction="row"
                        justify="flex-end"
                        alignItems="flex-end">

                        <div className={classes.paper} style={{ display: "flex", flexDirection: 'column', alignItems: 'flex-start', marginTop : 40}}>
                            <h5 id="transition-modal-title">Ecrire à : </h5>
                            <h2 style={{ color: "#fdd835" }} id="transition-modal-title">...</h2>

                            <Card style={{ outline: 'none', padding: 20, margin: 10, maxWidth: 600 }}>
                                <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', }} >

                                    <ListItemAvatar>
                                        <Avatar />
                                    </ListItemAvatar>
                                </div>

                            </Card>
                            <Card>
                
                            </Card>
                            <Card style={{ outline: 'none', padding: 20, margin: 10 }}>
                                <CardActions style={{ outline: 'none', paddingLeft: 50, paddingTop: 20 }}>
                                    <TextField style={{ outline: 'none' }} multiline id="standard-textarea" label="Message" />
                                    <IconButton style={{ outline: 'none', color: "#fdd835" }}>
                                        <Send />
                                    </IconButton>
                                </CardActions>
                            </Card>

                        </div >

                    </Grid>
                </Grid>

            </Container>
        </div >
    );
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


function mapStateToProps(state) {
    return { token: state.token }
}

export default connect(
    mapStateToProps,
    null,
)(MessagerieC);