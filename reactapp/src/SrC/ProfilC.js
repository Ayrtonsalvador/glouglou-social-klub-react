import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Container } from 'reactstrap';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Edit from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AvatarEditor from 'react-avatar-editor'

import NavigationC from '../Composants/NavigationC';

function ProfilC({ token }) {
    const classes = useStyles();
    const [disabled, setDisabled] = useState(true);

    const [nom, setNom] = useState("Nom prénom")
    const [etablissement, setEtablissement] = useState("Nom d'etablissement")
    const [ville, setVille] = useState("Ville")
    const [region, setRegion] = useState("Région")
    const [desc, setDesc] = useState("Petite description de votre travail!")

    const [URLimage, setURLimage] = useState("jaune.jpg")

    useEffect(() => {
        async function loadData() {

            var rawResponse = await fetch(`/info-c/${token}`);
            var response = await rawResponse.json();

            if (response.result == true) {

                setNom(response.user.Nom)
                setEtablissement(response.user.Etablissement)
                setVille(response.user.Ville)
                setRegion(response.user.Region)
                setDesc(response.user.Desc)

                if (response.user.Photo != null) {
                    setURLimage(response.user.Photo)
                }
            }
        }
        loadData()
    }, []);

    // CHECKED BUTTON
    const [state, setState] = React.useState({ checked: false });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        setDisabled(!disabled)
    };

    // SUBMIT INFOS
    const URL = (event) => {
        setURLimage(event.target.files[0]);
    }

    const submitInfo = async () => {

        var data = new FormData();

        data.append('avatar', URLimage);

        var userinfos = {
            nom: nom,
            etablissement: etablissement,
            ville: ville,
            region: region,
            desc: desc,
            token: token
        };

        data.append('userinfos', JSON.stringify(userinfos));

        var updateUser = await fetch(`/info-update-c`, {
            method: 'post',
            body: data
        })
        var response = await updateUser.json();
    }

    // MODAL 
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <NavigationC />
            <Container fluid={true} style={{ padding: 20, paddingTop: 80, width: "100%", height: '100%', backgroundColor: "#f5f5f5" }}>

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
                        justify="flex-start"
                        alignItems="space-between"
                        spacing={4}
                        item xl={4}
                        item xs={4}
                    >

                        <Paper className={classes.paper}
                            style={{ fontWeight: "bold", marginTop: 65, marginBottom: 40, padding: 20 }}>

                            <h2>MON PROFIL</h2>
                            <h5 style={{ color: "#fdd835" }}>{nom}</h5>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={state.checked}
                                        onClick={handleChange}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Modifier"
                            />


                        </Paper>

                        <Paper className={classes.paper}
                        >
                            <AvatarEditor
                                image={URLimage}
                                width={200}
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
                        justify="space-between"
                        alignItems="flex-start"
                        item xl={3}
                        item xs={6}
                        style={{ margin: 50 }}>
                        <Paper className={classes.paper} style={{ marginBottom: 40, padding: 20 }}>
                            <h2>MES INFOS</h2>
                            <form style={{ margin: 10 }} className={classes.rootfield} noValidate autoComplete="off">

                                <TextField style={{ margin: 10, width: 600 }} disabled={disabled} id="outlined-disabled" label={nom} placeholder="Nom Prénom" variant="outlined" onChange={(e) => setNom(e.target.value)} />
                                <TextField style={{ margin: 10, width: 600 }} disabled={disabled} id="outlined-basic" label={etablissement} placeholder="Nom d'etablissement" variant="outlined" onChange={(e) => setEtablissement(e.target.value)} />
                                <TextField style={{ margin: 10, width: 600 }} disabled={disabled} id="outlined-basic" label={region} placeholder="Région" variant="outlined" onChange={(e) => setRegion(e.target.value)} />
                                <TextField style={{ margin: 10, width: 600 }} disabled={disabled} id="outlined-basic" label={ville} placeholder="Ville" variant="outlined" onChange={(e) => setVille(e.target.value)} />
                                <TextField style={{ margin: 10, width: 600 }} rows={5} disabled={disabled} id="standard-textarea" label="Description" defaultValue={desc} onChange={(e) => setDesc(e.target.value)} multiline />

                                <Button disabled={disabled} color="primary" component="span" onClick={() => { submitInfo(); handleOpen() }}>
                                    <h5 style={{ margin: 0 }}>Editer</h5>
                                    <IconButton disabled={disabled} color="primary" aria-label="upload picture" component="span">
                                        <Edit />
                                    </IconButton>
                                </Button>
                            </form>
                        </Paper>
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
                                    <h5 id="transition-modal-title">Modification ajoutée</h5>
                                </div>
                            </Fade>
                        </Modal>
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
    return { token: state.token }
}

export default connect(
    mapStateToProps,
    null,
)(ProfilC);