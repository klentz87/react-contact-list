import React, { Component } from "react";
import { Link } from "react-router-dom";
import serializeForm from "form-serialize";


class Contact extends Component {
	constructor(props) {
		super(props);

		this.state = {
			editMode: false
		}
		this.handleEditMode = this.handleEditMode.bind(this);
		this.handleEditSubmit = this.handleEditSubmit.bind(this)
	}

	handleEditMode() {
		this.setState({editMode: !this.state.editMode})
	}

	handleEditSubmit(event, contact) {
		event.preventDefault();
		let contactData = serializeForm(event.target, {hash: true})
		if (this.props.onEditContact) {
			this.setState(this.props.onEditContact(contactData, contact), () => {this.handleEditMode()})
		}
	}


	render() {
		let display;
		const contact = this.props.contacts.find(contact =>
			{ return contact.id == this.props.match.params.id })

		if (contact) {
			!this.state.editMode ?	
			
			display = (
				<div>
					<p>{contact.name}</p>
					<p>{contact.email}</p>					
					<p>{contact.homeNumber}</p>
					<p>{contact.mobileNumber}</p>
					<p>{contact.workNumber}</p>
					<p>{contact.address}</p>
					<p>{contact.url}</p>
					<p>{contact.notes}</p>
				</div>
			) :

			display = (
				<div>
					<form onSubmit={(event) => this.handleEditSubmit(event, contact)}>
						<input type='text' name='name' placeholder="Name" value={contact.name}/>
						<input type='text' name='email' placeholder="Email" value={contact.email}/>
						<input type='text' name='homeNumber' placeholder="Home Number" value={contact.homeNumber}/>
						<input type="text" name="mobileNumber" placeholder="Mobile Number" value={contact.mobileNumber}/>
						<input type="text" name="workNumber" placeholder="Work Number" value={contact.workNumber}/>
						<input type='text' name="address" placeholder="Address" value={contact.address}/>
						<input type="text" name="url" placeholder="Url" value={contact.url}/>
						<input type="textarea" name="notes" placeholder="Notes" value={contact.notes}/>
						<button>Add Contact</button>
					</form>

				</div>	)
			} else {
				display = <h1>Sorry Buddy</h1>
			}

		return (
			<div>
				<button onClick={this.handleEditMode}>Edit</button>
				<Link to="/">Go Back</Link>
				{display}
			</div>
		)
	}
}

export default Contact