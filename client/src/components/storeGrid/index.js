import React from 'react';
import StoreCard from './storeCard';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const merchList = [
    { 
        name: 'College Dropout Hoodie', 
        description: 'Black and Blue hoodie with Bear logo',
        imageUrl: 'QmTmnRhEiZhxGwuXq4rP7oYsvLYAFaqsgwJZmH9aMZP7AZ',
        quantity: 49,
        price: 0.4,
        isAvailable: true
    },
    { 
        name: 'Late Registration Tshirt', 
        description: '100% cotton with Bear logo',
        imageUrl: 'QmSCxBe5iJUL8RHqd54NtVx3fXJfmMBDSk2AJPNwqFoxpj',
        quantity: 82,
        price: 0.8,
        isAvailable: true
    },
    { 
        name: 'Graduation Dad Hat', 
        description: 'Blacks Adams dad hat with graduation logo',
        ipfsHash: 'QmauuPCCv885u8ZkUCq9k5wSauANjKZQtdb3oLdNxYLY9D',
        imageUrl: 127,
        quantity: 4.0,
        price: .24,
        isAvailable: true
    },
    { 
        name: 'Graduation Dad Hat', 
        description: 'Blacks Adams dad hat with graduation logo',
        ipfsHash: 'QmauuPCCv885u8ZkUCq9k5wSauANjKZQtdb3oLdNxYLY9D',
        imageUrl: 127,
        quantity: 4.0,
        price: .24,
        isAvailable: true
    },
    { 
        name: 'Graduation Dad Hat', 
        description: 'Blacks Adams dad hat with graduation logo',
        ipfsHash: 'QmauuPCCv885u8ZkUCq9k5wSauANjKZQtdb3oLdNxYLY9D',
        imageUrl: 127,
        quantity: 4.0,
        price: .24,
        isAvailable: false
    },
    { 
        name: 'Graduation Dad Hat', 
        description: 'Blacks Adams dad hat with graduation logo',
        ipfsHash: 'QmauuPCCv885u8ZkUCq9k5wSauANjKZQtdb3oLdNxYLY9D',
        imageUrl: 127,
        quantity: 4.0,
        price: .24,
        isAvailable: true
    }
]

const StoreGrid = (props) => {
    return (
        <div>
            <Container>
                <Row >
                    {merchList.map((merch)=> {
                        return <Col ><StoreCard merch={merch}/></Col>
                    })}
                </Row>
            </Container>
        </div>
    );
}

export default StoreGrid;
