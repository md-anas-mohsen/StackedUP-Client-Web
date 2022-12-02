import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

export default function RangeSlider({state, title, unit, marks, min, max}) {
  const classes = useStyles();
  const [value, setValue] = state;

  function ValueLabelComponent(props) {
    const { children, open, value } = props;
  
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={`${unit}${value}`}>
        {children}
      </Tooltip>
    );
  }
  
  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
  };


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        {title}
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        ValueLabelComponent={ValueLabelComponent}
        aria-labelledby="range-slider"
        getAriaValueText={() => `${unit}${value}`}
        marks={marks}
        min={min}
        max={max}
      />
    </div>
  );
}