import React, { useState } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import AppBarComponent from './AppBarComponent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core';
import Option from '@material-ui/core';
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
const updateRecipe = (formData)=>
{
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = ()=>
    {
        if(xmlHttpRequest.readyState == 4)
        {
            if(xmlHttpRequest.status == 200)
            {
                //success
                var responseText = xmlHttpRequest.responseText;
                var json = JSON.parse(responseText);
                if(json.success == true)
                    alert("Updated Recipe to database");
                else
                    alert("Their is some error on server cannot update recipe");
            }
            else
            {
                //failure
                alert("Cannot update recipe to database");
            }
        }
    }
    xmlHttpRequest.open('POST','/update',true);
    xmlHttpRequest.setRequestHeader("content-type","application/json");
    xmlHttpRequest.send(JSON.stringify(formData));
}
const EditRecipeComponent = (props)=>
{
    const title = props.recipe.title;
    const [complexity,setComplexity] = React.useState(props.recipe.complexity);
    const [duration,setDuration] = React.useState(props.recipe.duration);
    const [ingredients,setIngredients] = React.useState(props.recipe.ingredients);
    const [method,setMethod] = React.useState(props.recipe.method);
    const makeFormData = ()=>
    {
        var formData = 
        {
            "title" : title,
            "complexity" : complexity,
            "duration" : duration,
            "ingredients" : ingredients,
            "method" : method
        }   
        updateRecipe(formData);         
        props.changeTab(0);
    }
        
    const classes = myStyles();
    return (
        <div className = {classes.mainContainer}>
            <AppBarComponent tabIndex = {props.tabIndex} changeTab = {props.changeTab} />
            <div className = {classes.content}>
                <Grid container spacing = {12}>
                    <Grid item>
                        <Paper className = {classes.formPaper}>
                            <Typography><b>Edit Recipe -{props.recipe.title}</b></Typography>
                            <Grid container spacing = {12}>
                                <Grid item>
                                    <TextField value = {props.recipe.title} disabled id = "title" label = "Title" helperText = "Title of the Recipe" />
                                </Grid>
                            </Grid>
                            <Grid container spacing = {5}>
                                <Grid item>
                                    <TextField value = {complexity} onChange = {(ev)=>{setComplexity(ev.target.value);}} selectProps = {{
                                        "native" : true
                                    }} id = "complexity" select helperText = "Select How complex is Dish to prepare" label = "Complexity">
                                        <option id = "1" key = "1" value = "Easy">Easy</option>
                                        <option id = "2" key = "2" value = "Medium">Medium</option>
                                        <option id = "3" key = "3" value = "Hard">Hard</option>
                                    </TextField>
                                </Grid>
                                <Grid item>
                                    <TextField value = {duration} onChange = {(ev)=>{setDuration(ev.target.value);}} id = "duration" label = "Duration" helperText = "Time for Preparation" />
                                </Grid>
                            </Grid>
                            <Grid container spacing = {12}>
                                <Grid item>
                                    <TextField value = {ingredients} onChange = {(ev)=>{setIngredients(ev.target.value);}} id = "ingredients" label = "Ingredients" helperText = "The items required for this recipe" multiline rows = {5} />
                                </Grid>
                            </Grid>
                            <Grid container spacing = {12}>
                                <Grid item>
                                    <TextField value = {method} onChange = {(ev)=>{setMethod(ev.target.value);}} id = "method" label = "Method" helperText = "The steps for preparation of this recipe" multiline rows = {5} />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item>
                                    <Button onClick = {makeFormData} variant = 'contained'>Update Recipe</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
export default EditRecipeComponent;