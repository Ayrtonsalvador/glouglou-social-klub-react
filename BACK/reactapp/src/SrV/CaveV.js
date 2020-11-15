import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import NavigationV from '../Composants/NavigationV';
import CardVigneron from '../Composants/CardVigneron';
import MultipleSelect from '../Composants/MultipleSelect'

function CaveV({ token, sendMessage, message, bouteille }) {

    const [listVin, setlistVin] = useState([])
    const [deleted, setdeleted] = useState(false)
    
    // ${token}
    useEffect(() => {
        async function loadData() {

            var rawResponse = await fetch(`/macave/6r0oJJ3l1NL811RQIZNUaQs4aaLTfg1r`);
            var response = await rawResponse.json();

            if (response.result == true) {
                setlistVin(response.cave);
                console.log(response.cave);
            }
        }
        loadData()
    }, [deleted]);

    return (
        <div>
            <Grid
                container
                direction="column" >
                <NavigationV/>
                <MultipleSelect listVin={listVin} setlistVin={setlistVin} deleted={deleted} setdeleted={setdeleted}/>
            </Grid>
            <Container fluid={true} style={{ paddingTop: 20, paddingLeft: 75, height: '100vh', backgroundColor: "#f5f5f5" }}>    
                         <Grid container 
                                justify="flex-start"
                                alignItems="flex-start"
                                wrap="wrap"
                >
                        {listVin.map((bouteille, i) => {
                            return (
                                <CardVigneron key={i} bouteille={bouteille} />
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
)(CaveV);
