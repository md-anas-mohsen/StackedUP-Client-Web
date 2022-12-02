import { Avatar, Card, Grid, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PrussianBlue } from '../../Misc/Colors/Colors';

const ReviewCard = ({review, userReview}) => {
    const [userName, setUserName] = useState("");
    const [userPic, setUserPic] = useState("");

    useEffect(() => {
        async function getUserPicName () {
           const { data } = await axios.get(`/api/v1/frontend/user/${review.user}`);
           setUserName(data.user.name);
           setUserPic(data.user.avatar);   
        }
        getUserPicName();
    }, [review.user]);

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
                    marginBottom: userReview ? "50px" : "25px"
                }}
            >
                <Grid item>
                    {/* {userReview &&
                        <Grid item xs={3}>
                            <Typography 
                                variant="subtitle1"
                                style={{
                                    color: "white",
                                    backgroundColor: PrussianBlue,
                                    padding: "10px",
                                    margin: "10px 0",
                                    borderRadius: "5px"
                                }}
                            >
                                My Review
                            </Typography>
                        </Grid>
                    } */}
                    <Grid container alignItems="center"
                        style={userReview && {
                            color: "white",
                            backgroundColor: PrussianBlue,
                            padding: "10px",
                            margin: "10px 0",
                            borderRadius: "5px"
                        }}
                    >
                        <Grid item>
                            <Avatar 
                                src={userPic}
                                alt={userName}
                            />
                        </Grid>
                        <Grid item style={{marginLeft: "5px"}}>
                            <Typography variant="h6">{userName}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container direction="column">
                    <Grid item><Rating precision={0.5} value={review.rating} readOnly /></Grid>
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
    )
}

export default ReviewCard;
