import React from 'react';
import {connect} from 'react-redux';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from '../components/card';
import {groupBy} from '../utils/utils';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ArtistList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            artists: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
            loadArtists: true
        }

        this.getArtists = this.getArtists.bind(this)
    }

    async getArtists (ArtistFactory) {
        const response  = await ArtistFactory.methods.getLatestArtists(25).call();
        this.setState({artists: response, loadArtists: false});
        return response;
    }


    render() {
        const {ArtistFactory} = this.props;
        const {artists, loadArtists} = this.state;
        if (ArtistFactory && loadArtists) {
            //this.getArtists(ArtistFactory)
        }
        const groupedArtists = groupBy(4, artists);
        return (
            <div>

            <Jumbotron>
            <h1>8Trac Artists</h1>
            <p>
                Browse through the hottest artists on 8trac
            </p>
            </Jumbotron>
            
            {
                groupedArtists.map((artists) =>{
                    return <div style={{marginLeft: '50px'}}>
                        <Row>
                            <Col><Card artistAddress={artists[0]}/></Col>
                            <Col><Card artistAddress={artists[1]}/></Col>
                            <Col><Card artistAddress={artists[2]}/></Col>
                        </Row>
                    
                    <br/></div>
                })
            }</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.application && state.application.account, 
		ArtistFactory: state.contracts && state.contracts.artistFactory
    }
}

export default connect(mapStateToProps, null)(ArtistList);