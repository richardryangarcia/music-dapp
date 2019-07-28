import React from 'react';
import StoreCard from './storeCard';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PlaceHolder from '../../imagePlaceholder.svg';
import BuyMerchForm from '../form/buyMerch';


const merchList = [
    { 
        merchId: 0,
        name: 'College Dropout Hoodie', 
        description: 'Black and Blue hoodie with Bear logo',
        imageUrl: 'QmTmnRhEiZhxGwuXq4rP7oYsvLYAFaqsgwJZmH9aMZP7AZ',
        quantity: 49,
        price: 0.4,
        isAvailable: true
    },
    { 
        merchId: 1,
        name: 'Late Registration Tshirt', 
        description: '100% cotton with Bear logo',
        imageUrl: 'QmSCxBe5iJUL8RHqd54NtVx3fXJfmMBDSk2AJPNwqFoxpj',
        quantity: 82,
        price: 0.8,
        isAvailable: true
    },
    { 
        merchId: 2, 
        name: 'Graduation Dad Hat', 
        description: 'Blacks Adams dad hat with graduation logo',
        ipfsHash: 'QmauuPCCv885u8ZkUCq9k5wSauANjKZQtdb3oLdNxYLY9D',
        imageUrl: 127,
        quantity: 4.0,
        price: .24,
        isAvailable: true
    },
    { 
        merchId: 3, 
        name: 'Graduation Dad Hat', 
        description: 'Blacks Adams dad hat with graduation logo',
        ipfsHash: 'QmauuPCCv885u8ZkUCq9k5wSauANjKZQtdb3oLdNxYLY9D',
        imageUrl: 127,
        quantity: 4.0,
        price: .24,
        isAvailable: true
    },
    { 
        merchId: 4,
        name: 'Graduation Dad Hat', 
        description: 'Blacks Adams dad hat with graduation logo',
        ipfsHash: 'QmauuPCCv885u8ZkUCq9k5wSauANjKZQtdb3oLdNxYLY9D',
        imageUrl: 127,
        quantity: 4.0,
        price: .24,
        isAvailable: false
    },
    { 
        merchId: 5,
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
    const {merchCount, isOwner, artistId} = props;
    const addButton = isOwner ? (<Button href={`/#/add-merch/${artistId}`} size="sm" >Add New</Button>) : (<div/>);
    return (
            <Container>
                <Row>
                    <Col xs={12}>
                        <b>Store</b> ( {merchCount} ) 
                        <div style={{float:'right'}}>{addButton}
                        </div>
                        <hr/>
                    </Col>
                </Row>
                {merchList.map((merch)=> {
                    const {name, description, imageUrl, quantity, price, isAvailable, merchId} = merch;
                    const buyMerchForm = quantity > 0 && isAvailable ? true : false;
                    const label = isAvailable ? (<div style={{color:'green'}}>Available</div>) : (<div style={{color:'red'}}>Unavailable</div>);

                    return (
                        <Row >
                            <Col xs={12} style={{ height: '200px', marginBottom: '30px'}}>
                                <Card style={{border: 'none', marginTop: '1em', marginBottom: '1em'}}>
                                    <Container style={{margin:'0px'}}>
                                        <Row>
                                            <Col style={{padding: '0px'}} >
                                                <Card.Img variant="top" src={PlaceHolder} style={{height:'200px', width: '200px'}} />
                                            </Col>
                                            <Col >
                                                <Card.Text style={{fontSize: '10px', paddingTop: '5px'}}>
                                                    <b>{name}</b>
                                                    <br/>
                                                    {description}
                                                </Card.Text>                                                 
                                            </Col>
                                            <Col>
                                                <Card.Text style={{fontSize: '10px', paddingTop: '5px'}}>
                                                    <b>Price:</b> {price} <br/>
                                                    {label}
                                                    {                                                    
                                                        buyMerchForm ? (<BuyMerchForm artistId={artistId} merchId={merchId} />) : (<div/>)
                                                    }
                                                </Card.Text>                                                 
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card>
                            </Col>
                        </Row>
                    )
                })}
            </Container>
    );
}

export default StoreGrid;
