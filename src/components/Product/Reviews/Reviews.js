import React, { useState, useContext, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import {
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  ThemeProvider,
  CircularProgress,
} from "@material-ui/core";
import { AppContext } from "../../../context/AppContext";
import { Link } from "react-router-dom";
import "../../Product/ProductCard/styles/ProductCard.css";
import MetaData from "../../Layout/MetaData/MetaData";
import { titleTheme } from "../../Home/Home";
import { MaximumRed, MaximumYellowRed } from "../../Misc/Colors/Colors";
import PageAlert from "../../Misc/PageAlert/PageAlert";
import ReviewCard from "../ReviewCard/ReviewCard";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
    backgroundColor: MaximumYellowRed,
    padding: "25px 0",
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Reviews({ openState, reviews, productName }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { alertState } = useContext(AppContext);
  const [alert, setAlert] = alertState;
  const [openReviews, setOpenReviews] = openState;
  const { user } = useSelector((state) => state.auth);
  const [userReview, setUserReview] = useState(null);

  useEffect(() => {
    if (reviews && user) {
      setUserReview(reviews.find((review) => review.user?._id === user?._id));
    }
  }, [reviews, user]);

  const handleClose = () => {
    setOpenReviews(false);
  };

  return (
    <Dialog
      fullScreen
      open={openReviews}
      PaperProps={{ style: { backgroundColor: MaximumYellowRed } }}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <MetaData title={`Reviews for ${productName}`} />
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Reviews
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.layout}>
        {userReview && (
          <ReviewCard userReview key={userReview?._id} review={userReview} />
        )}
        {reviews?.map((review) =>
          review.user?._id !== user?._id ? (
            <ReviewCard key={review?._id} review={review} />
          ) : null
        )}
      </div>
    </Dialog>
  );
}
