import React from 'react';
import {connect} from 'react-redux';
import ipfs from '../../utils/ipfs';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { bindActionCreators } from 'redux';
import { addMerch } from '../../redux/Artist/actions';


const values = {
	quantity: ''
}

const validate = values => {
	let errors = {};
	//add form field validations here
	return errors;
}

class BuyMerchForm extends React.Component {
	constructor(props){
		super(props);
	}


	render(){
		const {actions, merchId, artistId} = this.props;

		return (
			<div className='contribute'>
				<Formik
					initialValues={values}
					validate={validate}
					onSubmit={(values,  { setSubmitting }) => {
						setSubmitting(true);
            const payload = Object.assign(values, {artistId, merchId})
						actions.addMerch(payload);
					}}
				>
					{({ isSubmitting }) => (
						<Form style={{marginLeft: '0px', marginRight: '0px'}}>
							<b>Quantity:</b> <Field type="quantity" name="quantity" className='form-control'/><br/>
							<Button type="submit" disabled={isSubmitting} className='submit-btn' size='sm'>
								Buy
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {actions: bindActionCreators({addMerch}, dispatch)}
}

export default connect(null, mapDispatchToProps)(BuyMerchForm);
