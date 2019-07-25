import React from 'react';
import ProjectCard from './projectCard';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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

const ProjectsGrid = (props) => {
    return (
        <div>
            <Container>
                <Row >
                    {projectsList.map((project)=> {
                        return <Col ><ProjectCard project={project}/></Col>
                    })}
                </Row>
            </Container>
        </div>
    );
}

export default ProjectsGrid;
