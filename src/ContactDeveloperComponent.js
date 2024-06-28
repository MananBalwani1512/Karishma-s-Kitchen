import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import AppBarComponent from './AppBarComponent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const myStyles = makeStyles((theme)=>
{
    return {
        "mainContainer" : 
        {
            "margin" : theme.spacing(5),
        },
        "appBarSpacer" : theme.mixins.toolbar,
        "content" : 
        {
            "marginTop" : theme.spacing(10),
            "marginLeft" : theme.spacing(5),
            "color" : "#2929aa"
        },
        "formPaper" : 
        {
            "padding" : theme.spacing(5)
        }
    };
});
const ContactDeveloperComponent = (props)=>
{
    const classes = myStyles();
    return (
        <div className = {classes.mainContainer}>
            <AppBarComponent tabIndex = {props.tabIndex} changeTab = {props.changeTab} />
            <div className = {classes.content}>
                <Grid container spacing = {8}>
                    <Grid item>
                        <Typography><h4>Contact Us</h4></Typography>
                        <Typography><h5>Need Some Support Fill Out the form so that we can contact you</h5></Typography>
                        <Typography><h5>Feel Free To Ask</h5></Typography>
                    </Grid>
                    <Grid item>
                        <Paper className = {classes.formPaper}>
                            <Grid container spacing = {4}>
                                <Grid item>Manan Balwani</Grid>   
                            </Grid>
                            <Grid container spacing = {4}>
                                <Grid item>9685742221</Grid>   
                            </Grid>
                            <Grid container spacing = {4}>
                                <Grid item>mananbalwani1512@gmail.com</Grid>   
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
export default ContactDeveloperComponent;