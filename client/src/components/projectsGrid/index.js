import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import PlaceHolder from '../../imagePlaceholder.svg';
import ContributeForm from '../form/contribute';
import Button from 'react-bootstrap/Button';

class ProjectsGrid extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        const {artistId, loadArtistProjects} = this.props;
        if (artistId ){
            loadArtistProjects(artistId);
        }
    }

    render() {
        const {isOwner, projectCount, artistId, projectList, addProjectAsMinter} = this.props;
        const projectArray = Object.values(projectList);
        const addButton = isOwner ? (<Button variant="link" href={`/#/project-create/${artistId}`} size="sm" >Add New</Button>) : (<div/>);
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

                        {projectArray.map((project)=> {
                            const {imageHash, name, description, cap, weiRaised, projectId, projectIsMinter, address} = project;
                            console.log('address is minter', address, projectIsMinter);
                            if (!projectIsMinter){
                                addProjectAsMinter({artistId, address})
                            }

                            return <Row >
                                <Col xs={12} style={{ height: '200px', marginBottom: '30px'}} >
                                    <Card style={{border: 'none', marginTop: '1em', marginBottom: '1em'}}>
                                        <Container style={{margin:'0px'}}>
                                            <Row>
                                                <Col style={{padding: '0px'}} >
                                                    {imageHash ? (
                                                        <Card.Img variant="top" src={`https://ipfs.io/ipfs/${imageHash}`} style={{height:'200px', width: '200px', borderRadius:'10px'}} />
                                                    ) : (
                                                        <Card.Img variant="top" src={PlaceHolder} style={{height:'200px', width: '200px', borderRadius:'10px'}} />
                                                    )}
                                                </Col>
                                                <Col >
                                                    <Card.Text style={{fontSize: '10px', paddingTop: '5px'}}>
                                                        <b>{name}</b>
                                                        <br/>
                                                        {description}
                                                    </Card.Text>                                                 
                                                </Col>
                                                <Col>
                                                    <Card.Text style={{fontSize: '10px', paddingTop: '5px'}}>
                                                        <b>Goal:</b> {cap} <br/>
                                                        <b>Raised:</b> {weiRaised}<br/>
                                                        {
                                                            parseInt(weiRaised) < parseInt(cap) ? (<ContributeForm artistId={artistId} projectId={projectId} />) : (<div/>)
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
