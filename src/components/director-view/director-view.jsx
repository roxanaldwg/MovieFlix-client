import React from 'react';
import PropTypes from 'prop-types';
import './director-view.scss';
import { Link } from 'react-router-dom';
import { Container, Card, Button, Row } from 'react-bootstrap';

export class DirectorView extends React.Component {

  render() {
    console.log('director-view');

    const { director, onBackClick } = this.props;

    return (
      <Container fluid>
        <Card>
          <Card.Body>
            <Card.Title>Director</Card.Title>
            <Card.Text>
              <span className="label">Name: </span>
              <span className="value">{director.Name}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Birth: </span>
              <span className="value">{director.Birth}</span>
            </Card.Text>

            <Button variant="outline-light" onClick={() => { onBackClick(); }}>Back</Button>
          </Card.Body>
        </Card>
        <Row>
          {movies.map(movie => (
            <Card className="favorite-movie card-content" key={movie._id} >
              <Card.Img
                className="fav-poster"
                variant="top"
                src={movie.ImagePath} />
              <Card.Body style={{ backgroundColor: "black" }}>
                <Card.Title className="movie_title">
                  {movie.Title}
                </Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    BirthDate: PropTypes.string

  }).isRequired
};