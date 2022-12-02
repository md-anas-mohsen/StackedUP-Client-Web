import React, { Fragment, useContext, useState } from 'react';
import MetaData from '../../Layout/MetaData/MetaData';
import {useDispatch, useSelector} from 'react-redux';
import { Box, IconButton, Card, Grid, Typography, makeStyles, Button, ThemeProvider, useMediaQuery } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import './styles/Cart.css';
import '../../Product/ProductCard/styles/ProductCard.css';
import { addItemToCart, removeItemFromCart } from '../../../actions/cartActions';
import { titleTheme } from '../../Home/Home';
import Checkout from '../Checkout/Checkout';
import { AppContext } from '../../../context/AppContext';
import { Link } from 'react-router-dom';
import PageError from '../../Misc/PageError/PageError';

const useStyles = makeStyles(() => ({
    btn_red: {
        color: "#D62828"
    },
    btn_red_filled: {
        color: "white",
        backgroundColor: "#D62828",
        "&:hover": {
            backgroundColor: "#D00000",
        }
    },
    btn_blue_filled: {
        color: "white",
        backgroundColor: "#003049",
        "&:hover": {
            backgroundColor: "#00273b",
        }
    },
    btn_blue: {
        color: "#003049"
    },
    btn_orange: {
        backgroundColor: "#F77F00",
        color: "white",
        "&:hover": {
            color: "white",
            backgroundColor: "#dc7100",
        }
    },
}));



const Cart = ({history}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const sm = useMediaQuery("(max-width:600px)");
    const { cartItems } = useSelector(state => state.cart);
    const { isAuthenticated } = useSelector(state => state.auth);

    const [openCheckout, setOpenCheckout] = useState(false);
    const { alertState } = useContext(AppContext);
    const [,setAlert] = alertState;

    const addOne = (id, quantity, stock) => {
        if(quantity < stock) {
            const newQuantity = quantity + 1;
            dispatch(addItemToCart(id, newQuantity));
        }
    }

    const removeOne = (id, quantity) => {
        if(quantity > 1) {
            const newQuantity = quantity - 1;
            dispatch(addItemToCart(id, newQuantity));
        }   
    }

    const removeItem = (id) => {
        dispatch(removeItemFromCart(id));
    }

    const toCheckout = () => {
        if(isAuthenticated) {
            setOpenCheckout(true);
        } else {
            history.push('/signin/?redirect=cart');
            setAlert({type: "info", message: "Sign in to perform this action"});
        }
    }

    return (
        <div>
            <MetaData title="My Cart" />
            {cartItems.length !== 0 ?
            <div>
                <ThemeProvider theme={titleTheme}>
                    <Box ml={5} pt={5}>
                    <Typography variant={sm ? "h5" : "h4"}>
                        {cartItems.length}{cartItems.length === 1 ? ` item` : ` items`} in cart
                    </Typography>
                    </Box>
                </ThemeProvider>
                <Box p={sm ? 0 : 5}>
                    <Grid className="cart" container spacing={2} direction="row-reverse">
                    <Grid item md={8}>
                            <Grid className="cart__items" container component={Card} square={sm} elevation={5} justifyContent="center">
                                <Grid item xs={12}>
                                    <ThemeProvider theme={titleTheme}>
                                    <Grid className="cart__items__header" container>
                                        <Grid item xs={6}>
                                            <Typography align="center">
                                                Product
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography align="center">
                                                Price
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography align="center">
                                                Quantity
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography align="center">
                                                Total
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    </ThemeProvider>
                                </Grid>
                                {cartItems.map((item, i) => (
                                    <Fragment>
                                    <Box key={item.productID} p={2}>
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item xs={2}>
                                                <img
                                                    src={item.image}
                                                    alt=""
                                                    style={{width: "100%", objectFit: "contain"}}
                                                ></img>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Box ml={2}>
                                                    <Grid container direction="column" spacing={10}>
                                                        <Grid item xs={12}>
                                                            <Typography className="product__info__link" component={Link} to={`/product/${item.productID}`} 
                                                            variant="subtitle1">
                                                                {item.name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <IconButton
                                                                variant="contained" 
                                                                className={classes.btn_red}
                                                                onClick={() => removeItem(item.productID)}
                                                            >
                                                                <DeleteIcon fontSize="medium" />
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography align="center" variant={sm ? "subtitle1" : "h6"}>
                                                    ${item.price}
                                                </Typography>
                                            </Grid>
                                            <Grid item align="center" xs={2}>
                                                <Box ml={1}>
                                                <Grid container direction="column">
                                                    <Grid item>
                                                        <IconButton 
                                                            className={classes.btn_blue}
                                                            onClick={() => addOne(item.productID, item.quantity, item.stock)}
                                                        >
                                                            <AddIcon fontSize="small" />    
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography align="center">
                                                            {item.quantity}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <IconButton 
                                                            className={classes.btn_red}
                                                            onClick={() => removeOne(item.productID, item.quantity, item.stock)}
                                                        >
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Box ml={2}>
                                                <Typography align="center" variant={sm ? "subtitle1" : "h6"}>
                                                    ${(item.price*item.quantity).toFixed(2)}
                                                </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    {cartItems.length > 1 && i !== cartItems.length-1 
                                    && <Grid item xs={12}><hr /></Grid>}
                                    </Fragment>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item md={4}>
                            <Grid container component={Card} square={sm} elevation={5}>
                                <Grid item xs={12}>
                                    <Grid className="cart__items__header" container>
                                        <Grid item xs={12}>
                                            <ThemeProvider theme={titleTheme}>
                                            <Typography align="center" variant={sm ? "h5" : "h4"}>
                                                Order Summary
                                            </Typography>
                                            </ThemeProvider>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box p={2}>
                                    <Grid container justifyContent="space-between">
                                        <Grid item>
                                            <ThemeProvider theme={titleTheme}>
                                            <Typography>
                                                Quantity
                                            </Typography>
                                            </ThemeProvider>
                                        </Grid>
                                        <Grid item>
                                            <Typography>
                                                {cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} units
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}><hr /></Grid>
                                <Grid item xs={12}>
                                    <Box p={2}>
                                    <Grid container justifyContent="space-between">
                                        <Grid item>
                                            <ThemeProvider theme={titleTheme}>
                                            <Typography>
                                                Total
                                            </Typography>
                                            </ThemeProvider>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h5">
                                                ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}><hr /></Grid>
                                <Grid item xs={12}>
                                    <Box p={2}>
                                        <Button
                                            fullWidth
                                            className={classes.btn_orange}
                                            onClick={toCheckout}
                                        >
                                            Checkout
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </div>
            :<PageError error="No Items In Cart" />}
            <Checkout openState={[openCheckout, setOpenCheckout]} />
        </div>
    )
}

export default Cart;
