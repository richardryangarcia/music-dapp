import React from 'react';
import ArtistSignup from '../components/form';
import Jumbotron from 'react-bootstrap/Jumbotron';

const ArtistSignUp = (props) => {
  return (
    <div>
      <Jumbotron>
      <h1>Welcome!</h1>
      <p>
          Sign up as an artist an get start funding your next project
      </p>
      </Jumbotron>
      <ArtistSignup />
    </div>
  );
}

export default ArtistSignUp;