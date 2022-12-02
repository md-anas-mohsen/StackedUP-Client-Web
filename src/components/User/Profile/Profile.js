import {
  Avatar,
  Grid,
  Typography,
  Card,
  makeStyles,
  Button,
  IconButton,
  useMediaQuery,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import SettingsIcon from "@material-ui/icons/Settings";
import MetaData from "../../Layout/MetaData/MetaData";
import "./styles/Profile.css";
import OrderList from "../../Order/OrderList/OrderList";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

const Profile = ({ match, history }) => {
  const classes = useStyles();
  const sm = useMediaQuery("(max-width: 600px)");
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <div className="profile">
      {!loading && <MetaData title={`${user.name}'s Profile`} />}
      <Grid direction="row" container justifyContent="center">
        <Grid
          className="profile__main"
          container
          component={Card}
          elevation={5}
          xs={12}
          md={8}
        >
          <Grid
            className="profile__main__header"
            container
            direction="row"
            alignItems="center"
            xs={12}
          >
            <Avatar
              variant="square"
              src={user?.avatar?.url}
              alt={user?.name}
              className={classes.large}
            />
            <Typography variant="h4">
              {!loading ? user.name : <Skeleton width={400} />}
            </Typography>
            {/* <Typography variant="subtitle1">
                                {!loading && user.role === "admin" ? "ADMIN" : <Skeleton width={400} />}
                            </Typography> */}
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            className="profile__main__bar"
          >
            <Grid item component={Link} to="/myprofile/orders" xs={6}>
              <Grid direction="column" component={Button} container>
                <Grid item>
                  <IconButton>
                    <ListAltIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography>Orders</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item component={Link} to="/myprofile" xs={6}>
              <Grid direction="column" component={Button} container>
                <Grid item>
                  <IconButton>
                    <PermIdentityIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography>Info</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {match.path === "/myprofile" ? (
            <Grid className="profile__main__info" direction="column" xs={12}>
              <Grid container align="left" direction="column" xs={12}>
                <Grid item>
                  <Typography>Email</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5">
                    {!loading ? user.email : <Skeleton width={400} />}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container align="left" direction="column" xs={12}>
                <Grid item>
                  <Typography>Joined</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5">
                    {!loading ? (
                      String(user.createdAt).substring(0, 10)
                    ) : (
                      <Skeleton width={400} />
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            match.path === "/myprofile/orders" && (
              <Grid container justifyContent="center">
                <Grid
                  item
                  xs={12}
                  md={11}
                  style={{ overflowX: sm && "scroll" }}
                >
                  <OrderList />
                </Grid>
              </Grid>
            )
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
