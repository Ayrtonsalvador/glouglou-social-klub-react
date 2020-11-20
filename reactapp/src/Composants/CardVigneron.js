import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Done from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import AvatarEditor from 'react-avatar-editor'
import token from '../reducers/token';


export default function CardVigneron({ bouteille, reload, setreload, token }) {
    const classes = useStyles();

    // SUPPRIMER
    const deleteRef = async (nom) => {
        await fetch(`/delete-ref/${nom}`, {
            method: 'DELETE'
        });
        setreload(!reload)
    }

    // MODAL
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // MODIF BOUTEILLE
    const [NomRef, setNomRef] = useState(bouteille.Nom);
    const [Couleur, setCouleur] = useState(bouteille.Couleur);
    const [Cepage, setCepage] = useState(bouteille.Cepage);
    const [Millesime, setMillesime] = useState(bouteille.Millesime);
    const [Appellation, setAppellation] = useState(bouteille.AOC);
    const [Desc, setDesc] = useState(bouteille.Desc);

    const ListCouleur = [
        { value: 'Rouge' },
        { value: 'Blanc' },
        { value: 'Rosé' },
        { value: 'Bulles' },
    ]

    const modifier = async (bouteille) => {

        var data = new FormData();

        var bottleinfos = {
            NomRef: NomRef,
            Couleur: Couleur,
            Cepage: Cepage,
            Millesime: Millesime,
            AOC: Appellation,
            Desc: Desc,
            _id: bouteille._id,
            token: token,
        };

        data.append('bottleinfos', JSON.stringify(bottleinfos));

        var newbottles = await fetch(`/modif-ref`, {
            method: 'post',
            body: data
        })

        var response = await newbottles.json();
        setreload(!reload)
    }

    return (

        <Grid item xs={6} md={3} xl={3} spacing={2}>
            <Card className={classes.root} style={{ margin: 10 }}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={bouteille.Photo}
                        title={bouteille._id}
                    />
                    <CardContent>
                        <h5 style={{ marginBottom: 0 }}>{bouteille.Nom}</h5>
                        <p style={{ marginBottom: 0 }}>{bouteille.Millesime}</p>
                        <p style={{ marginBottom: 0 }}>{bouteille.AOC}</p>

                        <Typography gutterBottom variant="h6" color="textSecondary" component="p">
                            {bouteille.Cepage}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {bouteille.Desc}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <IconButton style={{ outline: 'none' }} onClick={() => { deleteRef(bouteille.Nom) }} aria-label="add to favorites">
                        <DeleteIcon color="primary" />
                    </IconButton>
                    <Button style={{ marginRight: 20, outline: 'none' }} size="small" color="primary" onClick={() => { handleOpen(bouteille); }}>
                        Modifier les informations
                   </Button>
                </CardActions>

            </Card>


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
                    <div className={classes.paper} style={{ overflow: 'scroll', width: '80%', height: '80%', display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <h2 id="transition-modal-title">Modifier les informations</h2>


                        <TextField style={{ margin: 10, width: 600 }} id="outlined-disabled" label="Nom de la référence" defaultValue={NomRef}
                            variant="outlined" onChange={(e) => setNomRef(e.target.value)} />
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

                        <TextField style={{ margin: 10, width: 600 }} id="outlined-basic" label="Cepage" defaultValue={Cepage}
                            variant="outlined" onChange={(e) => setCepage(e.target.value)} />
                        <TextField style={{ margin: 10, width: 600 }} id="outlined-basic" label="Appellation" defaultValue={Appellation}
                            variant="outlined" onChange={(e) => setAppellation(e.target.value)} />
                        <TextField style={{ margin: 10, width: 600 }} id="outlined-basic" label="Millesime" defaultValue={Millesime}
                            variant="outlined" onChange={(e) => setMillesime(e.target.value)} />
                        <TextField style={{ margin: 10, width: 600 }} rows={3} id="standard-textarea" label="Description" defaultValue={Desc}
                            onChange={(e) => setDesc(e.target.value)} multiline />

                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <IconButton style={{ outline: 'none' }} onClick={() => { deleteRef(bouteille.Nom); handleClose() }} aria-label="add to favorites">
                                <DeleteIcon color="primary" />
                            </IconButton>
                            <Button style={{ marginRight: 20 }} size="small" color="primary" onClick={() => { modifier(bouteille); handleClose(); setreload(!reload) }}>
                                Modifier
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                    <Done />
                                </IconButton>
                            </Button>
                        </div>

                    </div>
                </Fade>

            </Modal>


        </Grid>

    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
    },
    media: {
        height: 200,
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