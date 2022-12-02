import {
  Button,
  Card,
  Grid,
  IconButton,
  makeStyles,
  Step,
  StepLabel,
  Stepper,
  StepConnector,
  Typography,
  withStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import React, { useState, useEffect, useContext, Fragment } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import ListIcon from "@material-ui/icons/List";
import SettingsIcon from "@material-ui/icons/Settings";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./styles/OrderDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../../context/AppContext";
import { clearErrors, getOrderDetails } from "../../../actions/orderActions";
import { Skeleton } from "@material-ui/lab";
import { Status } from "../OrderList/OrderList";
import PageError from "../../Misc/PageError/PageError";
import MetaData from "../../Layout/MetaData/MetaData";
import {
  DELIVERED,
  IN_TRANSIT,
  PROCESSING,
} from "../../../constants/orderConstants";

const steps = ["Processing", "In transit", "Delivered"];

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <LocalShippingIcon />,
    3: <CheckCircleIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const OrderStatus = ({ orderStatus, steps }) => {
  return (
    <Grid
      container
      direction="column"
      align="center"
      className="orderDetails__main__status"
    >
      <Grid item xs={12}>
        <Stepper
          alternativeLabel
          activeStep={
            orderStatus === PROCESSING
              ? 0
              : orderStatus === IN_TRANSIT
              ? 1
              : orderStatus === DELIVERED && 2
          }
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>

      <Grid item xs={12}>
        {orderStatus === PROCESSING && (
          <Fragment>
            <Typography variant="subtitle1">
              Wait a bit while we process your order.
            </Typography>
            <br />
            <img
              alt="processing"
              src="/images/order_processing.svg"
              width="80%"
              height="300px"
            />
          </Fragment>
        )}
        {orderStatus === IN_TRANSIT && (
          <Fragment>
            <Typography>
              Sit tight! Your order is packed and on the way.
            </Typography>
            <br />
            <img
              alt="in transit"
              src="/images/order_in_transit.svg"
              width="80%"
              height="300px"
            />
          </Fragment>
        )}
        {orderStatus === DELIVERED && (
          <Fragment>
            <Typography>
              The wait is over! Enjoy your package.
              <br />
              Please don't forget to submit a review.
            </Typography>
            <br />
            <img
              alt="delivered"
              src="/images/order_delivered.svg"
              width="80%"
              height="300px"
            />
          </Fragment>
        )}
      </Grid>
    </Grid>
  );
};

const OrderDetails = ({ match }) => {
  const dispatch = useDispatch();
  const useStyles = makeStyles((theme) => ({
    listItem: {
      display: "flex",
      justifyContent: "center",
    },
    total: {
      fontWeight: 700,
    },
    title: {
      marginLeft: "15px",
    },
  }));
  const classes = useStyles();

  const { alertState } = useContext(AppContext);
  const [, setAlert] = alertState;
  const [pageError, setPageError] = useState(null);
  const [page, setPage] = useState("status");

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const {
    shippingInfo,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderStatus,
    createdAt,
    orderItems,
  } = { ...order };

  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    if (error) {
      setPageError(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, setAlert]);

  return (
    <div>
      {!pageError ? (
        <Grid
          className="orderDetails__main"
          direction="row"
          container
          justifyContent="center"
        >
          {!loading && order && <MetaData title={`Order ${order._id}`} />}
          <Grid
            item
            component={Card}
            elevation={5}
            xs={12}
            md={8}
            style={{ border: "1px solid lightgray" }}
          >
            <Grid container>
              <Grid item xs={12} md={8}>
                <Typography
                  className="orderDetails__main__heading"
                  variant="h4"
                >
                  {!loading && order ? (
                    `Order ${order._id}`
                  ) : (
                    <Skeleton animation="wave" />
                  )}
                </Typography>
              </Grid>
              {/* <Grid item xs={4} md={3}>
                            <Status status={orderStatus} size="large" />
                          </Grid> */}
              <Grid item xs={8} md={3}>
                <Typography
                  className="orderDetails__main__heading"
                  variant="h4"
                >
                  {!loading && order ? (
                    // <Status status={
                    //   paymentInfo ? "Paid"
                    //   : "Not Paid"
                    // } size="large" />
                    <Status status={orderStatus} size="large" />
                  ) : (
                    <Skeleton variant="rect" animation="wave" />
                  )}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                className="orderDetails__main__bar"
              >
                <Grid item xs={6}>
                  <Grid
                    direction="row"
                    component={Button}
                    container
                    onClick={() => setPage("status")}
                  >
                    <Grid item xs={12}>
                      <Typography className="orderDetails__main__bar__label">
                        <InfoIcon /> Status
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid
                    direction="row"
                    component={Button}
                    container
                    onClick={() => setPage("details")}
                  >
                    <Grid item xs={12}>
                      <Typography className="orderDetails__main__bar__label">
                        <ListIcon /> Details
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {page === "status" ? (
                !loading && order ? (
                  <OrderStatus orderStatus={orderStatus} steps={steps} />
                ) : (
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    height={400}
                    style={{ margin: "25px" }}
                  />
                )
              ) : (
                page === "details" && (
                  <Grid
                    container
                    direction="column"
                    align="center"
                    className="orderDetails__main__details"
                  >
                    <List disablePadding>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          {!loading && order ? (
                            <Grid container>
                              <Typography
                                variant="h5"
                                className={classes.title}
                              >
                                Items
                              </Typography>
                              {orderItems?.map((item) => (
                                <Grid item xs={12}>
                                  <ListItem key={item.product?._id}>
                                    <ListItemAvatar>
                                      <Avatar
                                        variant="square"
                                        src={item.product?.images[0]?.url}
                                        alt=""
                                        imgProps={{
                                          style: {
                                            width: "100%",
                                            objectFit: "contain",
                                          },
                                        }}
                                      />
                                    </ListItemAvatar>
                                    <Link
                                      className="product__info__link"
                                      to={`/product/${item.product?._id}`}
                                    >
                                      <ListItemText
                                        style={{ width: "85%" }}
                                        primary={item.product?.name}
                                        secondary={
                                          item.quantity > 1
                                            ? `${item.quantity} units`
                                            : `${item.quantity} unit`
                                        }
                                      />
                                    </Link>
                                    <Typography
                                      variant="body2"
                                      style={{ marginLeft: "auto" }}
                                    >
                                      $
                                      {Number(
                                        item.product?.price * item.quantity
                                      ).toFixed(2)}
                                    </Typography>
                                  </ListItem>
                                </Grid>
                              ))}
                              <Grid item xs={12}>
                                <ListItem className={classes.listItem}>
                                  <ListItemText primary="Cummulative" />
                                  <Typography
                                    variant="subtitle1"
                                    className={classes.total}
                                  >
                                    ${itemsPrice.toFixed(2)}
                                  </Typography>
                                </ListItem>
                              </Grid>
                            </Grid>
                          ) : (
                            <Skeleton
                              variant="rect"
                              animation="wave"
                              height={220}
                            />
                          )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                          {!loading && order ? (
                            <Grid container>
                              <Typography
                                variant="h5"
                                className={classes.title}
                              >
                                Breakdown
                              </Typography>
                              <Grid item xs={12}>
                                <ListItem className={classes.listItem}>
                                  <ListItemText primary="Base Total" />
                                  <Typography
                                    variant="subtitle1"
                                    className={classes.total}
                                  >
                                    ${itemsPrice.toFixed(2)}
                                  </Typography>
                                </ListItem>
                              </Grid>
                              <Grid item xs={12}>
                                <ListItem className={classes.listItem}>
                                  <ListItemText primary="Delivery Charges" />
                                  <Typography
                                    variant="subtitle1"
                                    className={classes.total}
                                  >
                                    ${shippingPrice.toFixed(2)}
                                  </Typography>
                                </ListItem>
                              </Grid>
                              <Grid item xs={12}>
                                <ListItem className={classes.listItem}>
                                  <ListItemText primary="Tax" />
                                  <Typography
                                    variant="subtitle1"
                                    className={classes.total}
                                  >
                                    ${taxPrice.toFixed(2)}
                                  </Typography>
                                </ListItem>
                              </Grid>
                              <Grid item xs={12}>
                                <ListItem className={classes.listItem}>
                                  <ListItemText primary="Total" />
                                  <Typography
                                    variant="h4"
                                    className={classes.total}
                                  >
                                    ${totalPrice.toFixed(2)}
                                  </Typography>
                                </ListItem>
                              </Grid>
                            </Grid>
                          ) : (
                            <Skeleton
                              variant="rect"
                              animation="wave"
                              height={220}
                            />
                          )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                          {!loading && order ? (
                            <Grid
                              container
                              justify="flex-start"
                              align="left"
                              style={{ marginLeft: "15px" }}
                            >
                              <Grid item xs={12}>
                                <Typography variant="h5" gutterBottom>
                                  Shipping Details
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography gutterBottom>
                                  <strong>Name: </strong>
                                  {order.user.name}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography gutterBottom>
                                  <strong>Phone: </strong>
                                  {shippingInfo.phoneNo}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography gutterBottom>
                                  <strong>Address: </strong>
                                  {[
                                    shippingInfo.address,
                                    shippingInfo.city,
                                    shippingInfo.country,
                                  ].join(", ")}
                                </Typography>
                              </Grid>
                            </Grid>
                          ) : (
                            <Skeleton
                              variant="rect"
                              animation="wave"
                              height={150}
                            />
                          )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                          {!loading && order ? (
                            <Grid container>
                              <Typography
                                variant="h5"
                                className={classes.title}
                              >
                                Additional Details
                              </Typography>
                              <Grid item xs={12}>
                                <ListItem className={classes.listItem}>
                                  <ListItemText primary="Payment Status" />
                                  <Typography
                                    variant="subtitle1"
                                    className={classes.total}
                                  >
                                    {paymentInfo ? (
                                      <Status status="Paid" />
                                    ) : (
                                      <Status status="Not Paid" />
                                    )}
                                  </Typography>
                                </ListItem>
                              </Grid>
                              <Grid item xs={12}>
                                <ListItem className={classes.listItem}>
                                  <ListItemText primary="Placed on" />
                                  <Typography
                                    variant="subtitle1"
                                    className={classes.total}
                                  >
                                    {String(createdAt).substring(0, 10)}
                                  </Typography>
                                </ListItem>
                              </Grid>
                            </Grid>
                          ) : (
                            <Skeleton
                              variant="rect"
                              animation="wave"
                              height={150}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </List>
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <PageError severity="error" error={pageError} />
      )}
    </div>
  );
};

export default OrderDetails;
