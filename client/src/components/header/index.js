import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {connect} from 'react-redux';

const Header = (props) => {
		const {account} = props;
    return (
			<Navbar fixed="top">
				<Navbar.Brand href="/#/artists">8Trac</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="/#/artist-signup">Register</Nav.Link>
				</Nav>
				<Navbar.Text>{account}</Navbar.Text>
			</Navbar>
    )
}

const mapStateToProps = (state) => {
	return {
		account: state.application && state.application.account
	}
}

export default connect(mapStateToProps, null)(Header);