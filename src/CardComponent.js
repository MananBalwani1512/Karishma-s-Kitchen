import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccessTimeIcon  from '@material-ui/icons/AccessTime';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
const myStyles = makeStyles((theme)=>
{
    return {
        "card" : 
        {
            "padding" : theme.spacing(2),
            "width" : "450px"
        },
        "cardContent" : 
        {
            "padding" : theme.spacing(2)
        },
    };
});
const removeRecipe = (title)=>
{
    var promise = new Promise((resolve,reject)=>
    {
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = ()=>
        {
            if(xmlHttpRequest.readyState == 4)
            {
                if(xmlHttpRequest.status == 200)
                {
                    
                    var response = xmlHttpRequest.responseText;
                    if(JSON.parse(response).success == true)
                        resolve();
                    else
                        reject();
                }
                else
                {
                    reject();
                }
            }
        }
        xmlHttpRequest.open("POST","/delete",true);
        xmlHttpRequest.setRequestHeader("content-type","application/json");
        xmlHttpRequest.send(JSON.stringify({"title" : title}));
    });
    return promise;
}
const CardComponent = (props)=>
{
    const deleteRecipe = (recipe)=>
    {
        removeRecipe(recipe.title).then(()=>
        {
            alert("Recipe deleted successfully");
            close();
            props.changeTab(3);
            props.changeTab(0);
        },()=>
        {
            alert("Unable to delete recipe");
            close();
        });
    }
    const open = ()=>
    {
        setIsOpen(true);
    }
    const close = ()=>
    {
        setIsOpen(false);
    }
    const [isOpen,setIsOpen] = React.useState(false);
    const classes = myStyles();
    const title = props.recipe.title;
    const duration = props.recipe.duration;
    const complexity = props.recipe.complexity;
    const ingredients = props.recipe.ingredients;
    const method = props.recipe.method;
    return (
        <>        
                <Card className = {classes.card}>
                    <CardHeader title = {title} subheader = {complexity} />
                    <CardActions>
                        <Button onClick = {()=>{props.viewRecipe(props.recipe);}} variant = 'outlined'>View Recipe</Button>
                        <Button onClick = {()=>{props.editRecipe(props.recipe);}} variant = 'contained'>
                            <IconButton variant = 'inherit'>
                                <EditIcon />
                            </IconButton>
                        </Button>
                        <Button onClick = {open} variant = 'contained' color = 'secondary'>
                            <IconButton variant = 'inherit'>
                                <DeleteIcon />
                            </IconButton>
                        </Button>
                        
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <IconButton variant = 'inherit'>
                            <AccessTimeIcon />
                        </IconButton>
                        <Typography><i>{duration}</i></Typography>
                    </CardActions>
                </Card>
                <Modal
                style={{
                    position: "absolute",
                    border: "2px solid #2929aa",
                    backgroundColor: "#2929aa", // Corrected property name
                    boxShadow: "2px solid #2929aa",
                    height: 200,
                    width: 450,
                    marginTop: "200px",
                    marginLeft: "20px",
                    padding: "2%",
                    color : "white"
                }}
                open={isOpen}
                onClose={close}
            >
                <div>
                    <Typography variant = 'h3'>Delete Recipe - {props.recipe.title}</Typography>
                    <Typography>Are you sure you want to delete this recipe ?</Typography>
                    <Button onClick = {()=>{deleteRecipe(props.recipe);}} variant="contained" color="secondary">
                        Delete
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button onClick = {close} variant="outlined" style = {{color : "white"}}>Cancel</Button>
                </div>
            </Modal>
    </>
    );
}
export default CardComponent;