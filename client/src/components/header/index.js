import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Modal from '../modal';
import {connect} from 'react-redux';
import Logo from './logo.png';

const Header = (props) => {
		const {account} = props;
    return (
			<Navbar fixed="top">
				<Navbar.Brand href="/#/artists">8trac
				</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="/#/artist-signup">
						Register
					</Nav.Link>
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