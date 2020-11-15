import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import NavigationV from '../Composants/NavigationV';

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

    const [NomRef, setNomRef] = useState("Nom de la référence");
    const [Couleur, setCouleur] = useState("Couleur");
    const [Cepage, setCepage] = useState("Cepage");
    const [Millesime, setMillesime] = useState("Millesime");
    const [Appellation, setAppellation] = useState("Appellatton");
    const [Desc, setDesc] = useState("Quelques mots sur votre vin, son carractère, ses associations...");

    const [URLimage, setURLimage] = useState("jaune.jpg")

    // CHECKED BUTTON
    const [state, setState] = React.useState({ checked: false });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        setDisabled(!disabled)
    };

    // SELECTED BUTTON
    const ListCouleur = [
        { value: 'Rouge' },
        { value: 'Blanc' },
        { value: 'Rosé' },
        { value: 'Bulles' },
    ]

    const handleCouleur = (event) => {
        setCouleur(event.target.value);

    };

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

    }


    return (
        <div>
            <NavigationV />
            <Container fluid={true} style={{ padding: 20, paddingTop: 80, width: "100%", height: "100vh", backgroundColor: "#f5f5f5" }}>

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
                        justify="space-between"
                        spacing={4}
                        xl={4}
                        xs={4}
                        style={{ margin: 50 }}
                    >

                        <Paper className={classes.paper}
                            style={{ fontWeight: "bold", marginBottom: 40, padding: 20 }}>
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
                                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                            </div>
                        </Paper>
                    </Grid>


                    <Grid container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        xl={6}
                        xs={6}
                        style={{ margin: 50 }}>
                        <Paper className={classes.paper} style={{ marginBottom: 40, padding: 20 }}>
                            <h2>MA BOUTEILLE</h2>
                            <form style={{ margin: 10 }} className={classes.rootfield} noValidate autoComplete="off">

                                <TextField style={{ margin: 10, width: 600 }} disabled={disabled} id="outlined-disabled" label={NomRef} placeholder="Nom de la référence" variant="outlined" onChange={(e) => setNomRef(e.target.value)} />

                                <TextField
                                    style={{ margin: 10, width: 600 }}
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

                                <TextField style={{ margin: 10, width: 600 }} disabled={disabled} id="outlined-basic" label="Cepage" placeholder="Cepage" variant="outlined" onChange={(e) => setCepage(e.target.value)} />
                                <TextField style={{ margin: 10, width: 600 }} disabled={disabled} id="outlined-basic" label="Appellation" placeholder="Appellation" variant="outlined" onChange={(e) => setAppellation(e.target.value)} />
                                <TextField style={{ margin: 10, width: 600 }} disabled={disabled} id="outlined-basic" label="Millesime" placeholder="Millesime" variant="outlined" onChange={(e) => setMillesime(e.target.value)} />

                                <TextField style={{ margin: 10, width: 600 }} rows={5} disabled={disabled} id="standard-textarea" label="Description" placeholder="Quelques mots sur votre vin, son carractère, ses associations..." onChange={(e) => setDesc(e.target.value)} multiline />

                                <Button disabled={disabled} color="primary" component="span" onClick={() => { submitInfo(); setNomRef(""); setCouleur(""); setCepage(""); setAppellation(""); setMillesime(""); setDesc("") }}>
                                    <h5 style={{ margin: 0 }}>Referencer</h5>
                                    <IconButton disabled={disabled} color="primary" aria-label="upload picture" component="span">
                                        <Done />
                                    </IconButton>
                                </Button>
                            </form>
                        </Paper>
                    </Grid>

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
}));

function mapStateToProps(state) {
    return { token: state.token, domaine: state.domaine }
}

export default connect(
    mapStateToProps,
    null,
)(BouteilleV);