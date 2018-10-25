import React, { Component } from "react";
import { Link } from "react-router-dom";
import escapeRegExp from 'escape-string-regexp';
import { Navbar, NavbarNav, NavItem, Container } from 'mdbreact';
 
class ContactList extends Component {
	constructor() {
		super();
		
		this.state = {
			search: ''
		}

		this.updateSearch = this.updateSearch.bind(this);
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
				<Navbar color="red" fixed="top" expand="xs">
					<NavbarNav left>
						<NavItem>
							<a href='http://www.krislentz.net'>Home</a>
						</NavItem>
					</NavbarNav>
					
					<NavbarNav center>
						<NavItem>
							<h3>Contact</h3>
						</NavItem>
					</NavbarNav>
					
					<NavbarNav right>
						<NavItem>
							<Link to={'/contact'}>New</Link>
						</NavItem>
					</NavbarNav>
				</Navbar>
				<Navbar>
					<NavbarNav>
						<input className="mt-5" value={this.state.search} onChange={(event) => {this.updateSearch(event.target.value)}}/>
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