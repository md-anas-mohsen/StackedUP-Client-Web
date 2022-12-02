import React, {useContext, useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link as RouteLink }from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import PhotoIcon from '@material-ui/icons/Photo'
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearErrors } from '../../../actions/userActions';
import { AppContext } from '../../../context/AppContext';
import { Box, Card, CircularProgress, ThemeProvider, useMediaQuery } from '@material-ui/core';
import { MaximumYellowRed, PrussianBlue } from '../../Misc/Colors/Colors';
import { logo } from '../../Layout/Header/Header';
import MetaData from '../../Layout/MetaData/MetaData';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: "25px"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: MaximumYellowRed,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  imageInput: {
    display: 'none'
  },
}));

export default function Signup({history}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sm = useMediaQuery("(max-width:700px)");

  const {alertState} = useContext(AppContext);
  const [,setAlert] = alertState;
  const { isAuthenticated, error, loading } = useSelector(state => state.auth);

  const [userInfo, setUserInfo] = useState({
      name: '',
      email: '',
      password: '',
  });

  const { name, email, password } = userInfo;

  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
        history.push('/')
    }
    if (error) {
      if(error === "Login to view this resource") return;
      setAlert({type: "error", message: error});
      dispatch(clearErrors());
    }
  }, [dispatch, setAlert, isAuthenticated, error, history]);

  const handleChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
          if (reader.readyState === 2) {
              setAvatar(reader.result);
          }
      }
      reader.readAsDataURL(e.target.files[0]);
    } else {
        setUserInfo(prevInfo => ({ ...prevInfo, [e.target.name]: e.target.value }));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set('email', email);
    formData.set('password', password);
    formData.set('avatar', avatar);
    
    dispatch(register(formData));    
  }

  return (
    <Box py={5}>
      <MetaData title={!loading ? "Sign Up" : "Signing Up"} />
          {!loading && !isAuthenticated ?
          <Grid container justifyContent="center">
            {!sm && 
            <Grid item component={Card} style={{ backgroundColor: PrussianBlue, color: MaximumYellowRed, border: `1px solid ${PrussianBlue}` }} elevation={5} maxWidth="xs">
              <Grid container direction="column" alignItems="center">
                <ThemeProvider theme={logo}>
                  <Typography variant="h3" style={{padding: "25px"}}>
                    StackedUP <ViewQuiltIcon fontSize="large" />
                  </Typography>
                </ThemeProvider>
                <Avatar className={classes.avatar}>
                  <PersonAddOutlinedIcon style={{ color: PrussianBlue }} />
                </Avatar>
              </Grid>
            </Grid>}
            <Grid item>
            <Container component={Card} maxWidth="xs" elevation={5} style={{padding: "0", border: "1px solid lightgray"}}>
              {sm &&
                    <div item style={{backgroundColor: PrussianBlue, color: MaximumYellowRed, margin: "0" }}>
                      <Grid container alignItems="center" justifyContent="center">
                        <ThemeProvider theme={logo}>
                          <Typography variant="h3" style={{padding: "25px"}}>
                            StackedUP <ViewQuiltIcon fontSize="large" />
                          </Typography>
                        </ThemeProvider>
                      </Grid>
                    </div>}
              <div className={classes.paper}>
                <Typography style={{marginRight: "auto"}} component="h1" variant="h4">
                  Sign Up
                </Typography>
                <form className={classes.form} noValidate>
                  <Grid container spacing={2}>
                  <Grid xs={12} style={{padding: "10px 0"}} container direction="column" justifyContent="center" alignItems="center">
                      <Avatar
                        src={avatar}
                        alt=""
                        className={classes.large}
                      > 
                      </Avatar>
                      <input 
                        onChange={handleChange} 
                        accept="image/*" 
                        name="avatar" 
                        className={classes.imageInput} 
                        id="icon-button-file" 
                        type="file" 
                      />
                      <label htmlFor="icon-button-file">
                        <Button 
                          aria-label="upload picture" 
                          component="span"
                          startIcon={<PhotoIcon />}
                          className={classes.changePicture}
                        >
                          Change 
                        </Button>
                      </label>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="name"
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        autoFocus
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress /> : "Sign Up"}
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                    <Link variant="body2" component={RouteLink} to="/signin">
                        Already have an account? Sign in
                    </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
            </Grid>
          </Grid>
          : <Grid style={{minHeight: "100vh"}} container justifyContent="center" alignItems="center">
              <Grid item>
                <CircularProgress />
              </Grid>
            </Grid>}
        </Box>
  );
}