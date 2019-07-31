import React from 'react';
import {connect} from 'react-redux';
import Toast from 'react-bootstrap/Toast';
import {closeToast} from '../../redux/application/actions';
import { bindActionCreators } from '../../../../../../../Library/Caches/typescript/3.5/node_modules/redux';

class ToastMessage extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const {toastOpen, toastMessage, actions} = this.props;
    if(toastOpen) {
      setTimeout(() => {
        actions.closeToast()
      }, 5000)
    }

    return (
      <Toast show={toastOpen} onClose={() => {actions.closeToast() }} style={{
        zIndex: 1500,
        position: 'absolute',
        top: 50,
        right: 10,  
        }}>
        <Toast.Header>
          <strong className="mr-auto">Confirming transaction will: </strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    );
  }
}

const mapStateToProps = state => {
  return {
    toastOpen: state.application && state.application.toastOpen,
    toastMessage: state.application && state.application.toastMessage
  }
}

const mapDispatchToProps = dispatch => {
  return {actions: bindActionCreators({closeToast}, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(ToastMessage);