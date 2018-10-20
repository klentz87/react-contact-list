import React, { Component } from "react";
import { Link } from "react-router-dom"

class Contact extends Component {
	constructor(props) {
		super(props);
	}



	render() {
		let display;
		const contact = this.props.contacts.find(contact =>
			{ return contact.id == this.props.match.params.id })

		if (contact) {
			display = (
				<div>
					<p>{contact.name}</p>
					<p>{contact.email}</p>
				</div>
			)
		} else {
			display = (
				<h1>Sorry, contact not found!</h1>
			)
		}

		return (
			<div>
				<Link to="/">Go Back</Link>
				{display}
			</div>
		)
	}
}

export default Contact