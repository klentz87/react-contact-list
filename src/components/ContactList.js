import React, { Component } from "react";
import { Link } from "react-router-dom";

class ContactList extends Component {
	constructor() {
		super();
	}

	render() {
		const contacts = this.props.contacts.sort((a, b) => {
 			let nameOne = a.name.toLowerCase(), nameTwo = b.name.toLowerCase();
 			if (nameOne < nameTwo) return -1;
 			if (nameOne > nameTwo) return 1;
 			return 0;
		})

		return (
			<div>
				<Link to={'/new'}>New Contact</Link>
				<ul>
					{contacts.map((contact) => (
						<li key={contact.id} id={contact.id}>
							<Link to={`/${contact.id}`}>
								<p>{contact.name}</p>
							</Link>
						</li>

					))}
				</ul>
			</div>
		)
	}
}

export default ContactList;