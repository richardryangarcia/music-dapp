import React from 'react';
import Modal from 'react-bootstrap/Modal';
import AddMerchForm from '../form/addMerch';
const AddMerch = (props) => {
    return (
        <div>                    
            <Modal.Header closeButton>
                <Modal.Title>Add Merch</Modal.Title>
            </Modal.Header>
            <Modal.Body><AddMerchForm/></Modal.Body>
        </div>
    )
}

export default AddMerch;