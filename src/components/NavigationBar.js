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

		if (this.props.match.path == '/') {
			rightButton = <Link to="/contact">Add</Link>
		} else {
			if (_.isEmpty(this.props.match.params)) {
				rightButton = <a className="text-primary" onClick={this.handleSubmit}>Add</a>
			} else {
				if (this.props.editMode) {
					rightButton = <a className="text-primary" onClick={this.handleEdit}>Add</a>
				} else {
					rightButton = <a className="text-primary" onClick={this.handleEditMode}>Edit</a>
				}
			}	

			leftButton = <Link to="/">Back</Link>
		}	

		leftButton = <Link to="/">Back</Link>


		return(
			<Navbar color="red" fixed="top" expand="xs">
				<NavbarNav left>
					<NavItem>
						{leftButton}
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