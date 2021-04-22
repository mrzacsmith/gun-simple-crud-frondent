
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddUserForm from './components/addUserForm';
import EditUserForm from './components/editUserForm';
import AllUsers from './components/allUsers';

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    background: '#F9F8F3',
    marginTop: '100px'
  }
}));

function App() {

  const classes = useStyles();
  
  return (
    <div className={classes.container}>
      <EditUserForm />
      
      <Grid container direction="column" justify="center" alignItems="center" >
        <AddUserForm />
        <AllUsers />
      </Grid>
    </div>
  );
}

export default App;
