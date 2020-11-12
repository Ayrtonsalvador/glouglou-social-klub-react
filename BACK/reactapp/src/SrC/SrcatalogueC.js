import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardText, CardBody, Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import NavigationC from './NavigationC';

function CatalogueC({ token, sendMessage, message }) {

    useEffect(() => {
        async function loadData() {

            var rawResponse = await fetch(`/catalogue/${token}`);
            var response = await rawResponse.json();

            if (response.result == true) {
                // setlisteVin(response.catalogue);
                console.log(response)
            } else {
                // setError(true)
            }
        }
        loadData()
    }, []);

    // -------------MAP CATALOGUE------------- \\  
    //     const cardVin = listeVin.map((vin, i) => {
    //         return (
    //             <Col xs="12" lg="5" xl="4">
    // <div>
    //       <Card>
    //         <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
    //         <CardBody>
    //           <CardTitle tag="h5">Card title</CardTitle>
    //           <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
    //           <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
    //           <Button>Button</Button>
    //         </CardBody>
    //       </Card>
    //     </div>
    //             </Col>
    //         )
    //     }


    return (
        <Container style={styles.container} fluid={true}>
            <NavigationC />
            <Row style={styles.row}>
                {/* {cardVin} */}
            </Row>
        </Container >
    );
}

const styles = ({
    label: {
        backgroundColor: "#FFFFFF",
    },
    container: {
        backgroundColor: "#FDD80B",
        height: 'auto',
    },
    form: {
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
        padding: 20,
        margin: 20,
        marginBottom: 10
    },
    row: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 100,
        marginLeft: 5,
        marginRight: 5
    }
})


function mapStateToProps(state) {
    console.log("TOKEN", state.token)
    return { token: state.token, userstatus: state.userstatus }
}

export default connect(
    mapStateToProps,
    null,
)(CatalogueC);
