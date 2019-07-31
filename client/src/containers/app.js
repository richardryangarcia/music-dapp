import React from 'react';
import Header from '../components/header';
import Spinner from 'react-bootstrap/Spinner';
import ToastMessage from '../components/Toast';
import {connect} from 'react-redux';
import Toast from 'react-bootstrap/Toast';

class App extends React.Component {
    constructor(props){
        super(props);
    }

    render () {
        const {web3, account, ArtistFactory} = this.props;
        const showSpinner = web3 && account && ArtistFactory ? false : true;
        return (
            <div>
            {
                showSpinner ? (
                    <div className='spinner-page'>
                        <Spinner className='center-spinner' animation="grow" variant="primary" />
                    </div>
                ) :(
                    <div>           
                        <Header/>
                        <ToastMessage />
                        <div className='page'>
                            {this.props.children}
                        </div>
                    </div>
                )
            }
     
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        web3: state.application && state.application.web3,
        account: state.application && state.application.account,
        ArtistFactory: state.ArtistFactory && state.ArtistFactory.instance
    }
}

export default connect(mapStateToProps, null)(App);