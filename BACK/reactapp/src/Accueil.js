import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { Container, Row, Form, FormGroup, Label, FormText } from 'reactstrap';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

function Accueil({ addStatus, addToken, userstatus, token }) {

    const classes = useStyles();
    const [index, setIndex] = useState(0);

    // -------------CARROUEL------------- \\
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

    const tutorialSteps = [
        {
            id: 1,
            label: 'BOIRE BIEN, BOIRE MIEUX',
            para: 'Notre équipe propose une selections de vins naturels et biodynamiques provenant de petits producteurs indépendants.',
        },
        {
            id: 2,
            label: 'COTE VIGNERON',
            para: 'Nous participons au développement des producteurs indépendants grâce à notre catalogue de références à disposition des cavistes.',
        },
        {
            id: 3,
            label: 'COTE CAVISTE',
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
            seterror(true)
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
            seterror(true)
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
            seterror(true)
        }
    }

    const [values, setValues] = React.useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [view, setview] = useState(false)
    var colorIcon = ""
    if (view) {
        colorIcon = "primary"
    } else {
        colorIcon = ""
    }

    // -------------ERREURS------------- \\

    const [error, seterror] = useState(false);

    var tabErrorsSignin = ErrorsSignin.map((error, i) => {
        return (<p key={i} color='#BB1F1F'>{error}</p>)
    })

    var tabErrorsSignup = ErrorsSignup.map((error, i) => {
        return (<p key={i} color='#BB1F1F'>{error}</p>)
    })

    // -------------REDIRECT------------- \\       

    if (userExists && userstatus == "Vigneron") {
        return <Redirect to='/CaveV' />
    }

    if (userExists && userstatus == "Caviste") {
        return <Redirect to='/CatalogueC' />
    }

    return (
        <Container fluid={true} style={{ width: "100%", height: "100vh", backgroundColor: "#000000" }}>

            <Paper style={{ backgroundColor: "#000000", height: "20%" }} className={classes.paper}></Paper>

            <Grid container direction="row"
                justify="center"
                alignItems="center">

                <img src="GGSCb.png" style={{ width: 500, height: 500, marginRight: 150 }} />

                <Grid item xs={3} direction="colmun" justify="center" alignItems="center">
                    <Grid>
                        <AutoPlaySwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            enableMouseEvents
                        >
                            {tutorialSteps.map((step, index) => (
                                <div style={{ color: "#FFFFFF", paddingBottom: 20, width: 350 }} key={step.id}>
                                    {Math.abs(activeStep - index) <= 2 ? (
                                        <div> <h2>{step.label}</h2><p style={{ fontSize: 20, marginBottom: 0 }}> {step.para} </p> </div>
                                    ) : null}
                                </div>
                            ))}
                        </AutoPlaySwipeableViews>
                    </Grid>

                    <Grid container direction="row" alignItems="center" >
                        <Grid>
                            <Button style={{ backgroundColor: "#fdd835", color: "#FFFFFF", marginTop: 20, outline: 'none' }} variant="outlined" color="primary" onClick={handleOpenSignIn}>Connexion</Button>
                            <Modal

                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={opensignin}
                                onClose={() => { handleCloseSignIn(); setErrorsSignin([]) }}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={opensignin}>
                                    <Grid
                                        container
                                        direction="column"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <div className={classes.papermodal} style={{ width: 400, height: 300 }}>
                                            <h5 id="transition-modal-title">J'ai un compte</h5>

                                            <TextField style={{ width: 300, marginBottom: 10, marginTop: 10 }} error={error} id="outlined-basic" label="Email" placeholder="@Glouglou.com" 
                                            variant="outlined" onChange={(e) => setSignInEmail(e.target.value)} helperText={{tabErrorsSignin}}/>
                                            <FormControl variant="outlined" style={{ width: 300 }} >
                                                <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-password"
                                                    type={values.showPassword ? 'text' : 'password'}
                                                    value={values.password}
                                                    onChange={(e) => setSignInPassword(e.target.value)}
                                                    error={error}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() => { handleClickShowPassword(); setview(!view) }}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                                color={colorIcon}
                                                            >
                                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>

                                                        </InputAdornment>
                                                    }
                                                    labelWidth={100}
                                                />
                                            </FormControl>
                                            
                                            <Button style={{ marginTop: 10, backgroundColor: "#fdd835", color: "#FFFFFF", outline: 'none' }} onClick={() => SubmitSignin()}>OK</Button>
                                        </div>
                                    </Grid>
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
                                onClose={() => { handleCloseSignUp(); setErrorsSignup([]) }}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={opensignup}>
                                    <div className={classes.papermodal} style={{ width: 400, height: 450 }}>
                                        <h5 id="transition-modal-title">Je créé mon compte</h5>

                                        <TextField style={{ width: 300, marginBottom: 10, marginTop: 10 }} error={error} id="outlined-basic" label="Nom Prénom" placeholder="Nom Prénom"
                                            variant="outlined" onChange={(e) => setSignUpUsername(e.target.value)} />

                                        <TextField style={{ width: 300, marginBottom: 10, marginTop: 10 }} error={error} id="outlined-basic" label="Email" placeholder="Email"
                                            variant="outlined" onChange={(e) => setSignUpEmail(e.target.value)} />

                                        <TextField style={{ width: 300, marginBottom: 10, marginTop: 10 }} error={error} id="outlined-basic" label="Telephone" placeholder="Telephone"
                                            variant="outlined" onChange={(e) => setSignUpTel(e.target.value)} helperText={{tabErrorsSignup}} />

                                        <FormControl variant="outlined" style={{ width: 300 }} >
                                            <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                type={values.showPassword ? 'text' : 'password'}
                                                value={values.password}
                                                onChange={(e) => setSignUpPassword(e.target.value)}
                                                error={error}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => { handleClickShowPassword(); setview(!view) }}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            color={colorIcon}
                                                        >
                                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>

                                                    </InputAdornment>
                                                }
                                                labelWidth={100}
                                            />
                                        </FormControl>
                                        <Grid container
                                            direction="row"
                                            justify="center"
                                            justify="space-around">
                                            <Button style={{  width: 90, marginTop: 20, backgroundColor: "#fdd835", color: "#FFFFFF", outline: 'none' }} onClick={() => SubmitSignupV()}>VIGNERON</Button>
                                            <Button style={{ width: 90, marginTop: 20, backgroundColor: "#fdd835", color: "#FFFFFF", outline: 'none' }} onClick={() => SubmitSignupC()}>CAVISTE</Button>
                                        </Grid>
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
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

