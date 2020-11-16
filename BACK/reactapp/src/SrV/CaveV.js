import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import NavigationV from '../Composants/NavigationV';
import CardVigneron from '../Composants/CardVigneron';

function CaveV({ token, sendMessage, message, bouteille }) {

    const [listVin, setlistVin] = useState([])
    const [reload, setreload] = useState(false)
    
    // ${token}
    useEffect(() => {
        async function loadData() {

            var rawResponse = await fetch(`/macave/${token}`);
            var response = await rawResponse.json();

            if (response.result == true) {
                setlistVin(response.cave);
                console.log(response.cave);
            }
        }
        loadData()
    }, [reload]);

    var background = ""

    if (listVin.length == 0) {

        background = { height: '100vh', paddingTop: 80, paddingLeft: 50, backgroundImage: "url(" + "cavevide.png" + ")",
        backgroundPosition: 'center',
        backgroundSize: '600px 600px',
        backgroundRepeat: 'no-repeat'
    }

    console.log(background)
    } else  {

        background = {paddingTop: 80, paddingLeft: 50, height: 'auto', backgroundColor: "#f5f5f5"}
        console.log(background)
    
    }

    return (
        <div>
            <Grid
                container
                direction="column" >
                <NavigationV/>
            </Grid>
            <Container fluid={true} style={background}>    
                         <Grid container 
                                justify="flex-start"
                                alignItems="flex-start"
                                wrap="wrap"
                >
                        {listVin.map((bouteille, i) => {
                            return (
                                <CardVigneron key={i} bouteille={bouteille} reload={reload} setreload={setreload} listVin={listVin} setlistVin={setlistVin} />
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
