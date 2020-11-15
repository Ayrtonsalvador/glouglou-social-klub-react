import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


export default function CardVigneron({ bouteille, deleted, setdeleted }) {
    const classes = useStyles();

    const deleteRef = async (nom) => {
        await fetch(`/delete-ref/${nom}`, {
            method: 'DELETE'
        });

        setdeleted(!deleted)
    }

    return (
        <Grid item xs={6} md={3} xl={3} spacing={2}>
            <Card className={classes.root} style={{ margin: 10 }}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={bouteille.Photo}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {bouteille.Nom}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                            {bouteille.Millesime}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                            {bouteille.Cepage}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                            {bouteille.AOC}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {bouteille.Desc}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <IconButton style={{ outline: 'none' }} onClick={() => { deleteRef(bouteille.Nom) }} aria-label="add to favorites">
                        <DeleteIcon color= "primary"  />
                    </IconButton>
                    <Button style={{marginRight: 20}} size="small" color="primary">
                        Modifier les informations
                   </Button>
                </CardActions>
            </Card>
        </Grid>

    );
}

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
});