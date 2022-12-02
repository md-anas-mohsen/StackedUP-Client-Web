import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Grid, TextField, Tooltip } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

export default function RangeSetter({ state, title }) {
  const classes = useStyles();
  const [value, setValue] = state;

  return (
    <div className={classes.root}>
      <Grid container align="center" justify="center">
        <Grid item xs={12}>
          <Typography id="range-slider" gutterBottom>
            {title}
          </Typography>
        </Grid>
        <Grid style={{ margin: "5px" }} item xs={6}>
          <TextField
            required
            variant="outlined"
            id="minPrice"
            label="Minimum Price"
            fullWidth
            value={value[0] || 0}
            onChange={(e) =>
              setValue((prev) => [
                !isNaN(e.target.value) ? Number(e.target.value) : 0,
                prev[1],
              ])
            }
          />
        </Grid>
        <Grid style={{ margin: "5px" }} item xs={6}>
          <TextField
            required
            variant="outlined"
            id="maxPrice"
            label="Maximum Price"
            fullWidth
            value={value[1] || 99999999}
            onChange={(e) =>
              setValue((prev) => [
                prev[0],
                !isNaN(e.target.value) ? e.target.value : 99999999,
              ])
            }
          />
        </Grid>
      </Grid>
    </div>
  );
}
