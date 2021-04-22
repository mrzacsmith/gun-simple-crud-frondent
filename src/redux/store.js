import { createStore } from 'redux'
import { combineReducers } from "redux";

const emptyUser = {
	id: null,
	firstName: '',
	lastName: '',
	birthday: new Date('1900-01-01'),
	password: '',
	genderId: 1
}

const initialState = {
	selectedUser: { ...emptyUser },
	users: [{ ...emptyUser }],
	genders: [{}],
	openEditModal: false
};

let usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'EDIT_MODAL_OPEN': {
			return {
				genders: state.genders,
				openEditModal: true,
				users: state.users,
				selectedUser: state.selectedUser
			}
		}
		case 'EDIT_MODAL_CLOSE': {
			return {
				genders: state.genders,
				openEditModal: false,
				users: state.users,
				selectedUser: state.selectedUser
			}
		}
		case 'SET_SELECTED_USER': {
			console.log(action.selectedUser)
			return {
				genders: state.genders,
				users: state.users,
				selectedUser: { ...action.selectedUser },
				openEditModal: state.openEditModal
			};
		}
		case 'SET_USERS': {
			return {
				genders: state.genders,
				users: [ ...action.users ],
				selectedUser: { ...emptyUser },
				openEditModal: state.openEditModal
			};
		}
		case 'SET_GENDERS': {
			if (action.genders === undefined) action.genders = [];
			return {
				users: state.users,
				genders: [ ...action.genders ],
				selectedUser: { ...emptyUser },
				openEditModal: state.openEditModal
			};
		}
		default:
			return state;
	}
}

const store = createStore( combineReducers({usersReducer}) );

export { store }

