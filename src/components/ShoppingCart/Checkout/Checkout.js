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
import { AppContext, CheckoutContext } from "../../../context/AppContext";
import { countries } from "countries-list";
import { clearCart, saveShippingInfo } from "../../../actions/cartActions";
import { Link } from "react-router-dom";
import "../../Product/ProductCard/styles/ProductCard.css";
import MetaData from "../../Layout/MetaData/MetaData";
import { titleTheme } from "../../Home/Home";
import { MaximumRed, MaximumYellowRed } from "../../Misc/Colors/Colors";
import PageAlert from "../../Misc/PageAlert/PageAlert";
import { clearErrors, createOrder } from "../../../actions/orderActions";

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
  stepper: {
    padding: theme.spacing(3, 0, 5),
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

function Review({ setAlert, setActiveStep }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderError, isCreated, loadingOrder } = useSelector(
    (state) => state.newOrder
  );
  const { cartItems, shippingInfo, loading } = useSelector(
    (state) => state.cart
  );
  const { orderInfoState } = useContext(CheckoutContext);
  const [, setOrderInfo] = orderInfoState;

  const products = cartItems.map((item) => ({
    productID: item.productID,
    image: item.image,
    name: item.name,
    price: item.price,
    desc:
      item.quantity > 1 ? `${item.quantity} units` : `${item.quantity} unit`,
    qty: item.quantity,
  }));
  const addresses = [
    shippingInfo.address,
    shippingInfo.city,
    shippingInfo.province,
    shippingInfo.postalCode,
    shippingInfo.country,
  ];
  const basePrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const deliveryCharges = basePrice < 100 ? 0.15 * basePrice : 0;
  const tax = 0.05 * basePrice;
  const totalPrice = basePrice + deliveryCharges + tax;

  const useStyles = makeStyles((theme) => ({
    listItem: {
      padding: theme.spacing(1, 0),
    },
    total: {
      fontWeight: 700,
    },
    title: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  const placeOrder = () => {
    let orderItems = cartItems.map((item) => ({
      quantity: item.quantity,
      product: item.productID,
    }));
    dispatch(createOrder({ shippingInfo, orderItems }));
  };

  useEffect(() => {
    if (!loadingOrder && isCreated) {
      setAlert({ type: "success", message: "Order successfully placed" });
      setActiveStep(steps.length);
    }

    if (orderError) {
      setAlert({ type: "error", message: orderError });
    }
  }, [isCreated, setAlert, orderError, setActiveStep, loadingOrder]);

  return (
    <React.Fragment>
      <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.productID}>
            <ListItemAvatar>
              <Avatar
                variant="square"
                src={product.image}
                alt=""
                imgProps={{ style: { width: "100%", objectFit: "contain" } }}
              />
            </ListItemAvatar>
            <Link
              className="product__info__link"
              to={`/product/${product.productID}`}
            >
              <ListItemText
                style={{ width: "85%" }}
                primary={product.name}
                secondary={product.desc}
              />
            </Link>
            <Typography variant="body2">
              ${Number(product.price * product.qty).toFixed(2)}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Base Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${basePrice.toFixed(2)}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Delivery Charges" />
          <Typography variant="subtitle1" className={classes.total}>
            ${deliveryCharges.toFixed(2)}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Tax" />
          <Typography variant="subtitle1" className={classes.total}>
            ${tax.toFixed(2)}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${totalPrice.toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            <strong>Name: </strong>
            {user.name}
          </Typography>
          <Typography gutterBottom>
            <strong>Phone: </strong>
            {shippingInfo.phoneNo}
          </Typography>
          <Typography gutterBottom>
            <strong>Address: </strong>
            {addresses.join(", ")}
          </Typography>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={placeOrder}
          disabled={loading || loadingOrder}
        >
          {loading || loadingOrder ? <CircularProgress /> : `Place Order`}
        </Button>
      </Grid>
    </React.Fragment>
  );
}

function AddressForm() {
  const {
    addressState,
    cityState,
    postalCodeState,
    phoneNoState,
    countryState,
    provinceState,
  } = useContext(CheckoutContext);

  const [address, setAddress] = addressState;
  const [city, setCity] = cityState;
  const [postalCode, setPostalCode] = postalCodeState;
  const [phoneNo, setPhoneNo] = phoneNoState;
  const [province, setProvince] = provinceState;
  const [country, setCountry] = countryState;

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            variant="filled"
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="shipping address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            variant="filled"
            id="phoneNo"
            name="phoneNo"
            label="Phone Number"
            fullWidth
            autoComplete="phone number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            variant="filled"
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="filled"
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            variant="filled"
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select
              required
              variant="filled"
              id="country"
              name="country"
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={{ display: "flex", alignItems: "center" }}
            >
              {Object.entries(countries).map((country) => (
                <MenuItem
                  key={country[1].name}
                  value={country[1].name}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <em>{country[1].name}</em>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="Use this address for payment details"
            />
          </Grid> */}
      </Grid>
    </React.Fragment>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const steps = ["Shipping address", "Review your order"];

export default function Checkout({ openState }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { alertState } = useContext(AppContext);
  const [alert, setAlert] = alertState;
  const [openCheckout, setOpenCheckout] = openState;
  const [activeStep, setActiveStep] = React.useState(0);

  const { order, orderError, loadingOrder } = useSelector(
    (state) => state.newOrder
  );
  const { cartItems, shippingInfo, result, error, loading } = useSelector(
    (state) => state.cart
  );
  const [address, setAddress] = useState(shippingInfo?.address || "");
  const [city, setCity] = useState(shippingInfo?.city || "");
  const [postalCode, setPostalCode] = useState(shippingInfo?.postalCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo || "");
  const [province, setProvince] = useState(shippingInfo?.province || "");
  const [country, setCountry] = useState(shippingInfo?.country || "");
  const [orderInfo, setOrderInfo] = useState(
    sessionStorage.getItem("orderInfo") || {}
  );

  useEffect(() => {
    if (
      Object.keys(orderInfo).length === 0 &&
      orderInfo.constructor === Object
    ) {
      setActiveStep(0);
    }
  }, [orderInfo]);

  useEffect(() => {
    if (activeStep === steps.length) return;
    if (error) {
      setAlert({ type: "error", message: error });
    }
    if (orderError) {
      setAlert({ type: "error", message: orderError });
      dispatch(clearErrors());
    }
    if (result && activeStep === 2) {
      const order = {
        orderItems: cartItems,
        shippingInfo,
        itemsPrice: orderInfo.itemsPrice,
        taxPrice: orderInfo.taxPrice,
        totalPrice: orderInfo.totalPrice,
        paymentInfo: {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
        },
      };
      dispatch(createOrder(order));
      setAlert({ type: "success", message: "Order successfully placed" });
      setActiveStep(steps.length);
    }
  }, [
    error,
    result,
    setAlert,
    dispatch,
    orderError,
    cartItems,
    orderInfo,
    shippingInfo,
    activeStep,
  ]);

  const states = {
    addressState: [address, setAddress],
    cityState: [city, setCity],
    postalCodeState: [postalCode, setPostalCode],
    phoneNoState: [phoneNo, setPhoneNo],
    countryState: [country, setCountry],
    provinceState: [province, setProvince],
    orderInfoState: [orderInfo, setOrderInfo],
  };

  const handleNext = () => {
    if (activeStep === 0) {
      dispatch(
        saveShippingInfo({
          address,
          phoneNo,
          city,
          postalCode,
          province,
          country,
        })
      );
    } else if (activeStep === 1) {
      saveOrderInfo();
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleClose = () => {
    setOpenCheckout(false);
    if (activeStep === steps.length) {
      sessionStorage.removeItem("orderInfo");
      setOrderInfo({});
    }
    if (activeStep === 2) {
      setActiveStep(1);
    }
  };

  const saveOrderInfo = () => {
    sessionStorage.setItem("orderInfo", JSON.stringify(orderInfo));
  };

  return (
    <CheckoutContext.Provider value={states}>
      <Dialog
        fullScreen
        open={openCheckout}
        PaperProps={{ style: { backgroundColor: MaximumYellowRed } }}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <MetaData title="Checkout" />
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
              Checkout
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.layout}>
          <Paper className={classes.paper} elevation={5}>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <ThemeProvider theme={titleTheme}>
              <Typography component="h1" variant="h4" align="center">
                {steps[activeStep]}
              </Typography>
            </ThemeProvider>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <center>
                    <object
                      aria-label="order confirmed"
                      type="image/svg+xml"
                      data="images/order_confirmed.svg"
                      width="300px"
                    />
                  </center>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    {`Your order number is #${order?._id}. Track your order `}{" "}
                    <Link to={`/order/${order?._id}`}>here</Link>
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div style={{ padding: "20px 0" }}>
                    <div
                      style={{ display: activeStep === 0 ? "block" : "none" }}
                    >
                      <AddressForm />
                    </div>
                    <div
                      style={{
                        display:
                          activeStep === 1 || activeStep === 2
                            ? "block"
                            : "none",
                      }}
                    >
                      <Review
                        setAlert={setAlert}
                        setActiveStep={setActiveStep}
                      />
                    </div>
                  </div>
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={handleBack}
                        className={classes.button}
                        disabled={loading || loadingOrder}
                      >
                        Back
                      </Button>
                    )}
                    {activeStep !== steps.length - 1 && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                        disabled={
                          error || loading || loadingOrder || orderError
                        }
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </div>
        {alert && alert.message !== "Item Added to Cart" && (
          <PageAlert type={alert.type} message={alert.message} />
        )}
      </Dialog>
    </CheckoutContext.Provider>
  );
}
