import React, { useContext, useEffect } from "react";
import {
  alpha,
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import NotificationsIcon from "@material-ui/icons/Notifications";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Link, useHistory } from "react-router-dom";
import "./styles/Header.css";
import { AppContext } from "../../../context/AppContext";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button } from "@material-ui/core";
import { logout } from "../../../actions/userActions";
import { getAllCategories } from "../../../actions/productActions";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      main: "#D62828",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: ["Noto Sans JP", "sans-serif"].join(","),
  },
});

export const logo = createTheme({
  typography: {
    fontFamily: ["Satisfy", "cursive"].join(","),
    textDecoration: "none",
  },
});

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    position: "sticky",
    top: "0",
    zIndex: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    textDecoration: "none",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  activeCategory: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const history = useHistory();
  const {
    alertState,
    keywordState,
    categoryState,
    searchQueryState,
    ratingState,
    priceState,
  } = useContext(AppContext);
  const [, setAlert] = alertState;
  const [keyword, setKeyword] = keywordState;
  const [category, setCategory] = categoryState;
  const [, setRating] = ratingState;
  const [, setPrice] = priceState;
  const [searchQuery, setSearchQuery] = searchQueryState;
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { cartItems } = useSelector((state) => state.cart);
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.categories);

  const Categories = [
    "Electronics",
    "Cameras",
    "Computers",
    "Phones",
    "Consoles",
    "Accessories",
    "Books",
    "Apparel",
    "Footwear",
    "Sports",
    "Home",
  ];

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search/?${searchQuery}`);
  };

  const onLogOut = () => {
    setAlert({ type: "success", message: "Successfully Logged Out!" });
    dispatch(logout());
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isAuthenticated && !loading && (
        <MenuItem component={Link} to="/myprofile/orders">
          <IconButton color="inherit">
            <LocalShippingIcon />
          </IconButton>
          My Orders
        </MenuItem>
      )}
      {!isAuthenticated && !user && !loading ? (
        <div>
          <MenuItem component={Link} to="/signin">
            <IconButton color="inherit">
              <LockOpenIcon />
            </IconButton>
            Sign In
          </MenuItem>
          <MenuItem component={Link} to="/signup">
            <IconButton color="inherit">
              <PersonAddIcon />
            </IconButton>
            Sign Up
          </MenuItem>
        </div>
      ) : isAuthenticated && user && !loading ? (
        <div>
          <MenuItem component={Link} to="/myprofile">
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
            Profile
          </MenuItem>
          <MenuItem onClick={onLogOut}>
            <IconButton color="inherit">
              <ExitToAppIcon />
            </IconButton>
            Log Out
          </MenuItem>
        </div>
      ) : null}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={Link} to="/cart">
        <IconButton color="inherit">
          <Badge badgeContent={cartItems.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      {/* <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem> */}
      {isAuthenticated && user && !loading && (
        <MenuItem component={Link} to="/myprofile">
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <Avatar src={user.avatar?.url} alt={user.name} />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      )}
      {isAuthenticated && !loading && (
        <MenuItem onClick={onLogOut}>
          <IconButton color="inherit">
            <ExitToAppIcon />
          </IconButton>
          <p>Log Out</p>
        </MenuItem>
      )}
      {!isAuthenticated && !user && !loading && (
        <div>
          <MenuItem component={Link} to="/signin">
            <IconButton color="inherit">
              <LockOpenIcon />
            </IconButton>
            Sign In
          </MenuItem>
          <MenuItem component={Link} to="/signup">
            <IconButton color="inherit">
              <PersonAddIcon />
            </IconButton>
            Sign Up
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Toolbar className="header">
          <ThemeProvider theme={logo}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div
                className="header__logo"
                onClick={() => {
                  setCategory("");
                  setKeyword("");
                  setRating(0);
                  setSearchQuery("");
                }}
              >
                <Typography className={classes.title} variant="h6" noWrap>
                  StackedUP
                </Typography>
                <ViewQuiltIcon />
              </div>
            </Link>
          </ThemeProvider>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form>
              <InputBase
                placeholder="Enter Product Name..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                style={{ display: "none" }}
                onClick={handleSearch}
                type="submit"
              >
                search
              </button>
            </form>
          </div>
          <div className="header__categories">
            {categories.map((c) => (
              <MenuItem
                key={c._id}
                value={c._id}
                onClick={() => {
                  setCategory(c);
                  history.push(`/search?category=${c._id}`);
                }}
                className={category === c ? classes.activeCategory : ""}
              >
                {c.name}
              </MenuItem>
            ))}
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton component={Link} to="/cart" color="inherit">
              <Badge badgeContent={cartItems.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {/* <IconButton aria-label="show 17 new notifications" color="inherit">
                        <Badge badgeContent={17} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                        </IconButton> */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {isAuthenticated && user && !loading ? (
                <Avatar
                  src={user.avatar?.url}
                  alt={user.name}
                  className={classes.small}
                />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </ThemeProvider>
  );
};

export default Header;
