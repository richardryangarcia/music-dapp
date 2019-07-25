import React from 'react';
import Modal from 'react-bootstrap/Modal';

const ProjectCreate = (props) => {
    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Start New Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        </div>
    )
}

export default ProjectCreate;