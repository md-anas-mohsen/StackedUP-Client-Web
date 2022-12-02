import { Grid, Typography, useMediaQuery } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import ProductCard from "../Product/ProductCard/ProductCard";
import "./styles/Home.css";
import MetaData from "../Layout/MetaData/MetaData";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getFeatured, getProducts } from "../../actions/productActions";
import ProductSkeleton from "../Product/ProductSkeleton/ProductSkeleton";
import { Fragment } from "react";
import { AppContext } from "../../context/AppContext";
import { Pagination, Rating, Skeleton } from "@material-ui/lab";
import useQuery from "../../hooks/useQuery";
import RangeSlider from "../Misc/RangeSlider/RangeSlider";
import { useHistory } from "react-router-dom";
import { LemonMeringue } from "../Misc/Colors/Colors";
import HomeCarousel from "./HomeCarousel/HomeCarousel";
import RangeSetter from "../Misc/RangeSetter/RangeSetter";
import { PAGE_LIMIT } from "../../constants/productConstants";

export const titleTheme = createTheme({
  typography: {
    fontFamily: ["Abril Fatface", "cursive"].join(","),
  },
});

const Home = () => {
  const {
    loading,
    products,
    error,
    count: productCount,
  } = useSelector((state) => state.products);
  const {
    loading: loadingFeatured,
    featured,
    error: featuredError,
  } = useSelector((state) => state.featured);
  const dispatch = useDispatch();
  const xs = useMediaQuery("(max-width:450px)");
  const sm = useMediaQuery("(max-width:600px)");
  const {
    alertState,
    priceState,
    keywordState,
    categoryState,
    ratingState,
    searchQueryState,
  } = useContext(AppContext);
  const [, setAlert] = alertState;
  const [searchQuery] = searchQueryState;
  const [keyword, setKeyword] = keywordState;
  const [category, setCategory] = categoryState;
  const [price, setPrice] = priceState;
  const [rating, setRating] = ratingState;
  const history = useHistory();

  const query = useQuery();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (category) {
      setPage(1);
    }
  }, [category]);

  //loading corresponding results for query
  useEffect(() => {
    setKeyword(query.get("keyword") || "");
    setCategory(query.get("category") || "");
    // setPrice([
    //   query.get("price[gte]") || null,
    //   query.get("price[lte]") || null,
    // ]);
    // setRating(query.get("rating[gte]") || 0);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (keyword) history.push(`/search/?${searchQuery}`);
  }, [keyword, price, history, searchQuery, setPrice]);

  useEffect(() => {
    if (!keyword && !category) {
      dispatch(getFeatured());
    }
    if (error) {
      return setAlert({ message: error, type: "error" });
    }
    if (featuredError) {
      return setAlert({ message: featuredError, type: "error" });
    }
    dispatch(
      getProducts(keyword, page, price, category && category?._id, rating)
    );
  }, [
    dispatch,
    error,
    featuredError,
    keyword,
    page,
    price,
    setAlert,
    category,
    rating,
  ]);

  useEffect(() => {
    setPage(1);
  }, [keyword, setPage]);

  return (
    <>
      {!keyword && !category && !loadingFeatured ? (
        <Card elevation={5} style={{ borderRadius: "0" }}>
          <div className="home__featured">
            {!loadingFeatured && featured && (
              <HomeCarousel featured={featured} />
            )}
          </div>
        </Card>
      ) : (
        !keyword &&
        !category &&
        loadingFeatured && <Skeleton variant="rect" height={sm ? 230 : 430} />
      )}
      <div className="home">
        <MetaData
          title={
            !keyword && !category
              ? "Home"
              : category && !keyword
              ? "Results for category"
              : keyword
          }
        />
        <Card
          elevation={5}
          style={{
            border: "1px solid lightgray",
            paddingTop: !sm ? "50px" : "0",
            backgroundColor: xs ? LemonMeringue : "#fff",
          }}
        >
          <ThemeProvider theme={titleTheme}>
            {(category || (!category && !keyword)) && (
              <Typography
                component="h1"
                className="home__title"
                variant={sm ? "h4" : "h3"}
                align="center"
              >
                {!category && !keyword ? "Latest Products" : category.name}
              </Typography>
            )}
          </ThemeProvider>
          {category || keyword ? (
            <div className="home__filters">
              <RangeSetter state={[price, setPrice]} title="Price" />
              <div>
                <Typography className="home__filters__ratings" gutterBottom>
                  Rating
                </Typography>
                <Rating
                  value={rating}
                  precision={0.5}
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>
            </div>
          ) : null}
          {keyword && !loading && (
            <Typography
              variant={productCount > 0 ? "subtitle1" : "h5"}
              align="center"
            >
              {productCount > 0
                ? `Results for '${keyword}'`
                : `No results found for '${keyword}'`}
            </Typography>
          )}
          <Grid container align="center" className="home__products">
            {loading ? (
              [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                return (
                  <Grid key={i} item xs={12} md={3}>
                    <ProductSkeleton key={i} />
                  </Grid>
                );
              })
            ) : (
              <Fragment>
                {products &&
                  products.map((product) => {
                    return (
                      <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
                        <ProductCard
                          key={product._id}
                          name={product.name}
                          image={product.images[0]}
                          price={product.price}
                          ratings={product.ratings}
                          numOfReviews={product.reviews?.length}
                          productID={product._id}
                        />
                      </Grid>
                    );
                  })}
              </Fragment>
            )}
          </Grid>
          {productCount > 0 ? (
            <div className="home__pagination">
              <Pagination
                size="large"
                count={Math.ceil(productCount / PAGE_LIMIT)}
                shape="rounded"
                page={page}
                defaultPage={1}
                onChange={(e, pageNum) => setPage(pageNum)}
                showFirstButton
                showLastButton
              />
            </div>
          ) : null}
        </Card>
      </div>
    </>
  );
};

export default Home;
