import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Project from './project';
import ProjectCreate from './projectCreate';
import AddMerch from './addMerch';

class modalContent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show:false
        }
    
          this.handleShow = this.handleShow.bind(this)
          this.handleClose = this.handleClose.bind(this)
    }

    handleClose(){
        this.setState({show: false})
    }

    handleShow(){
        this.setState({show: true})
    }

    render(){
        const {show} = this.state;
        const {label, id, type} = this.props;
        let contents;
        switch(type){
            case 'addMerch':
                contents = <AddMerch artistId={id}/>
                break;
            case 'addProject':
                contents = <ProjectCreate artistId={id}/>
                break;
            case 'contribute':
                contents = <Project artistId={id}/>
                break;
        }

        return (
            <div>
                <Button variant="link" onClick={this.handleShow}>
                    {label}
                </Button>
  
                <Modal show={show} onHide={this.handleClose}>
                    {contents}
                    <Modal.Footer>
                    {/* <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                        Save Changes
                    </Button> */}
                    </Modal.Footer>
                </Modal>
              </div>
            )
    }
}

export default modalContent;