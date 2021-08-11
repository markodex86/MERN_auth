
import React, { useState, useContext, useEffect } from 'react';
import { MainContext } from '../contexts/MainContext';
import { useHistory } from 'react-router-dom'
import AuthService from '../services/auth.service'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}
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

const Signup = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { jwt, setJwt } = useContext(MainContext)
  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState('')
  const loading = (time) => new Promise((resolve) => setTimeout(resolve, time))
  const history = useHistory()

  const alertToggle = async (msg) => {
    setAlertText(msg)
    setShowAlert(true)
    await loading(4000)
    setShowAlert(false)
  }


  const handleChange = (event) => {
    switch (event.target.name) {
      case 'username':
        setUsername(event.target.value)
        break;
      case 'password':
        setPassword(event.target.value)
        break;
      default:
        break;
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = {
        username,
        password
      }
      const response = await AuthService.signup(user)
      const { token } = response?.data
      localStorage.setItem('token', token)
      setJwt(token)
      history.push('/dash')
    } catch (error) {
      alertToggle(error?.response?.data?.error)
    }
  }

  useEffect(() => {
    if (jwt || jwt !== '') {
      return history.push('/dash')
    }
  }, [jwt, history])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up Page
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => handleChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => handleChange(e)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {
            showAlert ?
              <Alert style={{ whiteSpace: 'pre-line' }} severity="warning">{alertText}</Alert>
              : null
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/" variant="body2">
                {"Have an Account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Signup
