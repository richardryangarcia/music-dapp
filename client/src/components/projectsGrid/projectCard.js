import React from 'react';
import Card from 'react-bootstrap/Card';
import {connect} from 'react-redux';
import PlaceHolder from '../../imagePlaceholder.svg';
import Modal from '../../components/modal';
import { bindActionCreators } from '../../../../../../../Library/Caches/typescript/3.5/node_modules/redux';
// import {updateProjects} from '../../redux/Project';

const ProjectCard = (props) => {
    const {artistId, projectCount, Projects} = this.props;
    const {name, description, ipfsHash, contributors, goal, raised, remainder} = props.project;
    const bottomLink = !remainder ? (<Card.Link href="#">Go Listen</Card.Link> ) : (<Modal label="Contribute"  type="contribute"/>)
    return (
        <div className='projects' >
            <b>Projects</b> ( {projectCount} ) 
            <div style={{float:'right'}}>
            </div>
            <hr/>
            <Card style={{ width: '100%', border:'none' }}>
                <Card.Img variant="top" src={PlaceHolder} />
                {/* <Card.Img variant="top" src={`https://ipfs.io/ipfs/${ipfsHash}`} /> */}
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    {/* <Card.Text style={{fontSize: '12px'}}>
                        {description}
                    </Card.Text>
                    <Card.Text style={{fontSize: '10px'}}>
                        {contributors} contributors<br/>
                        {raised} ETH raised <br/>
                        {remainder} ETH to reach goal

                    </Card.Text>
                    {bottomLink}      */}
                </Card.Body>
            </Card>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        // Artists: state.Artist,
        Projects: state.Project
    }
}

const mapDispatchToProps = dispatch => {
    return {actions: bindActionCreators({}, dispatch)}
}

export default (mapStateToProps, mapDispatchToProps)(ProjectCard);