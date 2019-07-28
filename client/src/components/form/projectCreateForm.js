import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import ipfs from '../../utils/ipfs';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { bindActionCreators } from 'redux';
import { createProject } from '../../redux/Artist/actions';


const values = {
	name: '',
	description: '', 
	cap: '',
	rate: ''
}

const validate = values => {
	let errors = {};
	//add form field validations here
	return errors;
}

class ProjectCreateForm extends React.Component {
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
		const {actions, Artists} = this.props;
		const {ipfsHash, sending} = this.state;
		const buttonText = ipfsHash ? 'Saved in outerspace' : 'Save image to IPFS';
		const color = ipfsHash ? 'success' : 'primary';

		const redirect = Artists && Artists[id] && Artists[id].instance ? (false) : (true);

		return (
			redirect ? (<Redirect to="/artists" />) : (
			<div className='artist-signup'>
				<h1>Project Create!</h1>
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
				<b>Project Info</b>
				<Formik
					initialValues={values}
					validate={validate}
					onSubmit={(values,  { setSubmitting }) => {
						setSubmitting(true);
						const payload = Object.assign(values, {ipfsHash,artistId: id})
						console.log('payload', payload);
						actions.createProject(payload);
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							Name: <Field type="name" name="name" className='form-control'/><br/>
							Description: <Field type="description" name="description" className='form-control' /><br/>
							Cap: <Field type="cap" name="cap"  className='form-control'/><br/>
							Rate: <Field type="rate" name="rate" className='form-control' /><br/>
							<Button type="submit" disabled={isSubmitting} className='submit-btn'>
								Submit
							</Button>
						</Form>
					)}
				</Formik>
			</div>)
		);
	}
}

const mapStateToProps = state => {
	return {
		Artists: state.Artist
	}
}

const mapDispatchToProps = dispatch => {
	return {actions: bindActionCreators({createProject}, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreateForm);
