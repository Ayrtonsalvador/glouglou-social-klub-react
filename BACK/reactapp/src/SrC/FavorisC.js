import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'

import NavigationC from '../Composants/NavigationC';
import CardFavoris from '../Composants/CardFavoris';
import CaveVide from './CaveVide'

function Favoris({ token, favoris }) {

    const [listVin, setlistVin] = useState([])
    const [deleted, setdeleted] = useState(true)
    const [vide, setvide] = useState(false)

    useEffect(() => {
        // ${token}
        async function loadData() {

            var rawResponse = await fetch(`/favoris/${token}`);
            var response = await rawResponse.json();

            if (response.result == true) {
                var favoris = response.favCaviste.Favoris;
                setlistVin(favoris);
                console.log('FAVORIS', favoris);
            }

        }
        loadData()
    }, [deleted]);


    if (listVin.length == 0 && !vide) {
        setvide(true)
        console.log("VIDE", vide);
    }
    if (listVin.length > 0 && vide) {
        setvide(false)
        console.log("PAS VIDE", vide);
    }

    return (
        <div>
            <Grid
                container
                direction="column"
                >
                <NavigationC />
            </Grid>
            <Container fluid={true} style={{ paddingTop: 90, paddingLeft: 75, backgroundColor: "#f5f5f5", height:'auto'}}>
            <Grid container   
                    justify="flex-start"
                    alignItems="flex-start"
                    wrap="wrap"
                    >
                    {listVin.map((bouteille, i) => {
                        return (<CardFavoris key={i} bouteille={bouteille} vide={vide} deleted={deleted} setdeleted={setdeleted} />)
                    })}
                    {/* <CaveVide/> */}
                </Grid>
            </Container>

        </div>
    );
}

function mapStateToProps(state) {
    return { token: state.token, userstatus: state.userstatus }
}

export default connect(
    mapStateToProps,
    null,
)(Favoris);
