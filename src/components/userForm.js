import { makeStyles } from '@material-ui/core/styles';
import { Input, Select, InputLabel, MenuItem, TextField } from "@material-ui/core";
import getDate from '../utils/getDate';
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  userForm: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    border: 'none',
    background: '#F9F8F3'
  },
  inputField: {
    padding: '10px',
    ['@media (max-width:600px)']: { 
    }
  }
}));

const UserForm = ({index, genders, direction, selectedUser}) => {

	const classes = useStyles();

	return (
		<div className={classes.userForm} key={index} style={{'flexDirection': direction}}>
			<div className={classes.inputField}>
				<InputLabel id="firstname_label">First Name</InputLabel>
				<Input name='firstName' required defaultValue={selectedUser.firstName} inputProps={{min: 0, style: { textAlign: 'center' }}}></Input>
			</div>
			<div className={classes.inputField}>
				<InputLabel id="lastname_label">Last Name</InputLabel>
				<Input name='lastName' required defaultValue={selectedUser.lastName} inputProps={{min: 0, style: { textAlign: 'center' }}}></Input>
			</div>
			<div className={classes.inputField}>
				<InputLabel id="birthday_label">Birthday</InputLabel>
				<TextField
					type="date"
					name='birthday'
					required
					defaultValue={getDate(selectedUser.birthday)}
					className={classes.textField}
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</div>
			<div className={classes.inputField}>
				<InputLabel id="password_label">Password</InputLabel>
				<Input defaultValue={selectedUser.password} name='password' required inputProps={{min: 0, style: { textAlign: 'center' }}}></Input>
			</div>
			<div className={classes.inputField}>
				<InputLabel id="gender_label">Gender</InputLabel>
				<Select
					defaultValue={selectedUser.genderId}
					name='genderId'
					required
					inputProps={{
						id: "gender_label"
					}}
				>
					{
						genders&&genders.map((g, i)=>(
							<MenuItem key={i} value={g.id}>{g.gender}</MenuItem>
						))
					}
				</Select>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	console.log(state);
	return {selectedUser: state.usersReducer.selectedUser, genders: state.usersReducer.genders}
}

export default connect(mapStateToProps)(UserForm)
