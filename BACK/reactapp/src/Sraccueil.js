import React, { useState } from 'react';
import './App.css';
import Navigation from './Nav';
import {Input,Button} from 'antd';

function Accueil() {

    const [signUpUsername, setSignUpUsername] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')
  
    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
  
    const [userExists, setUserExists] = useState(false)
  
    const [listErrorsSignin, setErrorsSignin] = useState([])
    const [listErrorsSignup, setErrorsSignup] = useState([])

    return (
        <div>
            <Navigation />

            <div className="Sign">

                <Input onChange={(e) => setSignUpUsername(e.target.value)} className="Login-input" placeholder="username" />

                <Input onChange={(e) => setSignUpEmail(e.target.value)} className="Login-input" placeholder="email" />

                <Input.Password onChange={(e) => setSignUpPassword(e.target.value)} className="Login-input" placeholder="password" />

                {/* {tabErrorsSignup} */}

                {/* <Button onClick={() => handleSubmitSignup()} style={{ width: '80px' }} type="primary">Sign-up</Button> */}

            </div>


        </div>
    );
}

export default Accueil;

