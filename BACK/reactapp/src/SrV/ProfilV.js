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
import Edit from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { connect } from 'react-redux';
import AvatarEditor from 'react-avatar-editor'

function ProfilV({ token, AddDomaine }) {
    const classes = useStyles();
    const [disabled, setDisabled] = useState(true);

    const [nom, setNom] = useState("Nom Prénom")
    const [domaine, setDomaine] = useState("Domaine")
    const [ville, setVille] = useState("Ville")
    const [region, setRegion] = useState("Région")
    const [desc, setDesc] = useState("Description")

    const [URLimage, setURLimage] = useState(null)

    useEffect(() => {
        async function loadData() {
            //${token}
            var rawResponse = await fetch(`/info-v/4gpgPMGHKIOSgVJamz9I5DEg8E3DjyCO`);
            var response = await rawResponse.json();

            if (response.result == true) {

                setNom(response.user.Nom)
                setDomaine(response.user.Domaine)
                setVille(response.user.Ville)
                setRegion(response.user.Region)
                setDesc(response.user.Desc)

                if (response.user.Photo != null) {
                setURLimage(response.user.Photo)
                } else {
                setURLimage("jaune.jpg")
                }
            }
        }
        loadData()
    }, []);

    // CHECKED BUTTON
    const [state, setState] = React.useState({checked: false});
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
            domaine: domaine,
            ville: ville,
            region: region,
            desc: desc,
            token: token
        };

        data.append('userinfos', JSON.stringify(userinfos));

        var updateUser = await fetch(`/info-update-v`, {
            method: 'post',
            body: data
        })

        var response = await updateUser.json();
        console.log('responseFB', response)
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
                            style={{ fontWeight: "bold", marginTop: 65, marginBottom: 40, padding: 20 }}>
                            <h2>MON PROFIL</h2>
                            <h5 style={{color: "#fdd835"}}>{nom}</h5>
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

                        <Paper className={classes.paper}>
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
                                        <h5  style={{ margin: 0 }}>Charger</h5>
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
                                <TextField style={{ margin: 10, width: 600 }} disabled={disabled} id="outlined-basic" label={domaine} placeholder="Nom de domaine" variant="outlined" onChange={(e) => {setDomaine(e.target.value); AddDomaine(domaine)}} />
                                <TextField style={{ margin: 10, width: 600 }} disabled={disabled} id="outlined-basic" label={region} placeholder="Région" variant="outlined" onChange={(e) => setRegion(e.target.value)} />
                                <TextField style={{ margin: 10, width: 600 }} disabled={disabled} id="outlined-basic" label={ville} placeholder="Ville" variant="outlined" onChange={(e) => setVille(e.target.value)} />
                                <TextField style={{ margin: 10, width: 600 }} rows={5} disabled={disabled} id="standard-textarea" label="Description" defaultValue={desc} onChange={(e) => setDesc(e.target.value)} multiline />

                                <Button disabled={disabled} color="primary" component="span" onClick={() => {submitInfo()}}>
                                    <h5 style={{ margin: 0 }}>Editer</h5>
                                    <IconButton disabled={disabled} color="primary" aria-label="upload picture" component="span">
                                        <Edit/>
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

function mapDispatchToProps(dispatch) {
    return {
        addDomaine: function (domaine) {
            dispatch({ type: 'addDomaine', domaine: domaine })
        }
    }
}

function mapStateToProps(state) {
    return { token: state.token }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfilV);