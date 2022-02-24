import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import './movie-card-view.scss';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    let { movie, addToFavourites } = this.props;
    const currentUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log(token, 'token');


    const handleAddToFavourites = (e) => {
      e.preventDefault();
      console.log('add to Favourite movies');
      axios.post('https://movieflix-rxnldwg.herokuapp.com/users/${currentUser}/movies/${movie._id}', {},
        {
          headers: { Authorization: `Bearer ${token}` },
        })
        /* then call props.onRegistration(username) */
        .then(response => {
          const data = response.data;
          console.log(data);
          alert("movie added to favourites");
          addToFavourites(movie._id);
        })
        .catch(e => {
          console.log('error adding movie to favourites');
          alert('movie NOT added to favourites');
        });
    };

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
          <Button
            className="button"
            variant="dark"
            type="submit"
            onClick={handleAddToFavourites}>
            Add to favourites
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      BirthDate: PropTypes.string.isRequired
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired,
  }).isRequired
};