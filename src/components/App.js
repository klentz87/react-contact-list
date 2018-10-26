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
		id: 1540538341501,
		name: "Montana Sharma",
		email: "msharma@gmail.com",
	},
	{
		id: 1540538356203,
		name: "Osian Jeffery",
		email: "osian.jeffery@yahoo.com"
	},
	{	
		id: 1540538369787,
		name: "Christiana Carey",
		email: "ccarey@hotmail.com"
	},
	{	
		id: 1540538383019,
		name: "Jorden Shea",
		email: "jordan.h.shea@yahoo.com"
	},
	{	
		id: 1540538395338,
		name: "Makayla Thomson",
		email: "mkthomson@gmail.com"
	},
	{	
		id: 1540538404290,
		name: "Aleksander Corrigan",
		email: "acorrigan@yahoo.com"
	},
	{	
		id: 1540538414417,
		name: "Ella-May Corbett",
		email: "emc@gmail.com"
	},
	{	
		id: 1540538435297,
		name: "Shelley Wheatley",
		email: "wheatley.shelley@yahoo.com"
	},
	{	
		id: 1540538445703,
		name: "Mindy Zamora",
		email: "m.zamora@gmail.com"
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
		this.setState({
			contacts: this.state.contacts.concat(data),
		});
	}

	onEditContact(data, contactId) {
		const contacts = cloneDeep(this.state.contacts);
		const index = contacts.findIndex(contact => contact.id === contactId);
		contacts[index] = {...contacts[index], ...data}
		this.setState({contacts});
	}

	updateSearch(search) {
		this.setState({ search: search.trim() })
	}

  	render() {

  		return(
	  		<div>
	  			<Route exact path='/' render={(props) => (
	  				<ContactList contacts={this.state.contacts} {...props}
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
