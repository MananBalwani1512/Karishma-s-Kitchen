import React from 'react';
import { useState } from 'react';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import HomeComponent from './HomeComponent';
import ContactDeveloperComponent from './ContactDeveloperComponent';
import AddRecipeComponent from './AddRecipeComponent';
import ViewRecipeComponent from './ViewRecipeComponent';
import EditRecipeComponent from './EditRecipeComponent';
const App = ()=>
{
    const viewRecipe = (recip)=>
    {
        setRecipe(recip);
        setComponentToShow(<ViewRecipeComponent changeTab = {changeTab} recipe = {recip} />);
    }        
    const editRecipe = (recip)=>
    {
        setRecipe(recip);
        setComponentToShow(<EditRecipeComponent changeTab = {changeTab} recipe = {recip} />);
    }
    const [tabIndex,setTabIndex] = React.useState(0);
    const [recipe,setRecipe] = React.useState({});
    const changeTab = (val)=>
    {
        setTabIndex(val);
        if(val === 0)
            setComponentToShow(<HomeComponent tabIndex = {0} changeTab = {changeTab} viewRecipe = {viewRecipe} editRecipe = {editRecipe} />);
        else if (val === 2)
            setComponentToShow(<ContactDeveloperComponent tabIndex = {2} changeTab = {changeTab} />);
        else if(val === 1)
            setComponentToShow(<AddRecipeComponent tabIndex = {1} changeTab = {changeTab} />);    
    }
    const [componentToShow,setComponentToShow] = React.useState(<HomeComponent tabIndex = {tabIndex} changeTab = {changeTab} viewRecipe = {viewRecipe} editRecipe = {editRecipe} />)
    return (
        
        <BrowserRouter>
            <Routes>
                <Route exact path = '/' element = {componentToShow}></Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;