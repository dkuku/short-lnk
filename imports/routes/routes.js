import { Meteor } from 'meteor/meteor';
import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { Router, withRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history'

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import Home from '../ui/Home';

const history = createBrowserHistory();
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const onEnterPublicPage = (Component) => {
	return Meteor.userId() ?
		<Redirect to='/links'/> :
		<Component/>
}

const onEnterPrivatePage = (Component) => {
	return Meteor.userId() ?
		<Component/> :
		<Redirect to='/'/>
}

const routes = (
	<Router history={history}>
		<Switch>
			<Route exact path="/" render={() => onEnterPublicPage(Login)} />
			<Route path="/signup" render={() => onEnterPublicPage(Signup)} />
			<Route path="/links" render={() => onEnterPrivatePage(Link)} />
			<Route exact path="*" component={NotFound} />
		</Switch>
	</Router>
);

export const onAuthChange = (isAuthenticated) => {
	const pathName = history.location.pathname;
	const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
	const isAuthenticatedPage = authenticatedPages.includes(pathName);
	
	if (isUnauthenticatedPage && isAuthenticated) {
		history.replace('/links');
	} else if (isAuthenticatedPage && !isAuthenticated) {
		history.replace('/');
	}
}

export default routes;
