import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

class Signup extends Component {
	constructor(props){
		super(props);
		this.state = {
			error: '',
		}
	}
	
	onSubmit = (e) => {
		e.preventDefault();
		const email = this.refs.email.value.trim();
		const password = this.refs.password.value.trim();

		if (password.length < 4) {
			return this.setState({
				error: 'Password too short'
			})
		}
		Accounts.createUser(
			{email, password }, 
			(err) => {
				console.log(err);
				err ? 
		this.setState({error: err.reason}):
		this.setState({err: ''})
			} 
		)
	}	

	render() {
		const { error } = this.state
		return (
			<div className="boxed-view">
				<div className="boxed-view__box">
					<h1>Join Short Lnk</h1>
					{error && <p>{error}</p>}
					<form onSubmit={this.onSubmit}  noValidate className="boxed-view__form">
						<input type="email" ref="email" name="email" placeholder="Email" />
						<input type="password" ref="password" name="password" placeholder="Password" />
						<button className="button">Create Account</button>
					</form>
					<Link to='/'>Have an account?</Link>
				</div>
			</div>
		)
	}
}

export default withRouter(Signup);