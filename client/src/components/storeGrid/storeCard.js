import React from 'react';
import Card from 'react-bootstrap/Card';
import PlaceHolder from '../../imagePlaceholder.svg';

const ProjectCard = (props) => {
    const {name, description, imageUrl, quantity, price, isAvailable} = props.merch;
    const bottomLink = !isAvailable ? (null) : (<Card.Link href="#">Buy Now</Card.Link> )
    return (
        <Card style={{ width: '14rem' }}>
            <Card.Img variant="top" src={PlaceHolder} />
            {/* <Card.Img variant="top" src={`https://ipfs.io/ipfs/${imageUrl}`} /> */}
            <Card.Body>
                <Card.Title>{name} <br/>
                    <div style={{color:'grey'}}>{price} ETH</div>
                </Card.Title>
                <Card.Text style={{fontSize: '12px'}}>
                    {description}
                </Card.Text>
                <Card.Text style={{fontSize: '10px'}}>
                    {quantity} QTY<br/>
                </Card.Text>
                {bottomLink}     
            </Card.Body>
        </Card>
    )
}

export default ProjectCard;