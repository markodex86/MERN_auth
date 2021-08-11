import React, { useContext, useState, useEffect } from "react";
import { MainContext } from '../contexts/MainContext';
import { useHistory } from 'react-router-dom';
import AuthService from '../services/auth.service';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';


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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const Dash = () => {
  const classes = useStyles();

  const { jwt, setJwt } = useContext(MainContext);
  const [parsedData, setParsedData] = useState('')
  const history = useHistory();
  const logout = () => {
    AuthService.logout()
    setJwt('')
    return history.push('/')
  }
  useEffect(() => {
    try {
      return setParsedData(JSON.parse(atob(jwt.split('.')[1])))
    } catch (error) {
      AuthService.logout()
      setJwt('')
      return history.push('/')
    }
  }, [jwt, history, setJwt])
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <h1>Dash Page</h1>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonIcon />
          </Avatar>
          <pre>{JSON.stringify(parsedData, null, 2)}</pre>
        </div>

        <Button
          onClick={() => logout()}
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          Logout
          </Button>
      </Container>
    </div >
  );
};

export default Dash;
