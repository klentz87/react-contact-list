import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Input, Button, Fa, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';


class Contact extends Component {
	constructor(props) {
		super(props);

		this.state = {
			editMode: false,
			redirect: false,
			formData: {
				name: "",
				email: "",
				homeNumber: "",
				mobileNumber: "",
				workNumber: "",
				address: "",
				url: "",
				notes: ""
			}
		}
		this.handleEditMode = this.handleEditMode.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRedirect = this.handleRedirect.bind(this);
		this.handleEditSubmit = this.handleEditSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		const contact = this.props.contacts.find(contact =>
			{ return contact.id == this.props.match.params.id })
		
		contact && this.setState({ formData: contact });
	}

	handleSubmit(event) {
		event.preventDefault();
		let contactData = this.state.formData;
		contactData["id"] = Date.now(); // adds a unique id
		if (this.props.onCreateContact) {
			this.setState(this.props.onCreateContact(contactData), () => {this.handleRedirect()})
		}
	}

	handleRedirect() {
		this.setState({
			redirect: true
		})
	}

	handleEditMode() {
		this.setState({editMode: !this.state.editMode})
	}

	handleEditSubmit(event, contact) {
		event.preventDefault();
		let contactData = this.state.formData;
//		if (this.props.onEditContact) {
			this.setState(this.props.onEditContact(contactData, contact), () => {this.handleEditMode()})
//		}	
	}

	handleChange(event) {
		const id = event.target.id;
		const value = event.target.value;

		this.setState(prevState => ({
			formData: {...prevState.formData,
				[id]: value
			}
		}))
	}


	render() {
		let display;

		if (this.props.match.path == "/contact") {
			display = (
				<div className="mt-5">
					<h1>New</h1>
					<form onSubmit={(event) => this.handleSubmit(event)} >
						<input type='text' id='name' name='name' placeholder="Name" value={this.state.formData.name} onChange={this.handleChange}/>
						<input type='text' id='email' name='email' placeholder="Email" value={this.state.formData.email} onChange={this.handleChange}/>
						<input type='text' id='homeNumber' name='homeNumber' placeholder="Home Number" value={this.state.formData.homeNumber} onChange={this.handleChange}/>
						<input type="text" id="mobileNumber" placeholder="Mobile Number" value={this.state.formData.mobileNumber} onChange={this.handleChange}/>
						<input type="text" id="workNumber" placeholder="Work Number" value={this.state.formData.workNumber} onChange={this.handleChange}/>
						<input type='text' id="address" placeholder="Address" value={this.state.formData.address} onChange={this.handleChange}/>
						<input type="text" id="url" placeholder="Url" value={this.state.formData.url} onChange={this.handleChange}/>
						<input type="textarea" id="notes" placeholder="Notes" value={this.state.formData.notes} onChange={this.handleChange}/>
						<button >Add Contact</button>
					</form>

					{this.state.redirect && (
						<Redirect to={'/'}/>
					)}
				</div>	)

		} else {

			const contactId = this.props.contacts.find(contact =>
				{ return contact.id == this.props.match.params.id }).id

			!this.state.editMode ?	

			display = (
				<div>
					<p>{this.state.formData.name}</p>
					<p>{this.state.formData.email}</p>					
					<p>{this.state.formData.homeNumber}</p>
					<p>{this.state.formData.mobileNumber}</p>
					<p>{this.state.formData.workNumber}</p>
					<p>{this.state.formData.address}</p>
					<p>{this.state.formData.url}</p>
					<p>{this.state.formData.notes}</p>
				</div>
			) :

			display = (
				<div>
					<form onSubmit={(event) => this.handleEditSubmit(event, contactId)}>
						<input type='text' id='name' placeholder="Name" defaultValue={this.state.formData.name} onChange={this.handleChange}/>
						<input type='text' id='email' placeholder="Email" defaultValue={this.state.formData.email} onChange={this.handleChange}/>
						<input type='text' id='homeNumber' placeholder="Home Number" defaultValue={this.state.formData.homeNumber} onChange={this.handleChange}/>
						<input type="text" id="mobileNumber" placeholder="Mobile Number" defaultValue={this.state.formData.mobileNumber} onChange={this.handleChange}/>
						<input type="text" id="workNumber" placeholder="Work Number" defaultValue={this.state.formData.workNumber} onChange={this.handleChange}/>
						<input type='text' id="address" placeholder="Address" defaultValue={this.state.formData.address} onChange={this.handleChange}/>
						<input type="text" id="url" placeholder="URL" defaultValue={this.state.formData.url} onChange={this.handleChange}/>
						<input type="textarea" id="notes" placeholder="Notes" defaultValue={this.state.formData.notes} onChange={this.handleChange}/>
						<button>Add Contact</button>
					</form>
				</div>	
			)
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