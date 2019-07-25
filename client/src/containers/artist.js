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
import ArtistImage from './mustache-cera.jpg';
import ProjectGrid from '../components/projectsGrid';
import StoreGrid from '../components/storeGrid';
import Button from 'react-bootstrap/Button';
import Modal from '../components/modal';

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
      const {actions} = this.props;
      actions.getArtistAddress(id);
    }


    render() {
        const {id} = this.props.match.params;
        const ArtistProfile = artists && artists[`${id}`];






        
        const {ArtistFactory, account, artists, actions} = this.props;
        const {name, owner, genre, bio, location, url, projectCount, merchCount} = artists && artists[id] || {};
        const {artistAddress, artistLoaded} = this.state;


        const addMerchButton = owner === account ? (<Modal label="Add new merch" artistId={id} type="addMerch" />) : (null);
        const addProjectButton = owner === account ? (<Modal label="Add new project" artistId={id} type="addProject"/>) : (null);

        return (
            <div className='artist'>
              <Container>
                <Row className='banner' >
                  <Col xs={12} >
                    <Image src={ArtistImage} style={{'height': '200px', 'width': '200px'}} rounded />
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
              </Container>
              <div>
                <Card className='bio'>
                  <Card.Body>{bio}</Card.Body>
                </Card>
              </div>

              <div className='projects' >
                <b>Projects</b> ( {projectCount} ) 
                <div style={{float:'right'}}>{addProjectButton}
                </div>
                <hr/>
                <ProjectGrid/>
              </div>

              <div className='store'>
                <b>Store</b> ( {merchCount} ) 
                <div style={{float:'right'}}>{addMerchButton}</div>
                <hr/>
                <StoreGrid/>
              </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      account: state.application && state.application.account, 
      web3: state.application && state.application.web3,
      artists: state.Artist,
      ArtistFactory: state.ArtistFactory
    }
}

const mapDispatchToProps = dispatch => {
  return {actions: bindActionCreators({loadArtist, getArtistAddress}, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Artist);