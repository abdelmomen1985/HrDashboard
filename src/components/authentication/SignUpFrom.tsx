import React, { useRef } from 'react';

import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Typography,
    makeStyles,
    Container,
    LinearProgress
} from '@material-ui/core';

import { LockOutlined } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';

import { strings } from '../../localization/localization'; 



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignUp(props: any) {
    const classes = useStyles();
    const constants = strings.auth;

    // Input references
    const usernameInput = useRef<HTMLInputElement>(null)
    const emailInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)

    // Send Input data to the parent component
    const onInputChange = () => {
        const email = emailInput.current?.value
        const username = usernameInput.current?.value
        const password = passwordInput.current?.value

        let inputData = {
            email: email,
            username: username,
            password: password
        }
        props.sendDataToParent(inputData);
    };

    return (
        <>
            {props.loading && <LinearProgress color='secondary' />}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {constants.signup}
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label={constants.username}
                                    autoFocus
                                    inputRef={usernameInput}
                                    onChange={onInputChange}
                                    error={props.errors?.name ? true : false}
                                    helperText={props.errors?.name}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label={constants.email}
                                    name="email"
                                    autoComplete="email"
                                    inputRef={emailInput}
                                    onChange={onInputChange}
                                    error={props.errors?.email ? true : false}
                                    helperText={props.errors?.email}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label={constants.password}
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    inputRef={passwordInput}
                                    onChange={onInputChange}
                                    error={props.errors?.password ? true : false}
                                    helperText={props.errors?.password}
                                />
                            </Grid>
                        </Grid>


                        <Button
                            disabled={props.loading ? true: !props.button}
                            onClick={props.onSubmit}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            {constants.signup}
                    </Button>

                        <Grid container justify="flex-end">
                            <Grid item>

                                <Link onClick={() => props.history.push('/signin')} variant="body2">
                                    {constants.signInRedirect}
                                 </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </>
    );
}

export default withRouter(SignUp);