import React from 'react';
import {connect} from 'react-redux';
import ipfs from '../../utils/ipfs';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { bindActionCreators } from 'redux';
import { contribute, addUserAsMinter } from '../../redux/Project/actions';


const values = {
	amount: ''
}

const validate = values => {
	let errors = {};
	//add form field validations here
	return errors;
}

class ContributeForm extends React.Component {
	constructor(props){
		super(props);
	}


	render(){
		const {actions, artistId, projectId} = this.props;

		return (
			<div className='contribute'>
				<Formik
					initialValues={values}
					validate={validate}
					onSubmit={(values,  { setSubmitting }) => {
						setSubmitting(true);
						const payload = Object.assign(values, {artistId, projectId})
						// actions.addUserAsMinter(payload)
						actions.contribute(payload);
					}}
				>
					{({ isSubmitting }) => (
						<Form style={{marginLeft: '0px', marginRight: '0px'}}>
							<b>Amount:</b> <Field type="amount" name="amount" className='form-control'/><br/>
							<Button type="submit" variant="success" disabled={isSubmitting} className='submit-btn' size='sm'>
								Contribute
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {actions: bindActionCreators({contribute, addUserAsMinter}, dispatch)}
}

export default connect(null, mapDispatchToProps)(ContributeForm);
