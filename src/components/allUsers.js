import React, { useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';
import { connect } from "react-redux";
import getDate from '../utils/getDate';
import axios from 'axios';
import { ajaxUrl } from '../config';

const AllUsers = ({genders, users, openEditModal, setUsers, setGenders, setSelectedUser}) => {

  	useEffect(async () => {
		const response = await axios.get(`${ajaxUrl}/users`);
		console.log(response.data);
		setUsers(response.data);
		const responseG = await axios.get(`${ajaxUrl}/genders`);
		console.log(responseG.data);
		setGenders(responseG.data);
	}, []);
	
	const handleOpen = (user) => {
		openEditModal();
		setSelectedUser(user);
	}

	const deleteUser = async (id) => {
		await axios.delete(`${ajaxUrl}/users/${id}`);
		const response = await axios.get(`${ajaxUrl}/users`);
		setUsers(response.data);
	}

	const getGender = (id) => {
		if (genders) {
			for(const g of genders) {
				if( g.id == id) {
					return g.gender;
				}
			}
		}
		return '';
	}

  return (
    <Paper variant="outlined">
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Frist Name</TableCell>
						<TableCell align="left">Last Name</TableCell>
						<TableCell align="left">Birthday</TableCell>
						<TableCell align="left">Password</TableCell>
						<TableCell align="left">Gender</TableCell>
						<TableCell align="left">Edit/Delete</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
				{
					users && users.length && users.map((user, index) => (
						<TableRow  key={index}>
							<TableCell align="left">
								{user.firstName}
							</TableCell>
							<TableCell align="left">
								{user.lastName}
							</TableCell>
							<TableCell align="left">
								{getDate(user.birthday)}
							</TableCell>
							<TableCell align="left">
								{user.password}
							</TableCell>
							<TableCell align="left">
								{getGender(user.genderId)}
							</TableCell>
							<TableCell align="left">
								<Button onClick={()=>handleOpen(user)}>Edit</Button> / <Button onClick={()=>deleteUser(user.id)}> Delete</Button>
							</TableCell>
						</TableRow>
					))
				}
				</TableBody>
			</Table>
		</Paper>
	)
}

const mapStateToProps = (state) => {
	console.log(state);
	return {users: state.usersReducer.users, genders: state.usersReducer.genders}
}

const openEditModal = () => {
	return {
		type: 'EDIT_MODAL_OPEN'
	}
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

const setSelectedUser = (selectedUser) => {
	return {
		type: 'SET_SELECTED_USER',
		selectedUser
	}
}

export default connect(mapStateToProps, {setUsers, setGenders, openEditModal, setSelectedUser})(AllUsers)