import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from '../../../../../../Library/Caches/typescript/3.5/node_modules/redux';
import { loadArtist, getMerch, addProjectAsMinter } from '../redux/Artist/actions';
import {loadArtistProjects} from '../redux/Project/actions';
import {getArtistAddress} from '../redux/ArtistFactory/actions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import ProjectGrid from '../components/projectsGrid';
import StoreGrid from '../components/storeGrid';
import Button from 'react-bootstrap/Button';

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

      if (artists && artists[id] && artists[id].instance) {
        actions.getArtistAddress(id);
      } else {
        actions.getArtistAddress(id);
      }
    }

    render() {
        const {id} = this.props.match.params;
        const { account, Artists, actions, Projects, merchandise} = this.props;
        const ArtistInstance = Artists && Artists[id] || {};
        const StoreItems = merchandise && merchandise[id] || {};
        const {name, owner, genre, bio, location, imageHash, projectCount, merchCount, instance, merch, buyerBalance} = ArtistInstance;
        const prods = Projects && Projects[id] || {};
        const isOwner = account === owner ? true : false;

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
                <ProjectGrid addProjectAsMinter={actions.addProjectAsMinter} loadArtistProjects={actions.loadArtistProjects} artistId={id} projectCount={projectCount} projectList={prods} isOwner={isOwner}/>
              </div>
              <br/>
              <br/>
              <br/>

              <div className='store'>
                <StoreGrid artistId={id} merchCount={merchCount} balance={buyerBalance} loadMerch={actions.getMerch} merchList={StoreItems} isOwner={isOwner} />
              </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      account: state.application && state.application.account, 
      merchandise: state.Artist && state.Artist.merchandise,
      Artists: state.Artist,
      Projects: state.Project    
    }
}

const mapDispatchToProps = dispatch => {
  return {actions: bindActionCreators({loadArtist, getArtistAddress, loadArtistProjects, getMerch, addProjectAsMinter}, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Artist);