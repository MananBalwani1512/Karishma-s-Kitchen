import React from 'react';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
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
            "color" : "#2929aa"
        }
    };
});
const AppBarComponent = (props)=>
{
    const classes = myStyles();
    return (
        <React.Fragment>
            <AppBar>
                <Toolbar>
                    <Typography>Karishma's Kitchen</Typography>
                    <Tabs value = {props.tabIndex} onChange = {(ev,val)=>{props.changeTab(val);}}>
                        <Tab label = 'Home' />
                        <Tab label = 'Add Recipe' />
                        <Tab label = 'Contact Developer' />
                    </Tabs>
                </Toolbar>
            </AppBar>
            <div className = {classes.appBarSpacer}>
            </div>
        </React.Fragment>
    );       
}
export default AppBarComponent;