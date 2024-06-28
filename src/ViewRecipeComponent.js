import React from 'react';
import { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import AppBarComponent from './AppBarComponent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosTwoToneIcon from "@material-ui/icons/ArrowBackIosTwoTone";
import Button from '@material-ui/core/Button';
const myStyles = makeStyles((theme)=>
{
    return {
        "mainContainer" : 
        {
            "margin" : theme.spacing(2)
        },
        "appBarSpacer" : theme.mixins.toolbar,
        "content" : 
        {
            "color" : "#2929aa"
        },
        "headerContainer" : 
        {
            "backgroundColor" : "#2929aa",
            "padding" : theme.spacing(5),
            "color" : "white"
        },
        "formPaper" : 
        {
            "padding" : theme.spacing(4),
        }
    };
});
const ViewRecipeComponent = (props)=>
{
    const goBack = ()=>
    {
        props.changeTab(0);
    }
    const classes = myStyles();
    const recipe = props.recipe;
    return (
        <div className = {classes.mainContainer}>
            <AppBarComponent tabIndex = {props.tabIndex} changeTab = {props.changeTab} />
            <div className = {classes.content}>
                <Grid container spacing = {12}>    
                    <Grid item className = {classes.courses}>
                        <Paper className = {classes.formPaper}>
                            <Grid item>
                                <Typography color = "primary"><h2>{recipe.title}</h2></Typography>
                            </Grid>
                            <Grid item>
                                <Typography><h3 style = {{"color" : "#2929aa"}}>Complexity</h3>{recipe.complexity}</Typography>
                                <Typography><h3 style = {{"color" : "#2929aa"}}>Duration</h3>{recipe.duration}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography color = "primary"><h3>Ingredients</h3></Typography>
                                <Typography>{recipe.ingredients}</Typography>
                            </Grid>
                            <Grid item>        
                                <Typography color = "primary"><h3>Method</h3></Typography>
                                <Typography>{recipe.method}</Typography>
                            </Grid>
                            <Grid item>
                                <Button onClick = {goBack} variant = 'contained' color = 'primary'>
                                    <IconButton color = 'inherit'>
                                        <ArrowBackIosTwoToneIcon />
                                    </IconButton>&nbsp;Back
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
export default ViewRecipeComponent;