import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { Container, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import NavigationC from "./SrC/NavigationC"
import NavigationV from "./SrV/NavigationV"

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

function Accueil({ addStatus, addToken, userstatus, token }) {

    const classes = useStyles();
    const [index, setIndex] = useState(0);

    // -------------CARROUEL------------- \\
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

    const tutorialSteps = [
        {  id: 1,
            label: 'BOIRE BIEN, BOIRE MIEUX',
            para: 'Notre équipe propose une selections de vins naturels et biodynamiques provenant de petits producteurs indépendants.',
        },
        { id: 2,
            label: 'CÔTÉ VIGNERONS',
            para: 'Nous participons au développement des producteurs indépendants grâce à notre catalogue de références à disposition des cavistes.',
        },
        {id: 3,
            label: 'CÔTÉ CAVISTES',
            para: 'Nous aidons les restaurateurs à étoffer leur carte grâce à une présélection de références de petits producteurs.',
        },
    ];
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    // -------------MODAL------------- \\
    const [opensignin, setOpenSignIn] = React.useState(false);
    const [opensignup, setOpenSignUp] = React.useState(false);


    const handleOpenSignIn = () => {
        setOpenSignIn(true);
    };
    const handleOpenSignUp = () => {
        setOpenSignUp(true);
    };

    const handleCloseSignIn = () => {
        setOpenSignIn(false);
    };

    const handleCloseSignUp = () => {
        setOpenSignUp(false);
    };

    // -------------INSCRIPTION------------ \\
    const [signUpUsername, setSignUpUsername] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpTel, setSignUpTel] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')

    const [ErrorsSignup, setErrorsSignup] = useState([])

    var SubmitSignupV = async () => {

        var data = await fetch(`/sign-up`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&telFromFront=${signUpTel}&passwordFromFront=${signUpPassword}&statusFromFront=Vigneron`
        })
        var response = await data.json()

        if (response.result == true) {
            addToken(response.saveVigneron.token);
            addStatus("Vigneron")
            setUserExists(true)

        } else {
            setErrorsSignup(response.error)
        }
    }

    var SubmitSignupC = async () => {

        var data = await fetch(`/sign-up`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&telFromFront=${signUpTel}&passwordFromFront=${signUpPassword}&statusFromFront=Caviste`
        })
        var response = await data.json()

        if (response.result == true) {
            addToken(response.saveCaviste.token);
            addStatus("Caviste")
            setUserExists(true)
        } else {
            setErrorsSignup(response.error)
        }
    }

    // -------------CONNEXION------------- \\
    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')

    const [userExists, setUserExists] = useState(false)
    const [ErrorsSignin, setErrorsSignin] = useState([])

    var SubmitSignin = async () => {

        var rawResponse = await fetch(`/sign-in`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
        })
        var response = await rawResponse.json();

        if (response.result == true) {
            addStatus(response.status);
            addToken(response.token);
            setUserExists(true)

        } else {
            setErrorsSignin(response.error);
            setinvalid(true)
        }
    }

    // -------------ERREURS------------- \\

    const [invalid, setinvalid] = useState(false);

    var tabErrorsSignin = ErrorsSignin.map((error, i) => {
        return (<p key={i} color='#BB1F1F'>{error}</p>)
    })

    var tabErrorsSignup = ErrorsSignup.map((error, i) => {
        return (<p key={i} color='#BB1F1F'>{error}</p>)
    })

    // -------------REDIRECT------------- \\       

    if (userExists && userstatus == "Vigneron") {
        return <Redirect to='/SrcaveV' />
    }

    if (userExists && userstatus == "Caviste") {
        return <Redirect to='/SrcatalogueC' />
    }

    return (
        <Container fluid={true} style={{ width: "100%", height: "100vh", backgroundColor: "#000000" }}>

            <Paper style={{ backgroundColor: "#000000", height: "15%" }} className={classes.paper}></Paper>

            <Grid container direction="row"
                justify="center"
                alignItems="center"
                spacing={8} >

                <Grid item xs={5} >
                    <Paper style={{ backgroundColor: "#000000" }} className={classes.paper}>
                        <img src="GGSCb.png" style={{ width: "80%", height: "80%" }} />
                    </Paper>
                </Grid>

                <Grid item xs={3} direction="colmun" justify="center" alignItems="center">
                    <Grid>
                    <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {tutorialSteps.map((step, index) => (
                                <div style={{ color: "#FFFFFF", paddingBottom: 20 }} key={step.id}>
                                    {Math.abs(activeStep - index) <= 2 ? (
                                        <div> <h4>{step.label}</h4><p> {step.para} </p> </div>
                                    ) : null}
                                </div>
                        ))}
                    </AutoPlaySwipeableViews>
                    </Grid>

                    <Grid container direction="row" alignItems="center" >
                        <Grid>
                            <Button style={{ backgroundColor: "#fdd835", color: "#FFFFFF", marginTop: 20 }} variant="outlined" color="primary" onClick={handleOpenSignIn}>Connexion</Button>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={opensignin}
                                onClose={handleCloseSignIn}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={opensignin}>
                                    <div className={classes.papermodal}>
                                        <h3 id="transition-modal-title">J'ai un compte</h3>
                                        <Form>
                                            <FormGroup>
                                                <Input invalid={invalid} type="email" name="email" id="Email" placeholder="@Glouglou.com"
                                                    onChange={(e) => setSignInEmail(e.target.value)} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Input invalid={invalid} type="password" name="password" id="Password" placeholder="Mot de passe"
                                                    onChange={(e) => setSignInPassword(e.target.value)} />
                                            </FormGroup>
                                            {tabErrorsSignin}
                                            <Button style={{ marginTop: 10, backgroundColor: "#fdd835", color: "#FFFFFF" }} onClick={() => SubmitSignin()}>OK</Button>
                                        </Form>
                                    </div>
                                </Fade>
                            </Modal>
                        </Grid>

                        <Grid>
                            <Button style={{ marginLeft: 20, marginTop: 20, color: "#FFFFFF" }} variant="outlined" onClick={handleOpenSignUp}>Je m'inscris</Button>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={opensignup}
                                onClose={handleCloseSignUp}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={opensignup}>
                                    <div className={classes.papermodal}>
                                        <h3 id="transition-modal-title">Je créé mon compte</h3>

                                        <Form>
                                            <FormGroup>
                                                <Input type="pseudo" name="pseudo" id="Pseudo" placeholder="Nom Prénom"
                                                    onChange={(e) => setSignUpUsername(e.target.value)} />
                                            </FormGroup>

                                            <FormGroup>
                                                <Input type="email" name="" id="Email" placeholder="@Glouglou.com"
                                                    onChange={(e) => setSignUpEmail(e.target.value)} />
                                            </FormGroup>

                                            <FormGroup>
                                                <Input type="telephone" name="" id="Telephone" placeholder="Telephone"
                                                    onChange={(e) => setSignUpTel(e.target.value)} />
                                            </FormGroup>

                                            <FormGroup>
                                                <Input type="password" name="password" id="examplePassword" placeholder="Mot de passe"
                                                    onChange={(e) => setSignUpPassword(e.target.value)} />
                                            </FormGroup>
                                            {tabErrorsSignup}
                                            <FormText>Je suis :</FormText>

                                            <Button style={{ marginTop: 10, backgroundColor: "#fdd835", color: "#FFFFFF" }} onClick={() => SubmitSignupV()}>VIGNERON</Button>
                                            <Button style={{ marginTop: 10, marginLeft: 20, backgroundColor: "#fdd835", color: "#FFFFFF" }} onClick={() => SubmitSignupC()}>CAVISTE</Button>

                                        </Form>

                                    </div>
                                </Fade>
                            </Modal>

                        </Grid>

                    </Grid>
                </Grid>
            </Grid>

        </Container>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: 'center',
    },
    rootC: {
        maxWidth: 400,
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: 'black',
    },
    img: {
        height: 255,
        display: 'block',
        maxWidth: 400,
        overflow: 'hidden',
        width: '100%',
    },

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    papermodal: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

}));

function mapDispatchToProps(dispatch) {
    return {
        addToken: function (token) {
            dispatch({ type: 'addToken', token: token })
        },
        addStatus: function (status) {
            dispatch({ type: 'addStatus', status: status })
        }
    }
}

function mapStateToProps(state) {
    return { userstatus: state.userstatus, token: state.token }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Accueil);


// {/* <FormGroup>
//         <Label for="exampleEmail">Valid input</Label>
//         <Input valid />
//         <FormFeedback valid>Sweet! that name is available</FormFeedback>
//         <FormText>Example help text that remains unchanged.</FormText>
//       </FormGroup>

//       <FormGroup>
//         <Label for="examplePassword">Invalid input</Label>
//         <Input invalid />
//         <FormFeedback>Mot de passe oublié ?</FormFeedback>
//       </FormGroup> */}

