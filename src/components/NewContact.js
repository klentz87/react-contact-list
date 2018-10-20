import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import serializeForm from "form-serialize";


class NewContact extends Component {
	constructor() {
		super();
		this.state = {
			redirect: false
		}

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(event) {
		event.preventDefault();
		let contactData = serializeForm(event.target, {hash: true})
		contactData["id"] = Date.now(); // adds a unique id
		if (this.props.onCreateContact) {
			this.setState(this.props.onCreateContact([contactData]), () => {this.handleRedirect()})
		}

	}

	handleRedirect() {
		this.setState({
			redirect: true
		})
	}


	render() {
		return (
			<div>
				<h1>NEW CONTACT</h1>
				<form onSubmit={this.handleSubmit}>
					<input type='text' name='name' placeholder="Name" />
					<input type='text' name='email' placeholder="Email"/>
					<button>Add Contact</button>
				</form>

				{this.state.redirect && (
					<Redirect to={'/'}/>
				)}
			</div>	
		)
	}
}

export default NewContact;