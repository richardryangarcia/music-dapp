import React from 'react';
import {connect} from 'react-redux';
import ipfs from '../../utils/ipfs';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { bindActionCreators } from 'redux';
import { buyMerch } from '../../redux/Artist/actions';


const values = {
	quantity: 0
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
		const {actions, merchId, artistId, price} = this.props;
		return (
			<div className='contribute'>
				<Formik
					initialValues={values}
					validate={validate}
					onSubmit={(values,  { setSubmitting }) => {
						setSubmitting(true);
						const total = values.quantity * price;
            const payload = Object.assign(values, {artistId, merchId, total})
						actions.buyMerch(payload);
					}}
				>
					{({ values, isSubmitting }) => (
						<Form style={{marginLeft: '0px', marginRight: '0px'}}>
							<b>Quantity:</b> <Field type="quantity" name="quantity" className='form-control'/><br/>
							Total price: { values.quantity * price}
							<Button type="submit" variant="success" disabled={isSubmitting} className='submit-btn' size='sm'>
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
	return {actions: bindActionCreators({buyMerch}, dispatch)}
}

export default connect(null, mapDispatchToProps)(BuyMerchForm);
