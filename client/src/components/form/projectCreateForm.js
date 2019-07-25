import React from 'react';
import {connect} from 'react-redux';
import {Formik, Form, Field, ErrorMessage} from 'formik';

const values = {
	name: '',
	symbol: '', 
	genre: '',
	bio: '', 
	location: '',
	url: ''
	// imageUrl:''
}

const validate = values => {
	let errors = {};
	// if (!values.email) {
	// 	errors.email = 'Required';
	// } else if (
	// 	!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
	// ) {
	// 	errors.email = 'Invalid email address';
	// }
	return errors;
}

const tryAsync = async (ArtistFactory, account, values) => {
	const {name, symbol, genre, bio, location, url} = values;
	console.log('about to submit')
	const response  = await ArtistFactory.methods.addArtist(name, symbol, genre, bio, location, url).send({ from: account });
	console.log('finishing submitting')
	console.log(response);
	return response;
  }

const ArtistSignup = (props) => {
	const {ArtistFactory, account} = props;
	return (
		<div>
			<h1>Add Artist</h1>
			<Formik
				initialValues={values}
				validate={validate}
				onSubmit={(values, { setSubmitting }) => {
					tryAsync(ArtistFactory, account, values)
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						
						Name: <Field type="name" name="name" /><br/>
						Symbol: <Field type="symbol" name="symbol" /><br/>
						Genre: <Field type="genre" name="genre" /><br/>
						Bio: <Field type="bio" name="bio" /><br/>
						Location: <Field type="location" name="location" /><br/>
						{/* URL: <Field type="url" name="url" /><br/> */}
						<button type="submit" disabled={isSubmitting}>
							Submit
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		account: state.application && state.application.account, 
		ArtistFactory: state.contracts && state.contracts.artistFactory
	}
}

export default connect(mapStateToProps, null)(ArtistSignup);
