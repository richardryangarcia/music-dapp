import React from 'react';
import ProjectCard from './projectCard';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import PlaceHolder from '../../imagePlaceholder.svg';
import ContributeForm from '../form/contribute';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';



const projectsList = [
    { 
        name: 'College Dropout', 
        description: 'The up and coming rappers first full length studio album. Get in on it now because this project is sure to make waves',
        ipfsHash: 'QmTmnRhEiZhxGwuXq4rP7oYsvLYAFaqsgwJZmH9aMZP7AZ',
        contributors: 49,
        goal: 3.4,
        raised: 3.4,
        remainder: 0.0
    },
    { 
        name: 'Late Registration', 
        description: 'Hot off the success of his 1st full length album, Kanye goes back to work on the follow up album',
        ipfsHash: 'QmSCxBe5iJUL8RHqd54NtVx3fXJfmMBDSk2AJPNwqFoxpj',
        contributors: 82,
        goal: 3.8,
        raised: 3.8,
        remainder: 0.0
    },
    { 
        name: 'Graduation', 
        description: '3rd full length studio album from the artist that brought you classics like College Dropout and Late Registration',
        ipfsHash: 'QmauuPCCv885u8ZkUCq9k5wSauANjKZQtdb3oLdNxYLY9D',
        contributors: 127,
        goal: 4.0,
        raised: 3.24,
        remainder: 0.76
    }
]

class ProjectsGrid extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const {isOwner, projectCount, artistId} = this.props;
        const addButton = isOwner ? (<Button href={`/#/project-create/${artistId}`} size="sm" >Add New</Button>) : (<div/>);
        return (
                <Container>
                    <Row>
                        <Col xs={12}>
                            <b>Projects</b> ( {projectCount} ) 
                        <div style={{float:'right'}}>{addButton}
                        </div>
                        <hr/>
                        </Col>
                    </Row>

                        {projectsList.map((project)=> {
                            const {projectId, ipfsHash} = project;
                            return <Row >
                                <Col xs={12} style={{ height: '200px', marginBottom: '30px'}} >
                                    <Card style={{border: 'none', marginTop: '1em', marginBottom: '1em'}}>
                                        <Container style={{margin:'0px'}}>
                                            <Row>
                                                <Col style={{padding: '0px'}} >
                                                    {ipfsHash ? (
                                                        <Card.Img variant="top" src={`https://ipfs.io/ipfs/${ipfsHash}`} style={{height:'200px', width: '200px'}} />
                                                    ) : (
                                                        <Card.Img variant="top" src={PlaceHolder} style={{height:'200px', width: '200px'}} />
                                                    )}
                                                </Col>
                                                <Col >
                                                    <Card.Text style={{fontSize: '10px', paddingTop: '5px'}}>
                                                        <b>{project.name}</b>
                                                        <br/>
                                                        {project.description}
                                                    </Card.Text>                                                 
                                                </Col>
                                                <Col>
                                                    <Card.Text style={{fontSize: '10px', paddingTop: '5px'}}>
                                                        <b>Goal:</b> {project.goal} <br/>
                                                        <b>Raised:</b> {project.raised}<br/>
                                                        {
                                                            project.raised < project.goal ? (<ContributeForm artistId={artistId} projectId={projectId} />) : (<div/>)
                                                        }
                                                    </Card.Text>                                                 
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Card>
                                </Col>
                            </Row>
                        })}
                </Container>
        );
    }
}

export default ProjectsGrid;
