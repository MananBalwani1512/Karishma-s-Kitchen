import React from 'react';
import { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import AppBarComponent from './AppBarComponent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardComponent from './CardComponent';
import CircularProgress from '@material-ui/core/CircularProgress';
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
            "padding" : theme.spacing(4)
        }
    };
});
var recips = [];
const getRecipes = ()=>
{
    var promise = new Promise((resolve,reject)=>
    {
        fetch("/getAll").then((response)=>
        {
            if(!response.ok)
            {
                throw Error("Unable to fetch recipes");
            }
            return response.json();
        }).then((responseJson)=>
        {
            resolve(responseJson.result);
        }).catch((err)=>
        {
            reject();
        })
    });
    return promise;
}

const HomeComponent = (props)=>
{
    const [loading,setLoading] = React.useState(true);
    const classes = myStyles();
    const [recipes,setRecipes] = React.useState([]);
    const [searchedFor,setSearchedFor] = React.useState("");
    React.useEffect(()=>
    {
        getRecipes().then((recps)=>
        {
            setLoading(false);
            recips = recps;
            setRecipes(recps);
        },()=>
        {
            setLoading(false);
            alert("Unable to get Recipes now try after some time");
        });
    },[]);
    
    const changeRecipes = (val)=>
    {
        if(val === "")
        {
            setRecipes(recips);
        }
        var r = [];
        for(var i = 0; i < recips.length; i++)
        {
            var recipe = recips[i];
            if(recipe.title.toLowerCase().includes(val.toLowerCase()))
            {
                r.push(recipe);
            }
        }
        setRecipes(r);
    }    
    return (
        <div className = {classes.mainContainer}>
            <AppBarComponent tabIndex = {props.tabIndex} changeTab = {props.changeTab} />
            <div className = {classes.content}>
                <Grid container spacing = {12}>    
                    <Grid item className = {classes.courses}>
                        <Paper className = {classes.formPaper}>
                            <Grid item>
                                <TextField variant = 'outlined' value = {searchedFor} onChange = {(ev)=>{setSearchedFor(ev.target.value);changeRecipes(ev.target.value);}} label = "Search Recipe"></TextField>
                            </Grid>
                            <Typography><h3>Recipes - {searchedFor}</h3></Typography>
                            {loading === false && <RecipeComponent recipes = {recipes} viewRecipe = {props.viewRecipe} editRecipe = {props.editRecipe} changeTab = {props.changeTab} />}
                            {loading === true && <CircularProgress />}
                            
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
const RecipeComponent = (props)=>
{
    return (
        props.recipes.map((recipe)=>
        {
            return (
                <CardComponent recipe = {recipe} changeTab = {props.changeTab} viewRecipe = {props.viewRecipe} editRecipe = {props.editRecipe} />
            )
        })
    )
}
export default HomeComponent;