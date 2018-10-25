import React, { Component } from "react";
import { Navbar, NavbarNav, NavItem } from 'mdbreact';
import { Link } from "react-router-dom";

class NavigationBar extends Component {
	constructor() {
		super();
	}

	render() {
		return(
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
		)
	}	
}

export default NavigationBar;