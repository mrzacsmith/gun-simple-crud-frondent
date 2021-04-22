import React from 'react';
import { Button } from '@material-ui/core';
import UserForm from './userForm';
import { connect } from "react-redux";
import axios from 'axios';
import { ajaxUrl } from '../config';

const AddUserForm = ({genders, selectedUser, setGenders, setUsers}) => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sendingForm = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      birthday: e.target.birthday.value,
      password: e.target.password.value,
      genderId: e.target.genderId.value
    }
    await axios.post(`${ajaxUrl}/users`, { ...sendingForm });
		const response = await axios.get(`${ajaxUrl}/users`);
    setUsers(response.data);
  }

  const initGender = async () => {
    await axios.post(`${ajaxUrl}/genders`);
		const response = await axios.get(`${ajaxUrl}/genders`);
    setGenders(response.data);
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{ margin: '10px' }}>
        <UserForm index={2} direction={'row'} />
        <Button 
          variant="outlined" 
          size='small'
          type='submit'
          style={{ float:'right' }}
        >
          Add User
        </Button>
      </form>
      {
        genders.length === 0 && 
        <Button 
          variant="outlined" 
          size='small'
          onClick = {()=>initGender()}
          style={{ float:'right !important' }}
        >
          Set Genders
        </Button>
      }
    </>
    
  );
}

const mapStateToProps = (state) => {
  return { selectedUser: state.usersReducer.selectedUser, genders: state.usersReducer.genders }
}

const setUsers = (users) => {
  return {
    type: 'SET_USERS',
    users
  }
}

const setGenders = (genders) => {
  return {
    type: 'SET_GENDERS',
    genders
  }
}

export default connect(mapStateToProps, {setUsers, setGenders})(AddUserForm)
