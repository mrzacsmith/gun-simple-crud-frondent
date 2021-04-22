import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button} from "@material-ui/core";
import UserForm from './userForm';
import { connect } from "react-redux";
import axios from 'axios';
import { ajaxUrl } from '../config';

const EditUserForm = ({openModal, selectedUser, setUsers, closeModal}) => {

  	const handleSubmit = async (e) => {
		e.preventDefault();
		const sendingForm = {
			firstName: e.target.firstName.value,
			lastName: e.target.lastName.value,
			birthday: e.target.birthday.value,
			password: e.target.password.value,
			genderId: e.target.genderId.value
		}
		await axios.put(`${ajaxUrl}/users/${selectedUser.id}`, {...sendingForm});
		const response = await axios.get(`${ajaxUrl}/users`);
		setUsers(response.data);
		closeModal();
	}

  return (
    <Dialog open={openModal} onClose={closeModal} aria-labelledby="form-dialog-title">
		<form onSubmit={handleSubmit}>
			<DialogTitle id="form-dialog-title">Edit User</DialogTitle>
				<DialogContent>
					<UserForm index={1} direction={'column'} />
				</DialogContent>
			<DialogActions>
				<Button type='submit'> OK </Button>
				<Button onClick={()=>closeModal()}> Cancel </Button>
			</DialogActions>
		</form>
		
	</Dialog>
  );
}

const mapStateToProps = (state) => {
  return { selectedUser: state.usersReducer.selectedUser, openModal: state.usersReducer.openEditModal }
}

const setUsers = (users) => {
  return {
		type: 'SET_USERS',
		users
  }
}

const closeModal = () => {
	return {
		type: 'EDIT_MODAL_CLOSE'
	}
}

export default connect(mapStateToProps, {setUsers, closeModal})(EditUserForm)
