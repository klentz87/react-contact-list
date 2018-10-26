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
			rightButton = <Link to="/contact"><h4>Add</h4></Link>
			leftButton = <a href="http://www.krislentz.net" className="text-primary"><h4>Home</h4></a>
		} else {
			if (_.isEmpty(this.props.match.params)) {
				rightButton = <a className="text-primary" onClick={this.handleSubmit}><h4>Add</h4></a>
			} else {
				if (this.props.editMode) {
					rightButton = <a className="text-primary" onClick={this.handleEdit}><h4>Add</h4></a>
				} else {
					rightButton = <a className="text-primary" onClick={this.handleEditMode}><h4>Edit</h4></a>
				}
				leftButton = <Link to="/"><h4>Back</h4></Link>
			}	
		}	

		return(
			<Navbar color="red" fixed="top" expand="xs">
				<NavbarNav left>
					<NavItem>
						{leftButton}
					</NavItem>
				</NavbarNav>
					
				<NavbarNav>
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