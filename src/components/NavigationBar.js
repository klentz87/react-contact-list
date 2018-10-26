import React, { Component } from "react";
import { Navbar, NavbarNav, NavItem } from 'mdbreact';
import { Link } from "react-router-dom";
import _ from "lodash"

class NavigationBar extends Component {
	constructor() {
		super();

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleEditMode = this.handleEditMode.bind(this);
	}

	handleSubmit(event) {
		this.props.onHandleSubmit(event)
	}

	handleEdit(event) {
		this.props.onHandleEdit(event, this.props.contactInfo)
	}

	handleEditMode() {
		this.props.onHandleEditMode();
	}

	render() {

		let rightButton, leftButton;

		if (_.isEmpty(this.props.match.params)) {
			rightButton = <a onClick={this.handleSubmit}>Add</a>
		} else {
			if (this.props.editMode) {
				rightButton = <a onClick={this.handleEdit}>Add</a>
			} else {
				rightButton = <a onClick={this.handleEditMode}>Edit</a>
			}
		}	

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
						{rightButton}
					</NavItem>
				</NavbarNav>
			</Navbar>
		)
	}	
}

export default NavigationBar;