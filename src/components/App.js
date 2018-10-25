import React, { Component } from 'react';
import '../css/App.css';
import { Route } from 'react-router-dom';
import ContactList from "./ContactList";
import Contact from "./Contact";
import NavigationBar from "./NavigationBar";
import escapeRegExp from 'escape-string-regexp';
import {cloneDeep} from "lodash";

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
			contacts: contacts,
			search: ''
		}

		this.onCreateContact = this.onCreateContact.bind(this);
		this.onEditContact = this.onEditContact.bind(this);
		this.updateSearch = this.updateSearch.bind(this);
	}

	onCreateContact(data) {
		alert("data" + JSON.stringify(data))
		this.setState({
			contacts: this.state.contacts.concat(data),
		});

		alert(JSON.stringify(this.state.contacts))

	}

	onEditContact(data, contactId) {
		const contacts = cloneDeep(this.state.contacts);
		const index = contacts.findIndex(contact => contact.id === contactId);
		contacts[index] = {...contacts[index], ...data}
		this.setState({contacts}, () => alert(("edit" + JSON.stringfiy(this.state.contacts[index]))));
	}

	updateSearch(search) {
		this.setState({ search: search.trim() })
	}

  	render() {

  		return(
	  		<div>
	  			<NavigationBar />
	  			<Route exact path='/' render={() => (
	  				<ContactList 
	  					contacts={this.state.contacts}
	  				/>
	  			)}/>

				<Route exact path="/contact" render={(props) => 
					<Contact contacts={this.state.contacts} onCreateContact={this.onCreateContact} {...props}/>
  				}/>


  				<Route exact path="/contact/:id"  render={(props) => 
  					<Contact contacts={this.state.contacts} onEditContact={this.onEditContact} {...props}/> 
  				}/>


	  	</div>	
  	)
  }
}

export default App;
