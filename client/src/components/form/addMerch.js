import React from 'react';
import {connect} from 'react-redux';
import ipfs from '../../utils/ipfs';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { bindActionCreators } from 'redux';
import { addMerch } from '../../redux/Artist/actions';


const values = {
	name: '',
	description: '', 
	quantity: '',
	price: ''
}

const validate = values => {
	let errors = {};
	//add form field validations here
	return errors;
}

class AddMerchForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			buffer: null,
			sending: false,
			error: null,
		  ipfsHash: '',
		}
	
		this.captureFile = this.captureFile.bind(this)
		this.onImageSubmit = this.onImageSubmit.bind(this)
	}


	captureFile(event){
		event.preventDefault();
		const file = event.target.files[0];
		const reader = new window.FileReader()
		reader.readAsArrayBuffer(file)
		reader.onloadend = () => {
		  this.setState({buffer: Buffer(reader.result)});
		}
	}

	onImageSubmit(event){
		event.preventDefault();
		this.setState({sending:true});
		const { buffer } = this.state;
		ipfs.add(buffer, async (error, result) => {
		  if (error) {
				this.setState({sending:false, error});
				return
			}
			
		  this.setState({ipfsHash: result[0].hash, sending:false});
		})
	}
	render(){
		const {id} = this.props.match.params;
		const {actions} = this.props;
		const {ipfsHash, sending} = this.state;
		const buttonText = ipfsHash ? 'Saved in outerspace' : 'Save image to IPFS';
		const color = ipfsHash ? 'success' : 'primary';

		return (
			<div className='artist-signup'>
				<h1>Add Merch</h1>
				<br/>
				<br/>

				<b>Upload an image</b>
				<form onSubmit={this.onImageSubmit}>
					<input id='imageInput' type='file' onChange={this.captureFile} />
					<Button type='submit' variant={color} disabled={sending} className='ipfs-btn'> 
						{sending ? (
							<div>
								<Spinner
									as="span"
									animation="grow"
									size="sm"
									role="status"
									aria-hidden="true"
								/> Going Interplanetary...
							</div>
						) : (buttonText)}
					 </Button>
				</form>

				<br/>
				<br/>
				<br/>
				<b>Merch Details</b>
				<Formik
					initialValues={values}
					validate={validate}
					onSubmit={(values,  { setSubmitting }) => {
						setSubmitting(true);
						const payload = Object.assign(values, {ipfsHash, artistId: id})
						actions.addMerch(payload);
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							Name: <Field type="name" name="name" className='form-control'/><br/>
							Description: <Field type="description" name="description" className='form-control' /><br/>
							Quantity: <Field type="quantity" name="quantity"  className='form-control'/><br/>
							Price: <Field type="price" name="price" className='form-control' /><br/>
							<Button type="submit" disabled={isSubmitting} className='submit-btn'>
								Submit
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

export default connect(null, mapDispatchToProps)(AddMerchForm);
