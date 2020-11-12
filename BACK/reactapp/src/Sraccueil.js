import React, { useState } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    Form, FormGroup, Label, Input, Container, FormText, Row, Col,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
// import Icon from '@mdi/react'
// import { mdiInstagram } from '@mdi/js';

import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom'

function Accueil({ addStatus, addToken, userstatus }) {

    // -------------CARROUEL------------- \\
    const items = [
        {
            id: 1,
            altText: 'BOIRE BIEN, BOIRE MIEUX',
            caption: 'Notre "équipe propose une selections de vins naturels et biodynamiques provenant de petits producteurs indépendants.'
        },
        {
            id: 2,
            altText: 'CÔTÉ VIGNERONS',
            caption: 'Nous participons au développement des producteurs indépendants grâce à notre catalogue de références à disposition des cavistes.'
        },
        {
            id: 3,
            altText: 'CÔTÉ CAVISTES',
            caption: 'Nous aidons les restaurateurs à étoffer leur carte grâce à une présélection de références de petits producteurs.'
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const slides = items.map((item) => {
        return (
            <CarouselItem
                className="custom-tag"
                tag="div"
                key={item.id}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
            >
                <CarouselCaption style={{ padding: 0, fontSize: 20 }} className="text-warning" captionText={item.caption} captionHeader={item.altText} />
            </CarouselItem>
        );
    });

    // -------------INSCRIPTION------------ \\
    const [signUpUsername, setSignUpUsername] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpTel, setSignUpTel] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')

    const [ErrorsSignup, setErrorsSignup] = useState([])

    var SubmitSignupV = async () => {

        var data = await fetch(`/sign-up`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&telFromFront=${signUpTel}&passwordFromFront=${signUpPassword}&statusFromFront=Vigneron`
        })
        var response = await data.json()

        if (response.result == true) {
            addToken(response.saveVigneron.token);
            addStatus("Vigneron")
            setUserExists(true)

        } else {
            setErrorsSignup(response.error)
        }
    }


    var SubmitSignupC = async () => {

        var data = await fetch(`/sign-up`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&telFromFront=${signUpTel}&passwordFromFront=${signUpPassword}&statusFromFront=Caviste`
        })
        var response = await data.json()

        if (response.result == true) {
            addToken(response.saveCaviste.token);
            addStatus("Caviste")
            setUserExists(true)
        } else {
            setErrorsSignup(response.error)
        }
    }

    // -------------CONNEXION------------- \\
    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')

    const [userExists, setUserExists] = useState(false)
    const [ErrorsSignin, setErrorsSignin] = useState([])

    var SubmitSignin = async () => {

        var rawResponse = await fetch(`/sign-in`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
        })
        var response = await rawResponse.json()
        console.log(response)

        if (response.result == true) {
            addStatus(response.status);
            addToken(response.token);
            setUserExists(true)

        } else {
            setErrorsSignin(response.error);
            setinvalid(true)
        }
    }

    // -------------ERREURS------------- \\

    const [invalid, setinvalid] = useState(false);

    var tabErrorsSignin = ErrorsSignin.map((error, i) => {
        return (<p key={i} color='#BB1F1F'>{error}</p>)
    })

    var tabErrorsSignup = ErrorsSignup.map((error, i) => {
        return (<p key={i} color='#BB1F1F'>{error}</p>)
    })

    // -------------REDIRECT------------- \\       

    if (userExists && userstatus == "Vigneron") {
        return <Redirect to='/SrcaveV' />
    }

    if (userExists && userstatus == "Caviste") {
        return <Redirect to='/SrcatalogueC' />
    }

    return (
        <Container style={styles.container} fluid={true}>
            <Row style={styles.row}>
                <Col lg='4'>
                    <Card style={styles.form}>
                        <div className="d-flex justify-content-center">
                            <CardImg top style={{ width: '80%' }} src="GGSC.png" alt="GGSC logo" />
                        </div>
                        <CardBody style={{ padding: 0 }}>
                            <style>
                                {
                                    `.custom-tag {
                                width: 100%;
                                height: 300px;
                                background: white;
                                padding: 5,
                                }`
                                }
                            </style>
                            <Carousel
                                activeIndex={activeIndex}
                                next={next}
                                previous={previous}
                            >
                                {slides}
                            </Carousel>

                            <div className="d-flex flex-row">
                                {/* <Link href="https://www.instagram.com/glouglou.socialclub/?hl=fr"> */}
                                {/* <Icon path={mdiInstagram}
                                    size={1.5}
                                    horizontal
                                    vertical
                                    rotate={90}
                                    color="black"
                                    spin={false} /> */}
                                <CardText style={{ padding: 0, marginTop: 5, marginLeft: 5 }}>@GlouglouSocialClub</CardText>
                                {/* </Link> */}
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col lg='3'>
                    <Form style={styles.form} >
                        <Label style={styles.label}>Je m'inscris</Label>

                        <FormGroup>
                            <Input type="pseudo" name="pseudo" id="Pseudo" placeholder="Nom Prénom"
                                onChange={(e) => setSignUpUsername(e.target.value)} />
                        </FormGroup>

                        <FormGroup>
                            <Input type="email" name="" id="Email" placeholder="@Glouglou.com"
                                onChange={(e) => setSignUpEmail(e.target.value)} />
                        </FormGroup>

                        <FormGroup>
                            <Input type="telephone" name="" id="Telephone" placeholder="Telephone"
                                onChange={(e) => setSignUpTel(e.target.value)} />
                        </FormGroup>

                        <FormGroup>
                            <Input type="password" name="password" id="examplePassword" placeholder="Mot de passe"
                                onChange={(e) => setSignUpPassword(e.target.value)} />
                        </FormGroup>
                        {tabErrorsSignup}
                        <FormText>Tu es :</FormText>
                        <div className="d-flex justify-content-center">

                            <Button style={styles.button} onClick={() => SubmitSignupV()}>VIGNERON</Button>
                            <Button style={styles.button} onClick={() => SubmitSignupC()}>CAVISTE</Button>

                        </div>
                    </Form>
                </Col>

                <Col lg='3'>
                    <Form style={styles.form} >
                        <Label style={styles.label} >Je m'identifie</Label>
                        <FormGroup>
                            <Input invalid={invalid} type="email" name="email" id="Email" placeholder="@Glouglou.com"
                                onChange={(e) => setSignInEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Input invalid={invalid} type="password" name="password" id="Password" placeholder="Mot de passe"
                                onChange={(e) => setSignInPassword(e.target.value)} />
                        </FormGroup>
                        {tabErrorsSignin}
                        <Button onClick={() => SubmitSignin()}>OK</Button>
                    </Form>
                </Col>

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

function mapDispatchToProps(dispatch) {
    return {
        addToken: function (token) {
            dispatch({ type: 'addToken', token: token })
        },
        addStatus: function (status) {
            dispatch({ type: 'addStatus', status: status })
        }
    }
}

function mapStateToProps(state) {
    return { userstatus: state.userstatus, token: state.token }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Accueil);


// {/* <FormGroup>
//         <Label for="exampleEmail">Valid input</Label>
//         <Input valid />
//         <FormFeedback valid>Sweet! that name is available</FormFeedback>
//         <FormText>Example help text that remains unchanged.</FormText>
//       </FormGroup>

//       <FormGroup>
//         <Label for="examplePassword">Invalid input</Label>
//         <Input invalid />
//         <FormFeedback>Mot de passe oublié ?</FormFeedback>
//       </FormGroup> */}

