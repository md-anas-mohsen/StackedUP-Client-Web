import {
  Avatar,
  Card,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PrussianBlue } from "../../Misc/Colors/Colors";

const ReviewCard = ({ review, userReview }) => {
  return (
    <div>
      <Grid
        container
        component={Card}
        direction="column"
        alignContent="space-between"
        elevation={5}
        style={{
          padding: "15px",
          marginBottom: userReview ? "50px" : "25px",
        }}
      >
        <Grid item>
          <Grid
            container
            alignItems="center"
            style={
              userReview && {
                color: "white",
                backgroundColor: PrussianBlue,
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
              }
            }
          >
            <Grid item>
              <Avatar src={review.user?.avatar?.url} alt={review.user?.name} />
            </Grid>
            <Grid item style={{ marginLeft: "5px" }}>
              <Typography variant="h6">{review.user?.name}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="column">
          <Grid item>
            <Rating precision={0.5} value={review.rating} readOnly />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="filled"
              defaultValue={review.comment}
              multiline
              rows={5}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReviewCard;
