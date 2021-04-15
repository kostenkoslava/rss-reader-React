import React, { useState, useEffect } from 'react';
import { getRss } from '../../utils/getRss';
import { Button, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const BootstrapButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#0063cc',
        borderColor: '#0063cc',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const FeedsPage = (props) => {
    const classes = useStyles();
    const [initialized, setInitialized] = useState(false);
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState({});

    const openLink = url => {
        window.location.href = url;
      };    

    const getItems = async (url) => {
        debugger;
        const response = await getRss(url);
        setItems(response.posts);
        setTitle(response.feed);
        debugger;
    };
    useEffect(() => {
        if (!initialized) {
            getItems(props.feed);
            setInitialized(true);
        }
    })

    return (
        <div>
            <Typography variant='h4'>{title.title}</Typography>
            <Typography variant='h5'>{title.description}</Typography>
            {items.map(({ title, description, link }) => {
                return (
                    <Card>
                        <CardContent>
                            <Typography variant='h6'>{title}</Typography>
                            <Typography variant='p'>{description} </Typography>
                        </CardContent>
                        <CardActions>
                            <BootstrapButton 
                            variant="contained" 
                            color="primary" 
                            disableRipple 
                            className={classes.margin}
                            onClick={openLink.bind(this, link)}>
                                Open Post
                            </BootstrapButton>
                        </CardActions>
                    </Card>
                )
            })}
        </div>
    )
};

export default FeedsPage;