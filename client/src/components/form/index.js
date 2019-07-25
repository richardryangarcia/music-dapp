import React from 'react';
import {connect} from 'react-redux';
import ipfs from '../../utils/ipfs';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Button from 'react-bootstrap/Button';
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
	// if (!values.email) {
	// 	errors.email = 'Required';
	// } else if (
	// 	!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
	// ) {
	// 	errors.email = 'Invalid email address';
	// }
	return errors;
}

// const tryAsync = async (ArtistFactory, account, values) => {
// 	const {name, symbol, genre, bio, location, url} = values;
// 	console.log('about to submit')
// 	const response  = await ArtistFactory.methods.addArtist(name, symbol, genre, bio, location, url).send({ from: account });
// 	console.log('finishing submitting')
// 	console.log(response);
// 	return response;
//   }

class ArtistSignup extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		  buffer: null,
		  ipfsHash: '',
		}
	
		this.captureFile = this.captureFile.bind(this)
		this.onImageSubmit = this.onImageSubmit.bind(this)
		// this.submitNewArtist = this.submitNewArtist.bind(this)
	}
	// async submitNewArtist  (ArtistFactory, account, values) {
	// 	console.log(values);
	// 	// const {name, symbol, genre, bio, location} = values;
	// 	const {ipfsHash} = this.state;
	// 	const payload = Object.assign(values, {ipfsHash})
	// 	console.log('about to submit')
	// 	this.props.actions.addArtist(payload);
	// 	console.log('finishing submitting')
	// 	const response ='';
	// 	console.log(response);
	// 	return response;
	//   }

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
		console.log('submitting....');
		const { buffer } = this.state;
		ipfs.add(buffer, async (error, result) => {
		  if (error) {
			console.log(error)
			return
		  }

		  this.setState({ipfsHash: result[0].hash});
		  console.log(result[0].hash);
		})
	}
	render(){
		const {actions} = this.props;
		const {ipfsHash} = this.state;
		return (
			<div className='artist-signup'>
				<b>Upload an image</b>
				<form onSubmit={this.onImageSubmit}>
					<input id='imageInput' type='file' onChange={this.captureFile} />
					<Button size='sm' type='submit'> Save image to IPFS! </Button>
				</form>

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
							<Button type="submit" disabled={isSubmitting}>
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
