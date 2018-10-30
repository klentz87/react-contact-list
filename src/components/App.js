import React, { Component } from 'react';
import '../css/App.css';
import { Route } from 'react-router-dom';
import ContactList from "./ContactList";
import Contact from "./Contact";
import {cloneDeep} from "lodash";

let contacts = [
	{	
		id: 1540538341501,
		name: "Montana Sharma",
		email: "msharma@gmail.com",
		homeNumber: "(812) 313-2458",
		mobileNumber: "(812) 254-1919",
	},
	{
		id: 1540538356203,
		name: "Osian Jeffery",
		email: "osian.jeffery@yahoo.com",
		mobileNumber: "(369) 955-7732",
		workNumber: "(950) 538-7805",
		url: "http://www.josian.net"
	},
	{	
		id: 1540538369787,
		name: "Christiana Carey",
		email: "ccarey@hotmail.com",
		mobileNumber: "(320) 693-8938",
		notes: "Met at gala"
	},
	{	
		id: 1540538383019,
		name: "Jorden Shea",
		email: "jordan.h.shea@yahoo.com",
		mobileNumber: "(471) 559-5278",
		url: "http://www.sheaimports.com",
		notes: "Shale vendor"

	},
	{	
		id: 1540538395338,
		name: "Makayla Thomson",
		email: "mkthomson@gmail.com",
		homeNumber: "(736) 715-1236",
		mobileNumber: "(736) 327-2987",
		workNumber: "(736) 505-9879",
		address: "2620 Fort Street, Engelhard, NC 27824"

	},
	{	
		id: 1540538404290,
		name: "Aleksander Corrigan",
		email: "acorrigan@yahoo.com",
		homeNumber: "(812) 454-9678",
		mobileNumber: "(210) 274-0097",
		address: "399 Parrish Avenure, Salinas, CA 93901",
		notes: "Met at networking function"
	},
	{	
		id: 1540538414417,
		name: "Ella-May Corbett",
		email: "emc@gmail.com",
		mobileNumber: "(812) 313-2458",
		workNumber: "(374) 843-6555",
		address: "1822 Brannon Avenue, Jacksonville, FL 32202"
	},
	{	
		id: 1540538435297,
		name: "Shelley Wheatley",
		email: "wheatley.shelley@yahoo.com",
		homeNumber: "(943) 975-0239",
		workNumber: "(632) 960-8509"
	},
	{	
		id: 1540538445703,
		name: "Mindy Zamora",
		email: "m.zamora@gmail.com",
		homeNumber: "(215) 743-3475",
		mobileNumber: "(651) 522-1262",
		workNumber: "(861) 974-5380",
		notes: "Friend of Susie"
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
		this.onDeleteContact = this.onDeleteContact.bind(this);
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

	onDeleteContact(contactId) {
		let newContacts = this.state.contacts.filter(contact => {
			return contact.id !== contactId
		});
		alert(JSON.stringify(newContacts));

		this.setState({contacts: newContacts});
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
  					<Contact contacts={this.state.contacts} onEditContact={this.onEditContact} onDeleteContact={this.onDeleteContact} {...props}/> 
  				}/>


	  	</div>	
  	)
  }
}

export default App;
