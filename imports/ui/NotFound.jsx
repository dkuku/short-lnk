import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
	return (
			<div className="boxed-view">
				<div className="boxed-view__box">
					<h1>Page Not Found</h1>
					<p>We couldn't find this page you requested</p>
					<Link to='/' className="button button--link">Homepage</Link>
				</div>
			</div>
		)
}

