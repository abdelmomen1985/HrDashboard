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
} from '@material-ui/core'

import Alert from '@material-ui/lab/Alert';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props: any) {
  const classes = useStyles();
  const constants = strings.auth;

  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  /**
   * Send the email & password input values to the parent component
   */

  const onInputChange = () => {
    const email = emailInput.current?.value;
    const password = passwordInput.current?.value;

    // Add both input values to one object then send it to the parent using props
    let inputData = {
      email: email,
      password: password
    };

    props.sendDataToParent(inputData);
  }


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
          {constants.signin}
        </Typography>

        <form className={classes.form} noValidate>

          {/* Email Address Field */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={constants.email}
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={emailInput}
            onChange={onInputChange}
          />

          {/* Password Field */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={constants.password}
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passwordInput}
            onChange={onInputChange}
          />


          {props.error !== "" && <Alert severity="error">{props.error}</Alert>}

          {/* Submit Button */}
          <Button
            disabled={props.loading}
            onClick={props.onSubmit}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            {constants.signin}
          </Button>

          <Grid container>
            <Grid item>
              <Link onClick={() => props.history.push('/signup')} variant="body2">
                {constants.signUpRedirect}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </>
  )
}

export default withRouter(SignIn);