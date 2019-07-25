import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PlaceHolder from '../../imagePlaceholder.svg';

const ArtistCard = (props) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={PlaceHolder} />
        <Card.Body>
            <Card.Text style={{fontSize: '12px'}}>
                {props.artistAddress}
            </Card.Text>
            <Button href={`/#/artist/${props.artistAddress}`} variant="primary">Details</Button>
        </Card.Body>
        </Card>
    )
}

export default ArtistCard;