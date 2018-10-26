import React, { Component } from "react";
import { Link } from "react-router-dom";
import escapeRegExp from 'escape-string-regexp';
import { Navbar, NavbarNav, NavItem, Container } from 'mdbreact';
import '../css/ContactList.css';
 
class ContactList extends Component {
	constructor() {
		super();

		this.state = {
			search: ''
		}
	}

	updateSearch(search) {
		this.setState({ search: search.trim() })
	}

	render() {
		const contacts = this.props.contacts.sort((a, b) => {
 			let nameOne = a.name.toLowerCase(), nameTwo = b.name.toLowerCase();
 			if (nameOne < nameTwo) return -1;
 			if (nameOne > nameTwo) return 1;
 			return 0;
		});

		let searchedContacts;
		if (this.state.search) {
			const match = new RegExp(escapeRegExp(this.state.search), "i")
			searchedContacts = contacts.filter((contact) => match.test(contact.name))
		} else {
			searchedContacts = contacts
		}


		return (
			<div>
				<Navbar className='search-bar' expand="xs">
					<NavbarNav>
						<NavItem>	
							<input value={this.state.search} onChange={(event) => {this.updateSearch(event.target.value)}}/>
						</NavItem>
					</NavbarNav>		
				</Navbar>
			
				<ul className="mt-5">
					{searchedContacts.map((contact) => (
						<li key={contact.id} id={contact.id}>
							<Link to={`/contact/${contact.id}`}>
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