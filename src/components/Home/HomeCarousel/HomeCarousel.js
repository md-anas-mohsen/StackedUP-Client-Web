import React from 'react';
import './styles/HomeCarousel.css';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Grid, Typography, ThemeProvider } from '@material-ui/core'
import { MaximumYellowRed, PrussianBlue } from '../../Misc/Colors/Colors';
import { Link } from 'react-router-dom';
import { titleTheme } from '../Home';

function HomeCarousel({ featured }) {
    return (
        <Carousel 
            className="homeCarousel" 
            animation="slide"
        >
            {
                featured?.map((item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item({ item }) {
    return (
        <Grid className="homeCarousel__item" container component={Paper}>
            <Grid className="homeCarousel__item__image" item xs={12}>
                <img src={item.image.url} alt="" />
                    <Grid className="homeCarousel__item__image__overlay" container direction="column" alignItems="center" justifyContent="space-evenly">
                        <Grid item>
                            <ThemeProvider theme={titleTheme}>
                                <Typography component="h2" variant="h4">
                                    {item.title}
                                </Typography>
                            </ThemeProvider>
                        </Grid>
                        <Grid item className="homeCarousel__item__image__overlay__description">
                            <Typography>{item.description}</Typography>
                        </Grid>
                        <Grid item>
                            <Button component={Link} to={item.link} variant="outlined" style={{ color: "white", border: "1px solid white" }}>
                                Check it out!
                            </Button>
                        </Grid>
                    </Grid>
            </Grid>
        </Grid>
    )
}

export default HomeCarousel;