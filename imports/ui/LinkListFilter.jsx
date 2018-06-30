import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';


export default class LinkListFilter extends Component {
    constructor() {
        super()
        this.state = {showVisible: true}
    }
	componentDidMount() {
		this.showVisibleTracker = Tracker.autorun(() => {
			this.setState({
            showVisible: Session.get('showVisible')
			})
		})
	}

	componentWillUnmount() {
		this.showVisibleTracker.stop();
	}

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label className="checkbox">
                        <input className="checkbox__box" type="checkbox" checked={!this.state.showVisible} onChange={(e) => {
                            Session.set('showVisible', !e.target.checked)
                        }} />
                        Show hidden links</label>
                </form>
            </div>
            )
    }
}
