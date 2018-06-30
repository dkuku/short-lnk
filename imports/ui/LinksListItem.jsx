import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Clipboard from 'clipboard';

import Links from '../api/links'

class LinksListItem extends Component {
    constructor() {
        super();
        this.state = {
            justCopied: false,
        }
    }
    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);
        this.clipboard.on('success', () => {
            this.copyButtonState();
        }).on('error',() => {
            alert('unable to copy')
        })
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }

    copyButtonState() {
        this.setState({justCopied: true});

        setTimeout(() => {
            this.setState({justCopied: false});
        }, 1000)
    }
    renderStats() {
        const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits' ;
        const lastVisited = this.props.lastVisitedAt ? `(visited ${moment(this.props.lastVisitedAt).fromNow()})` : null ;
        return (
                <p className="item__message">{this.props.visitedCount} {visitMessage} {lastVisited}</p>

        )
    }

    render() {
        const { shortUrl, url, _id, visible, lastVisitedAt, visitedCount } = this.props
        return (
            <div className="item">
                <h2>{url}</h2>
                <p className="item__message">{shortUrl}</p>
                {this.renderStats()}
                <a className="button button--link button--pill" href={shortUrl} target="blank">Visit</a>
                <button className="button button--pill" ref="copy" data-clipboard-text={shortUrl}>
                    {this.state.justCopied ? 'Copied' : 'Copy' }
                </button>
                <button className="button button--pill" onClick={() => Meteor.call('link.setVisibility', _id, !visible)}>
                    {visible ? 'Hide' : 'Unhide' }
                </button>
            </div>
        )
    }
}
export default LinksListItem

LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    lastVisitedAt: PropTypes.number,
    visitedCount: PropTypes.number.isRequired,
}
