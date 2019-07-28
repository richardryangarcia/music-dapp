import React from 'react';
import {connect} from 'react-redux';
import ipfs from '../../utils/ipfs';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { bindActionCreators } from 'redux';
import { addArtist } from '../../redux/ArtistFactory/actions';


const values = {
	name: '',
	symbol: '', 
	genre: '',
	bio: '', 
	location: '',
	url: '',
	imageUrl:''
}

const validate = values => {
	let errors = {};
	//add form field validations here
	return errors;
}

class ArtistSignup extends React.Component {
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
		  console.log(result[0].hash);
		})
	}
	render(){
		const {actions} = this.props;
		const {ipfsHash, sending} = this.state;
		const buttonText = ipfsHash ? 'Saved in outerspace' : 'Save image to IPFS';
		const color = ipfsHash ? 'success' : 'primary';

		return (
			<div className='artist-signup'>
				<h1>Artist Register!</h1>
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
				<b>Artist Info</b>
				<Formik
					initialValues={values}
					validate={validate}
					onSubmit={(values,  { setSubmitting }) => {
						setSubmitting(true);
						const payload = Object.assign(values, {ipfsHash})
						actions.addArtist(payload);
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							Name: <Field type="name" name="name" className='form-control'/><br/>
							Symbol: <Field type="symbol" name="symbol" className='form-control' /><br/>
							Genre: <Field type="genre" name="genre"  className='form-control'/><br/>
							Bio: <Field type="bio" name="bio" className='form-control' /><br/>
							Location: <Field type="location" name="location" className='form-control' /><br/>
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
	return {actions: bindActionCreators({addArtist}, dispatch)}
}

export default connect(null, mapDispatchToProps)(ArtistSignup);
