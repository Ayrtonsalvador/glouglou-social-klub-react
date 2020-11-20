import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Container } from 'reactstrap';
import Grid from '@material-ui/core/Grid';

import NavigationC from '../Composants/NavigationC';
import CardVin from '../Composants/CardVin';
import MultipleSelect from '../Composants/MultipleSelect'

function CatalogueC({ token, sendMessage, message, bouteille }) {

    const [listVin, setlistVin] = useState([])
    const [reload, setreload] = useState(false)

    useEffect(() => {
        async function loadData() {

            var rawResponse = await fetch(`/catalogue/${token}`);
            var response = await rawResponse.json();

            if (response.result == true) {
             setlistVin(response.catalogue);
            }
        }
        loadData()
    }, [reload]);

    return (
        <div>
            <Grid
                container
                direction="column"
            >
                <NavigationC />
                <MultipleSelect listVin={listVin} setlistVin={setlistVin} reload={reload} setreload={setreload} />
            </Grid>
            <Container fluid={true} style={{ backgroundSize: 'cover', backgroundColor: "#f5f5f5" }}>
                <Grid container
                    justify="flex-start"
                    alignItems="flex-start"
                    wrap="wrap"
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
