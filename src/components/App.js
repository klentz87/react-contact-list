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
	}

	onCreateContact(data) {
//		let contactData = serializeForm(event.target, {hash: true})
//		is there an argument in serializeForm to add a property?
//		contactData["id"] = Date.now(); // adds a unique id
		this.setState({
			contacts: this.state.contacts.concat(data),
		});
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

  				<Route path="/:id"  render={(props) => 
  					<Contact contacts={this.state.contacts} {...props}/> 
  				}/>
	  	</div>	
  	)
  }
}

export default App;
