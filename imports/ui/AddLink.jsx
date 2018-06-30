import React, { Component } from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

import {Links} from '../api/links';

class AddLink extends Component {
    constructor() {
        super()
        this.state = {
            url: '',
            isOpen: false,
            error: ''
        }
    }

    onUrlChange = (e) => {
        this.setState({url: e.target.value.trim()})
    }
    onSubmit = (e) => {
        e.preventDefault();
        const url = this.state.url;
        if ( url ) {
            Meteor.call('links.insert', url, (err, res) => {
                if (!err) {
                    this.handleModalClose();
                } else {
                    this.setState({error: err.reason})
                }
                return
            })
        }
    }
    handleModalClose = () => {
        this.setState({
            url: '',
            isOpen: false,
            error: ''
        })

    }

    render() {
        const { isOpen, url, error } = this.state
        return (
            <div>
                <button className="button" onClick={() => this.setState()}>+ Add link</button>
                <Modal
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                    isOpen={isOpen}
                    contentLabel="Add link form"
                    ariaHideApp={false}
                    onAfterOpen={()=>this.refs.url.focus()}
                    onRequestClose={this.handleModalClose}
                >
                    <h1>Add link</h1>
                    {error ? <p>{error}</p> : null }
                    <form className="boxed-view__form" onSubmit={this.onSubmit}>
                        <input type="text" value={url} ref="url" onChange={this.onUrlChange}  placeholder="URL" />
                        <button className="button" >Add Link</button>
                        <button className="button button--secondary" type="button" onClick={this.handleModalClose}>Cancel</button>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default AddLink;
