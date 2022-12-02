import React, { useState, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";
import { Link as RouteLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import MetaData from "../../Layout/MetaData/MetaData";

import { AppContext } from "../../../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../../actions/userActions";
import useQuery from "../../../hooks/useQuery";
import { Box, Card, ThemeProvider, useMediaQuery } from "@material-ui/core";
import { logo } from "../../Layout/Header/Header";
import { MaximumYellowRed, PrussianBlue } from "../../Misc/Colors/Colors";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "25px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: MaximumYellowRed,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login({ history }) {
  const classes = useStyles();
  const query = useQuery();
  const sm = useMediaQuery("(max-width:700px)");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { alertState } = useContext(AppContext);
  const [, setAlert] = alertState;
  const dispatch = useDispatch();
  const redirect = query.get("redirect") || "";

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push(`/${redirect}`);
    }
    if (error) {
      if (error === "Login to view this resource" && !redirect) return;
      setAlert({ message: error, type: "error" });
      dispatch(clearErrors());
    }
  }, [dispatch, history, setAlert, isAuthenticated, error, redirect]);

  return (
    <Box py={5}>
      {!loading && !isAuthenticated ? (
        <Grid container justifyContent="center">
          {!sm && (
            <Grid
              item
              component={Card}
              style={{
                backgroundColor: PrussianBlue,
                color: MaximumYellowRed,
                border: `1px solid ${PrussianBlue}`,
              }}
              elevation={5}
              maxWidth="xs"
            >
              <Grid container direction="column" alignItems="center">
                <ThemeProvider theme={logo}>
                  <Typography variant="h3" style={{ padding: "25px" }}>
                    StackedUP <ViewQuiltIcon fontSize="large" />
                  </Typography>
                </ThemeProvider>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon style={{ color: PrussianBlue }} />
                </Avatar>
              </Grid>
            </Grid>
          )}
          <Grid item>
            <Container
              component={Card}
              style={{ padding: "0", border: "1px solid lightgray" }}
              elevation={5}
              maxWidth="xs"
            >
              <MetaData title={!loading ? "Sign In" : "Signing In"} />
              {sm && (
                <div
                  item
                  style={{
                    backgroundColor: PrussianBlue,
                    color: MaximumYellowRed,
                    margin: "0",
                  }}
                >
                  <Grid container alignItems="center" justifyContent="center">
                    <ThemeProvider theme={logo}>
                      <Typography variant="h3" style={{ padding: "25px" }}>
                        StackedUP <ViewQuiltIcon fontSize="large" />
                      </Typography>
                    </ThemeProvider>
                  </Grid>
                </div>
              )}
              <div className={classes.paper}>
                <Typography
                  style={{ marginRight: "auto" }}
                  component="h1"
                  variant="h4"
                >
                  Sign In
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading ? <CircularProgress /> : "Sign In"}
                  </Button>
                  <Grid container>
                    <Grid item xs></Grid>
                    <Grid item>
                      <Link variant="body2" component={RouteLink} to="/signup">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
          </Grid>
        </Grid>
      ) : (
        <Grid
          style={{ minHeight: "100vh" }}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
