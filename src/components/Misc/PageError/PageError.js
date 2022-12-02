import { Box, Card, Grid, ThemeProvider, Typography, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { titleTheme } from '../../Home/Home';
import { Info, MaximumRed, Warning } from '../Colors/Colors';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

const PageError = ({ error, severity, svgPath }) => {
    const sm = useMediaQuery("(max-width: 600px)");
    const Icon = (severity) => {
        switch(severity) {
            case "warning":
                return <WarningIcon fontSize="large" style={{color: Warning}} />;
            case "error":
                return <ErrorIcon fontSize="large" style={{color: MaximumRed}} />;
            default: 
                return <InfoIcon fontSize="large" style={{color: Info}} />;
        }
    }

    return (
        <Box p={sm ? 1 : 5}>
            <Grid container justifyContent="center">
                <Grid component={Card} elevation={5} xs={12} md={8} item style={{ border: "1px solid lightgray" }}>
                    <Box p={10}>
                        <Box p={2} align="center">{Icon(severity)}</Box>
                        {svgPath &&
                        <Box p={2} align="center">
                            <object aria-label="order confirmed" type="image/svg+xml" data={svgPath} width={sm ? "100%" : "70%"} />
                        </Box>}
                        <ThemeProvider theme={titleTheme}>
                            <Typography align="center" variant={sm ? "h6" : "h5"}>
                                {error}
                            </Typography>
                        </ThemeProvider>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default PageError;
