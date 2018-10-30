import React, { Component } from "react";
import { Navbar, NavbarNav, NavItem } from 'mdbreact';
import { Link } from "react-router-dom";
import _ from "lodash";
import "../css/NavigationBar.css"

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

		let rightButton, leftButton, center;

		if (this.props.match.path === '/') {
			rightButton = <Link to="/contact"><h4>Add</h4></Link>
			leftButton = <a href="http://www.krislentz.net" className="text-primary"><h4>Home</h4></a>
			center = <h3 className="text-center">Contact</h3>
		} else {
			if (_.isEmpty(this.props.match.params)) {
				rightButton = <button type="button" className="text-primary button-link" onClick={this.handleSubmit}><h4>Add</h4></button>
				center = <h3 className="text-center">Add Contact</h3>
			} else {
				if (this.props.editMode) {
					rightButton = <button type="button "className="text-primary button-link" onClick={this.handleEdit}><h4>Add</h4></button>
				} else {
					rightButton = <button type="button" className="text-primary button-link" onClick={this.handleEditMode}><h4>Edit</h4></button>
				}
				center = <h3 className="text-center">{this.props.contactInfo.name}</h3>

			}	
			leftButton = <Link to="/"><h4>Back</h4></Link>

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
						{center}
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