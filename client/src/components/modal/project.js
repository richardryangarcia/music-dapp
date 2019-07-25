import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Contribute from '../form/contribute';

const Project = (props) => {
    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Contribute</Modal.Title>
            </Modal.Header>
            <Modal.Body><Contribute/></Modal.Body>
        </div>
    )
}

export default Project;