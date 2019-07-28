import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PlaceHolder from '../../imagePlaceholder.svg';

const ArtistCard = (props) => {
    const {artist, artistId} = props;
    const image = artist && artist.imageHash ? (<Card.Img variant="top" src={`https://ipfs.io/ipfs/${artist.imageHash}`} />) : (<Card.Img variant="top" src={PlaceHolder} />);

    return (
        <div className='artist-card'>
            {
                artist && artist.name ? (
                <Card >
                    <Button href={`/#/artist/${artistId}`} >
                        { image }
                        <Card.Body>
                            <Card.Text>
                                {artist.name}
                            </Card.Text>
                        </Card.Body>
                    </Button>
                </Card>
                ) : (<div/>)
            }
        </div>
    )
}

export default ArtistCard;