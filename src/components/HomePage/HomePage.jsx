import React, { useState }  from 'react';
import { Button, TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { updateLinkAC, updateNameAC, addFeedAC } from '../../store/homePageReducer';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { validateLink } from '../../utils/validateLink';
import { Redirect } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  },
  root: {
    padding: theme.spacing(3, 2)
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  },
  linkArea: {
    color: 'blue',
  },
  error: {
    color: 'red',
  }
}));

const HomePage = (props) => {
  const [ errors, setErrors ] = useState('');
  const [redirectToFeed, setRedirectToFeed] = useState(false);
  const openFeedPage = (url) => {
    props.setSelectedFeed(url)
    setRedirectToFeed(true);
  }
  const handleInput = (event) => {
    const value = event.target.value;
    const newAction = event.target.name === 'name' ? updateNameAC(value) : updateLinkAC(value);
    props.dispatch(newAction);
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    const urls = props.state.feeds.map(({url}) => url);
    const isValid = await validateLink(props.state.linkTextArea, urls);
    if(isValid.valid) {
      props.dispatch(addFeedAC());
    } else {
      setErrors(isValid.error);
    }
  }
  const classes = useStyles();
  if(redirectToFeed) {
    return (
      <Redirect to='/feeds' />
    )
  }
  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Adding RSS Form
            </Typography>

        <form>
          <TextField
            label="Name"
            id="margin-normal"
            name="name"
            className={classes.textField}
            value={props.state.nameTextArea}
            helperText="Enter name of your feed"
            onChange={handleInput}
          />
          <TextField
            label="RSS link"
            id="margin-normal"
            name="link"
            value={props.state.linkTextArea}
            className={classes.textField}
            helperText= {errors === '' ? 'Put your Rss Link' : <div className={classes.error}>{errors}</div>}
            onChange={handleInput}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleAdd}
          >
            Add
          </Button>
        </form>
      </Paper>
      {props.state.feeds.map(({ name, url }) => {

        return (
          <Card>
            <CardContent>
              <Typography variant='h4'>{name}</Typography>
              <Typography variant='h5' className={classes.linkArea}>{url} </Typography>
            </CardContent>
            <CardActions>
              <IconButton onClick={openFeedPage.bind(this, url)}>
                Open
              <OpenInNewIcon />
              </IconButton>
            </CardActions>
          </Card>
        )
      })}
    </div>
  )
}
export default HomePage;