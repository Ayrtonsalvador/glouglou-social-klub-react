import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';


import { connect } from 'react-redux';
import NavigationC from './NavigationC';
import CardVin from './CardVin';
import MultipleSelect from './MultipleSelect'

function CatalogueC({ token, sendMessage, message, bouteille }) {

    const [listVin, setlistVin] = useState([])

    // ${token}
    useEffect(() => {
        async function loadData() {

            var rawResponse = await fetch(`/catalogue/47PlPYcfoj7eORElqNzEHYRhWKNRm9vo`);
            var response = await rawResponse.json();

            if (response.result == true) {
                setlistVin(response.catalogue);
                console.log(response.catalogue)
            }
        }
        loadData()
    }, []);

    return (
        <div>
            <Grid
                container
                direction="column"
                alignItems="flex-start" >
                <NavigationC />
                <MultipleSelect />
            </Grid>
            <Container fluid={true} style={{ width: "100%", height: "auto", backgroundColor: "#f5f5f5" }}>
                      
                       <Grid
                        style={{paddingTop: 40}}
                        container
                        direction="row"
                        justify="flex-start"
                        // alignItems="flex-start"
                        spacing={2}
                        >
                        {listVin.map((bouteille, i) => {
                            return (
                                <CardVin key={i} bouteille={bouteille} />
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
)(CatalogueC);
