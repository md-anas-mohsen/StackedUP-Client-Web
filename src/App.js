import Header from "./components/Layout/Header/Header";
import "./App.css";
import Footer from "./components/Layout/Footer/Footer";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetails from "./components/Product/ProductDetails/ProductDetails";
import { AppContext } from "./context/AppContext";
import { useEffect, useState } from "react";
import { loadUser, clearErrors } from "./actions/userActions";
import { useSelector } from "react-redux";
import store from "./store";
import PageAlert from "./components/Misc/PageAlert/PageAlert";
import Login from "./components/User/Login/Login";
import Signup from "./components/User/Signup/Signup";
import Profile from "./components/User/Profile/Profile";
import ProtectedRoute from "./components/Misc/ProtectedRoute/ProtectedRoute";
import Cart from "./components/ShoppingCart/Cart/Cart";
import { amber } from "@material-ui/core/colors";
import axios from "axios";
import OrderDetails from "./components/Order/OrderDetails/OrderDetails";
import Dashboard from "./components/Dashboard/Dashboard";
import NotFound404 from "./components/Misc/NotFound404/NotFound404";

let theme = createTheme({
  typography: {
    fontFamily: ["Noto Sans JP", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#003049",
    },
    secondary: {
      main: "#D62828",
    },
    amber: {
      main: amber[500],
    },
  },
});

theme = responsiveFontSizes(theme);
export const AppTheme = theme;

function App() {
  const [alert, setAlert] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([1, 100000]);
  const [rating, setRating] = useState(0);
  const [stripeApiKey, setStripeApiKey] = useState("");

  const states = {
    alertState: [alert, setAlert],
    searchQueryState: [searchQuery, setSearchQuery],
    keywordState: [keyword, setKeyword],
    categoryState: [category, setCategory],
    priceState: [price, setPrice],
    ratingState: [rating, setRating],
    stripeApiKey,
  };

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const queryStringObject = {
      keyword: keyword ? `keyword=${keyword}` : "",
      category: category ? `category=${category}` : "",
      price:
        price[0] > 1 || price[1] < 100000
          ? `price[gte]=${price[0]}&price[lte]=${price[1]}`
          : "",
      rating: rating > 0 ? `rating[gte]=${rating}` : "",
    };
    let queryString = "";
    for (const queryParam in queryStringObject) {
      if (queryStringObject[queryParam] !== "") {
        if (!queryString) {
          queryString += `${queryStringObject[queryParam]}`;
        } else {
          queryString += `&${queryStringObject[queryParam]}`;
        }
      }
    }
    setSearchQuery(queryString);
  }, [keyword, category, price, rating]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContext.Provider value={states}>
          <Header />
          <div className="App">
            <PageAlert />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/search" exact component={Home} />
              <ProtectedRoute
                path="/myprofile/orders"
                exact
                component={Profile}
              />
              <ProtectedRoute
                path="/myprofile/settings"
                exact
                component={Profile}
              />
              <ProtectedRoute path="/myprofile" exact component={Profile} />
              <ProtectedRoute path="/dashboard" exact component={Dashboard} />
              <Route path="/signin" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/product/:id" exact component={ProductDetails} />
              <Route path="/cart" exact component={Cart} />
              <Route path="/order/:id" exact component={OrderDetails} />
              <Route path="*" component={NotFound404} />
            </Switch>
          </div>
          {!loading && <Footer />}
        </AppContext.Provider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
