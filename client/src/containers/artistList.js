import React from 'react';
import {connect} from 'react-redux';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from '../components/card';
import {groupBy} from '../utils/utils';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {getArtistAddress} from '../redux/ArtistFactory/actions';
import { bindActionCreators } from '../../../../../../Library/Caches/typescript/3.5/node_modules/redux';

class ArtistList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            artistIds: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
            loadArtists: true
        }
    }

    componentDidMount(){
        const {artistIds} = this.state;
        const {actions, Artists} = this.props;
        artistIds.forEach((artistId) => {
            if (Artists && !Artists[artistId]){
                actions.getArtistAddress(artistId);
            }
        })
    }

    render() {
        const {Artists} = this.props;
        const {artistIds} = this.state;
        const groupedArtists = groupBy(4, artistIds);
        return (
            <div>
                <Jumbotron>
                    <h1>8trac Artists</h1>
                    <p>
                        Browse through the hottest artists on 8trac
                    </p>
                </Jumbotron>
                {
                    groupedArtists.map((artists) =>{
                        return <div style={{marginLeft: '50px'}}>
                            <Row>
                                <Col><Card artistId={artists[0]} artist={Artists[artists[0]]}/></Col>
                                <Col><Card artistId={artists[1]} artist={Artists[artists[1]]}/></Col>
                                <Col><Card artistId={artists[2]} artist={Artists[artists[2]]}/></Col>
                                <Col><Card artistId={artists[3]} artist={Artists[artists[3]]}/></Col>
                            </Row>
                        
                        <br/></div>
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        Artists: state.Artist, 
		ArtistFactory: state.ArtistFactory
    }
}

const mapDispatchToProps = dispatch => {
    return {actions: bindActionCreators({getArtistAddress}, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistList);