import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarHalfRoundedIcon from "@material-ui/icons/StarHalfRounded";
import Rating from "@material-ui/lab/Rating";
import "./styles/ProductCard.css";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    height: 400,
    padding: "15px 0",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: "50px",
    border: "1px solid lightgray",
  },
  btn_orange: {
    backgroundColor: "#F77F00",
    color: "white",
    "&:hover": {
      color: "white",
      backgroundColor: "#dc7100",
    },
  },
});

const ProductCard = ({
  name,
  image,
  price,
  ratings,
  numOfReviews,
  productID,
}) => {
  const classes = useStyles();
  const xs = useMediaQuery("(max-width:450px)");

  return (
    <Card className={classes.root} elevation={xs ? 5 : 0}>
      <img src={image.url} alt={name} className="product__image"></img>
      <div className="product__info">
        <CardContent>
          <Link className="product__info__link" to={`/product/${productID}`}>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
          </Link>
          <div className="ratings">
            <Rating
              name="half-rating-read"
              value={ratings}
              precision={0.1}
              readOnly
            />
            <Typography variant="subtitle2" id="no_of_reviews">
              ({numOfReviews} Reviews)
            </Typography>
          </div>
          <Typography variant="h5">${price}</Typography>
        </CardContent>
        {/* <CardActions>
              <Button 
                size="small" 
                fullWidth 
                className={classes.btn_orange}
                component={Link}
                to={`/product/${productID}`}
              >
                View Details
              </Button>
          </CardActions> */}
      </div>
    </Card>
  );
};

export default ProductCard;
