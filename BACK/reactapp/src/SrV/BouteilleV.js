import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import NavigationV from '../Composants/NavigationV';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { Container } from 'reactstrap';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Done from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { connect } from 'react-redux';
import AvatarEditor from 'react-avatar-editor'

function BouteilleV({ token, domaine }) {
    const classes = useStyles();
    const [disabled, setDisabled] = useState(true);

    const [NomRef, setNomRef] = useState("Non renseigné");
    const [Couleur, setCouleur] = useState("Non renseigné");
    const [Cepage, setCepage] = useState("Non renseigné");
    const [Millesime, setMillesime] = useState("Non renseigné");
    const [Appellation, setAppellation] = useState("Non renseigné");
    const [Desc, setDesc] = useState("Non renseigné");

    const [URLimage, setURLimage] = useState("jaune.jpg")

    // CHECKED BUTTON
    const [state, setState] = React.useState({ checked: false });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        setDisabled(!disabled)
    };

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        return <Redirect to='/CaveV' />
        setOpen(false);
    };

    // SELECTED BUTTON
    const ListCouleur = [
        { value: 'Rouge' },
        { value: 'Blanc' },
        { value: 'Rosé' },
        { value: 'Bulles' },
    ]


    // SUBMIT INFOS
    const URL = (event) => {
        setURLimage(event.target.files[0]);
    }

    const submitInfo = async () => {

        var data = new FormData();

        data.append('avatar', URLimage);

        var bottleinfos = {
            NomRef: NomRef,
            Couleur: Couleur,
            Cepage: Cepage,
            Millesime: Millesime,
            AOC: Appellation,
            Desc: Desc,
            token: token,
        };

        data.append('bottleinfos', JSON.stringify(bottleinfos));

        var newbottle = await fetch(`/AddVin`, {
            method: 'post',
            body: data
        })

        setNomRef("");
        setCouleur("");
        setCepage("");
        setAppellation("");
        setMillesime("");
        setDesc("")
    }

    return (
        <div>
            <NavigationV />
            <Container fluid={true} style={{ paddingTop: 80, width: "100%", height: "100%", backgroundColor: "#f5f5f5" }}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    // wrap="nowrap"
                    spacing={6}
                >

                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="space-between"
                        spacing={4}
                        item xl={4}
                        item xs={4}
                    >


                        <Paper className={classes.paper}
                            style={{ fontWeight: "bold", marginTop: 65, marginBottom: 40}}>

                            <h2>MA CAVE</h2>
                            <h5 style={{ color: "#fdd835" }}>{domaine}</h5>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={state.checked}
                                        onClick={handleChange}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Ajouter"
                            />
                        </Paper>

                        <Paper className={classes.paper}
                        >
                            <AvatarEditor
                                image={URLimage}
                                width={400}
                                height={200}
                                border={0}
                                color={[255, 255, 255, 0.6]}
                                scale={1.2}
                                style={{ margin: 50 }}

                            />
                            <div className={classes.rootbutton}>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={URL}
                                    disabled={disabled}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button disabled={disabled} style={{ margin: 10 }} color="primary" component="span">
                                        <h5 style={{ margin: 0 }}>Charger</h5>
                                        <IconButton disabled={disabled} color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                        </IconButton>
                                    </Button>
                                </label>

                            </div>
                        </Paper>
                    </Grid>


                    <Grid container
                        direction="column"
                        justify="space-between"
                        alignItems="flex-start"
                        item xl={3}
                        item xs={6}
                        style={{ margin: 50 }}>

                        <Paper className={classes.paper} style={{ marginLeft: 120, marginBottom: 40, padding: 20 }}>
                            <h2>MA BOUTEILLE</h2>
                            <form style={{ margin: 10 }} className={classes.rootfield} noValidate autoComplete="off">

                                <TextField style={{ margin: 10, width: 500 }} disabled={disabled} id="outlined-disabled" label="Nom de la référence" placeholder="Nom de la référence" defalutValue={NomRef} variant="outlined" onChange={(e) => setNomRef(e.target.value)} />

                                <TextField
                                    style={{ margin: 10, width: 500 }}
                                    id="outlined-select-currency"
                                    select
                                    label="Couleur"
                                    value={Couleur}
                                    onChange={(e) => setCouleur(e.target.value)}
                                    helperText="Choisir une couleur"
                                    variant="outlined"
                                >
                                    {ListCouleur.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField style={{ margin: 10, width: 500 }} disabled={disabled} id="outlined-basic" label="Cepage" placeholder="Cepage" defaultValue="" variant="outlined" onChange={(e) => setCepage(e.target.value)} />
                                <TextField style={{ margin: 10, width: 500 }} disabled={disabled} id="outlined-basic" label="Appellation" placeholder="Appellation" defaultValue="" variant="outlined" onChange={(e) => setAppellation(e.target.value)} />
                                <TextField style={{ margin: 10, width: 500 }} disabled={disabled} id="outlined-basic" label="Millesime" placeholder="Millesime" defaultValue="" variant="outlined" onChange={(e) => setMillesime(e.target.value)} />

                                <TextField style={{ margin: 10, width: 500 }} rows={5} disabled={disabled} id="standard-textarea" label="Description" placeholder="Quelques mots sur votre vin, son carractère, ses associations..." defaultValue="" onChange={(e) => setDesc(e.target.value)} multiline />

                                <Button disabled={disabled} color="primary" component="span" onClick={() => { submitInfo(); handleOpen() }}>
                                    <h5 style={{ margin: 0 }}>Referencer</h5>
                                    <IconButton disabled={disabled} color="primary" aria-label="upload picture" component="span">
                                        <Done />
                                    </IconButton>
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                    <Modal
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
                            <div className={classes.papermodal}>
                                <h5 id="transition-modal-title">Bouteille ajoutée au catalogue</h5>
                            </div>
                        </Fade>
                    </Modal>
                </Grid>
            </Container>
        </div >
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        borderRadius: 5
    },
    rootbutton: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    rootfield: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
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

function mapStateToProps(state) {
    return { token: state.token, domaine: state.domaine }
}

export default connect(
    mapStateToProps,
    null,
)(BouteilleV);