import React, { useState, useEffect } from 'react';
import SignUpForm from '../../components/authentication/SignUpFrom';

// HTTP Request
import { SignUpMutation, SignInMutation } from '../../queries/Authentication';

type Inputs = {
    email?: string,
    username?: string,
    password?: string
}

type Errors = {
    username?: string | null,
    email?: string | null,
    password?: string | null,
}

export default function SignUp(props: any) {
    const [inputs, setInputs] = useState<Inputs>();
    const [errors, setErrors] = useState<Errors>();
    const [loading, setLoading] = useState<boolean>(false);
    const [button, setButton] = useState<boolean>(false);

    const getInputData = (inputData: Inputs) => {
        setInputs(inputData)
    };

    const onSubmit = () => { 
        setLoading(true);
        const { email, password, username } = inputs!;

        const payload = {email, password, name: username};

        // Create the account
        SignUpMutation(payload).then(() => {

            // Sign in with the newly created acccount
            SignInMutation(payload).then((response) => {
                setLoading(false)
                localStorage.setItem('auth', response.access_token);
                props.history.push('/')
            });

        }).catch(error => {
            setLoading(false);
            const errors = error.data.error;

            // Set received errors to the state
            setErrors({
                username: errors.name && errors.name[0]!,
                email: errors.email && errors.email[0]!,
                password: errors.password && errors.password[0]!
            });
        });
    };


    // Enable the submit button only when all inputs are filled
    useEffect(() => {
       if(inputs?.email && inputs?.password && inputs?.username) setButton(true);
       else setButton(false);
    }, [inputs])


    return (
        <SignUpForm
            sendDataToParent={getInputData}
            onSubmit={onSubmit}
            errors={errors}
            loading={loading}
            button={button}
        />
    )
}