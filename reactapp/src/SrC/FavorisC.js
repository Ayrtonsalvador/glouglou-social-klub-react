import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Container } from 'reactstrap';
import Grid from '@material-ui/core/Grid';

import NavigationC from '../Composants/NavigationC';
import CardFavoris from '../Composants/CardFavoris';

function Favoris({ token, favoris }) {

    const [listVin, setlistVin] = useState([])
    const [deleted, setdeleted] = useState(true)

    useEffect(() => {
        async function loadData() {

            var rawResponse = await fetch(`/favoris/${token}`);
            var response = await rawResponse.json();

            if (response.result == true) {
                var favoris = response.favCaviste.Favoris;
                setlistVin(favoris);
            }

        }
        loadData()
    }, [deleted]);


    var background = ""

    if (listVin.length == 0) {

        background = { height: '100vh', paddingLeft: 75, backgroundImage: "url(" + "cavevide.png" + ")",
        backgroundPosition: 'center',
        backgroundSize: '600px 600px',
        backgroundRepeat: 'no-repeat'}

    } else  {
        background = { paddingTop: 90, paddingLeft: 75, backgroundColor: "#f5f5f5", height:'auto'}    
    }

    return (
        <div>
            <Grid
                container
                direction="column"
                >
                <NavigationC />
            </Grid>
            <Container fluid={true} style={background}>
            <Grid container   
                    justify="flex-start"
                    alignItems="flex-start"
                    wrap="wrap"
                    >
                    {listVin.map((bouteille, i) => {
                        return (<CardFavoris key={i} bouteille={bouteille} deleted={deleted} setdeleted={setdeleted} />)
                    })}
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
