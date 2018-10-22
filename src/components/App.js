import React, { Component } from 'react';
import '../css/App.css';
import { Route } from 'react-router-dom';
import NewContact from "./NewContact";
import ContactList from "./ContactList";
import Contact from "./Contact";
import serializeForm from "form-serialize";

let contacts = [
	{	
		id: 122345,
		name: "kris",
		email: "kris@gmail.com"
	},
	{
		id: 223465,
		name: "chris",
		email: "chris@gmail.com"
	}
]



class App extends Component {
	constructor() {
		super();
		this.state = {
			contacts: contacts
		}

		this.onCreateContact = this.onCreateContact.bind(this);
		this.onEditContact = this.onEditContact.bind(this)
	}

	onCreateContact(data) {
		this.setState({
			contacts: this.state.contacts.concat(data),
		});
	}

	onEditContact(data, contactId) {
		const contacts = this.state.contacts;
		const contact = contacts.find(contact => {
			return contact.id === contactId
		})
	}



  	render() {
  		return(
	  		<div>
	  			<Route exact path='/' render={() => (
	  				<ContactList 
	  					contacts={this.state.contacts}
	  				/>
	  			)}/>

				<Route exact path="/new" render={() => 
  					<NewContact
  						onCreateContact={this.onCreateContact}
  					/>
  				}/>


  				<Route exact path="/:id"  render={(props) => 
  					<Contact contacts={this.state.contacts} onEditContact={this.onEditContact} {...props}/> 
  				}/>


	  	</div>	
  	)
  }
}

export default App;
