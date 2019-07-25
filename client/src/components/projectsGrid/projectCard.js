import React from 'react';
import Card from 'react-bootstrap/Card';
import PlaceHolder from '../../imagePlaceholder.svg';
import Modal from '../../components/modal';

const ProjectCard = (props) => {
    const {name, description, ipfsHash, contributors, goal, raised, remainder} = props.project;
    const bottomLink = !remainder ? (<Card.Link href="#">Go Listen</Card.Link> ) : (<Modal label="Contribute"  type="contribute"/>)
    return (
        <Card style={{ width: '14rem', border:'none' }}>
            <Card.Img variant="top" src={PlaceHolder} />
            {/* <Card.Img variant="top" src={`https://ipfs.io/ipfs/${ipfsHash}`} /> */}
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text style={{fontSize: '12px'}}>
                    {description}
                </Card.Text>
                <Card.Text style={{fontSize: '10px'}}>
                    {contributors} contributors<br/>
                    {raised} ETH raised <br/>
                    {remainder} ETH to reach goal

                </Card.Text>
                {bottomLink}     
            </Card.Body>
        </Card>
    )
}

export default ProjectCard;