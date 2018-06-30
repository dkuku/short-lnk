import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
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

		Meteor.loginWithPassword(
			{email}, password,
			(err) => {
				err ? 
		this.setState({error: err.reason}):
		this.setState({err: ''})
			}
		) 
	}
	 
	render() {
		const { error } = this.state;
		return (
			<div className="boxed-view">
				<div className="boxed-view__box">
					<h1>Join Short Lnk</h1>
					{error && <p>{error}</p>}
					<form onSubmit={this.onSubmit} className="boxed-view__form">
						<input type="email" ref="email" name="email" placeholder="Email" />
						<input type="password" ref="password" name="password" placeholder="Password" />
						<button className="button">Login</button>
					</form>
					<Link to='/signup'>Register</Link>
				</div>
			</div>
		)
	}
}

export default Login;