import React, { Component } from "react";
import NavigationBar from "./NavigationBar"
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col, Input, Button } from 'mdbreact';
import _ from "lodash"


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
		if (this.props.onEditContact) {
			this.setState(this.props.onEditContact(contactData, contact), () => {this.handleEditMode()})
		}	
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
		let display, nameArea, emailArea, homeNumberArea, workNumberArea, mobileNumberArea, addressArea, urlArea, notesArea;

		this.state.formData.name ? nameArea = <p><i className="grey-text fa fa-user" aria-hidden="true"></i>  {this.state.formData.name}</p>: nameArea = '';			
		this.state.formData.email ? emailArea = <p><i className="grey-text fa fa-envelope" aria-hidden="true"></i>  {this.state.formData.email}</p> : emailArea = '';		
		this.state.formData.homeNumber ? homeNumberArea = <p><i className="grey-text fa fa-phone" aria-hidden="true"></i>   {this.state.formData.homeNumber}</p>: homeNumberArea = '';
		this.state.formData.mobileNumber ? mobileNumberArea = <p><i className="grey-text fa fa-mobile-phone" aria-hidden="true"></i>   {this.state.formData.mobileNumber}</p>: mobileNumberArea = '';
 		this.state.formData.workNumber ? workNumberArea = <p><i className="grey-text fa fa-phone" aria-hidden="true"></i>   {this.state.formData.workNumber}</p>: workNumberArea = '';
		this.state.formData.address ? addressArea = <p><i className="grey-text fa fa-map-marker" aria-hidden="true"></i>   {this.state.formData.address}</p>: addressArea = '';
		this.state.formData.url ? urlArea = <p><i className="grey-text fa fa-laptop" aria-hidden="true"></i>   {this.state.formData.url}</p> : urlArea = '';
		this.state.formData.notes ? notesArea = <p><i className="grey-text fa fa-pencil" aria-hidden="true"></i>   {this.state.formData.notes}</p> : notesArea = '';



		if (this.props.match.path == "/contact") {
			display = (
			<Container className="mt-5">	
				<Row>
					<Col md="6" xs="10">
						<form onSubmit={(event) => this.handleSubmit(event)} >
							<div className="grey-text mt-5 p-3">
								<h2>Add Contact</h2>
								<Input type='text' label="Name" icon="user" id='name' value={this.state.formData.name} onChange={this.handleChange}/>
								<Input type='text' label="Email" icon="envelope" id='email' value={this.state.formData.email} onChange={this.handleChange}/>
								<Input type='text' label="Home Number" icon="phone" id='homeNumber' name='homeNumber' placeholder="Home Number" value={this.state.formData.homeNumber} onChange={this.handleChange}/>
								<Input type="text" label="Mobile Number" icon="mobile-phone" id="mobileNumber" value={this.state.formData.mobileNumber} onChange={this.handleChange}/>
								<Input type="text" label="Work Number" icon="phone" id="workNumber" value={this.state.formData.workNumber} onChange={this.handleChange}/>
								<Input type='text' label="Address" icon="map-marker" id="address" value={this.state.formData.address} onChange={this.handleChange}/>
								<Input type="text" label="URL" icon="laptop" id="url" value={this.state.formData.url} onChange={this.handleChange}/>
								<Input type="textarea" label="Notes" icon="pencil" id="notes" value={this.state.formData.notes} onChange={this.handleChange}/>
							</div>
							<div className="text-center">
								<Button color="primary" type="submit">Add Contact</Button>
							</div>
						</form>

						{this.state.redirect && (
							<Redirect to={'/'}/>
						)}
					</Col>
				</Row>
			</Container>
			)

		} else {

			const contactId = this.props.contacts.find(contact =>
				{ return contact.id == this.props.match.params.id }).id

			!this.state.editMode ?	

			
			display = (
				<Container className="mt-5">	
					<Row>
						<Col md="6" xs="10">
							<div className="mt-5 p-3">
								{nameArea}
								{emailArea}					
								{homeNumberArea}
								{mobileNumberArea}
								{workNumberArea}
								{addressArea}
								{urlArea}
								{notesArea}
							</div>
						</Col>
					</Row>
				</Container>		
			) :

			display = (
			<Container className="mt-5">	
				<Row>
					<Col md="6" xs="10">
						<form onSubmit={(event) => this.handleEditSubmit(event, contactId)}>
							<div className="grey-text mt-5 p-3">
								<h2>Edit Contact</h2>
								<Input type='text' label="Name" icon="user" id='name' value={this.state.formData.name} onChange={this.handleChange}/>
								<Input type='text' label="Email" icon="envelope" id='email' value={this.state.formData.email} onChange={this.handleChange}/>
								<Input type='text' label="Home Number" icon="phone" id='homeNumber' value={this.state.formData.homeNumber} onChange={this.handleChange}/>
								<Input type="text" label="Mobile Number" icon="mobile-phone" id="mobileNumber" value={this.state.formData.mobileNumber} onChange={this.handleChange}/>
								<Input type="text" label="Work Number" icon="phone-square" id="workNumber" value={this.state.formData.workNumber} onChange={this.handleChange}/>
								<Input type='text' label="Address" icon="address-card"id="address" value={this.state.formData.address} onChange={this.handleChange}/>
								<Input type="text" label="URL" icon="laptop" id="url" value={this.state.formData.url} onChange={this.handleChange}/>
								<Input type="textarea" label="Notes" icon="pencil" id="notes" value={this.state.formData.notes} onChange={this.handleChange}/>
							</div>
							<div className="text-center">	
								<Button type="submit">Add Contact</Button>
							</div>
						</form>
					</Col>
				</Row>
			</Container>	

				
			)
		}

		return (
			<div>
				<NavigationBar match={this.props.match} 
							   editMode={this.state.editMode}
							   onHandleEditMode={this.handleEditMode}
							   onHandleSubmit={(event) => this.handleSubmit(event)}
							   onHandleEdit={(event, contact) => this.handleEditSubmit(event, contact)}
							   formEvent={this.event}
							   contactInfo={ this.props.contacts.find(contact =>
									{ return contact.id == this.props.match.params.id }).id}
				/>
				
				{display}
					<button onClick={this.handleEditMode}>Edit</button>
						<Link to="/">Go Back</Link>

			</div>
		)
	}
}

export default Contact