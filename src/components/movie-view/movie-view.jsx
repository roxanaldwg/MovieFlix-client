import React from 'react';
import './movie-view.scss';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }
  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }
  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container fluid className="moviesContainer">
        <Row>
          <Col>
            <div className="movie-view">
              <div className="movie-poster">
                <img src={movie.ImagePath} />
              </div>
              <div className="movie-title">
                <span className="label font-weight-bold font-italic">Title: </span>
                <span className="value">{movie.Title}</span>
              </div>
              <div className="movie-description">
                <span className="label font-weight-bold font-italic">Description: </span>
                <span className="value">{movie.MovieDescription}</span>
              </div>
              <div className="movie-genre">
                <span className="label font-weight-bold font-italic">Genre: </span>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="link">{movie.Genre.Name}</Button>
                </Link>
              </div>
              <div className="movie-director">
                <span className="label font-weight-bold font-italic">Director: </span>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="link">{movie.Director.Name}</Button>
                </Link>
              </div>

              <Button variant="info" onClick={() => onBackClick(null)}>Back</Button>

            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}