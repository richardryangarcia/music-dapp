import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from '../../../../../../Library/Caches/typescript/3.5/node_modules/redux';
import { loadArtist } from '../redux/Artist/actions';
import {getArtistAddress} from '../redux/ArtistFactory/actions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import ProjectGrid from '../components/projectsGrid';
import StoreGrid from '../components/storeGrid';
import Button from 'react-bootstrap/Button';
import Modal from '../components/modal';
import ProjectSection from '../components/projectsGrid';

class Artist extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        artistAddress:'',
        ArtistInstance: null,
        artistLoaded: false,
      }

    }

    componentDidMount(){
      const {id} = this.props.match.params;
      const {actions, artists} = this.props;
      const getArtist = artists && artists[id] ? false : true;
      if (getArtist) {
        actions.getArtistAddress(id);
      }
    }


    render() {
        const {id} = this.props.match.params;
        const {ArtistFactory, account, Artists, actions, projects} = this.props;
        const {name, owner, genre, bio, location, imageHash, projectCount, merchCount} = Artists && Artists[id] || {};
        const prods = projects && projects[id] || {};
        const isOwner = account === owner ? true : false;

        const addMerchButton = true ? (<Button href={`/#/add-merch/${id}`} size="sm" >Add Merch</Button>) : (null);
        const addProjectButton = true ? (<Button href={`/#/project-create/${id}`} size="sm" >Create Project</Button>) : (null);

        return (
            <div className='artist'>
              <Container>
                <Row className='banner' >
                  <Col xs={12} >
                    <Image src={`https://ipfs.io/ipfs/${imageHash}`} style={{'height': '200px', 'width': '200px'}} rounded />
                  </Col>
                </Row>
                <Row className='banner sub-header' >
                  <Col xs={12} >
                    <b>{name}</b>
                    <p>{genre}<br/>
                    {location}</p>
                  </Col>
                </Row>
                <Row className='banner' >
                  <Col xs={12} >
                  </Col>
                </Row>
                <Row className='' >
                  <Col xs={12} >
                    <Card className='bio'>
                      <Card.Body>{bio}</Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>

              <div className='projects' >
                <ProjectGrid artistId={id} projectCount={projectCount} projectList={prods} isOwner={isOwner}/>
              </div>
              <br/>
              <br/>
              <br/>

              <div className='store'>
                <StoreGrid artistId={id} merchCount={merchCount} isOwner={isOwner} />
              </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      account: state.application && state.application.account, 
      web3: state.application && state.application.web3,
      Artists: state.Artist,
      projects: state.Project,
      ArtistFactory: state.ArtistFactory
    }
}

const mapDispatchToProps = dispatch => {
  return {actions: bindActionCreators({loadArtist, getArtistAddress}, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Artist);