import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'

import NavigationC from './NavigationC';
import CardFavoris from './CardFavoris';

function Favoris({ token, favoris }) {

    const [listVin, setlistVin] = useState([])
    const [deleted, setdeleted] = useState(true)
  
    useEffect(() => {
// ${token}
        async function loadData() {
      
            var rawResponse = await fetch(`/favoris/47PlPYcfoj7eORElqNzEHYRhWKNRm9vo`);
            var response = await rawResponse.json();
    
            if (response.result == true) {
              var favoris = response.favCaviste.Favoris;
              setlistVin(favoris);
              console.log('FAVORIS', favoris);           
            }
        }
    
        loadData()
      }, [deleted]);

    return (
        <div>
        <Grid
            container
            direction="column"
            alignItems="flex-start" >
            <NavigationC />
        </Grid>
        <Container fluid={true} style={{ width: "100%", height: "100vh", backgroundColor: "#f5f5f5" }}>
                  
                   <Grid
                    style={{paddingTop: 80}}
                    container
                    direction="row"
                    justify="flex-start"
                    // alignItems="flex-start"
                    spacing={2}
                    >
                    {listVin.map((favoris, i) => {
                        return (
                            <CardFavoris key={i} favoris={favoris} />
                        )
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
