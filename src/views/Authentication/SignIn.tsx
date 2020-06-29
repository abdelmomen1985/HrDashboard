import React, { useState } from 'react';
import SignInForm from '../../components/authentication/SignInForm';

// HTTP Query
import { SignInMutation } from '../../queries/Authentication';

type Inputs = {
    email: string,
    password: string
};

export default function SignIn(props: any) {
    const [inputs, setInputs] = useState<Inputs>();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // Get input values from the sign in form
    const getInputData = (inputData: Inputs) => {
        setInputs(inputData);
    };

    const onSubmit = async () => {
        setLoading(true);
        const email = inputs?.email;
        const password = inputs?.password;

        // Return an error if any of the inputs are missing
        if (!email || !password){
            setLoading(false)
            setError('Email and password fields are required');
            return;
        } else setError('')

        const payload: object = { email, password };

        // HTTP Request

        SignInMutation(payload).then((result) => {
            setLoading(false);
            setError('');

            // Store the access token in local storage and redirect to the home page
            localStorage.setItem('auth', result.access_token);
            props.history.push('/')


        }).catch((error) => {
            setLoading(false);
            if (error) {
                if (error.status === 401) setError('Invalid email or password');
            }
        })

    }

    return (
        <SignInForm
            sendDataToParent={getInputData}
            onSubmit={onSubmit}
            error={error}
            loading={loading} />
    )
};

