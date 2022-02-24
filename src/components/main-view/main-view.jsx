import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import axios from 'axios';
import './main-view.scss';
import { Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { NavbarView } from '../navbar-view/navbar-view';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  getMovies(token) {
    axios.get('https://movieflix-rxnldwg.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  addToFavourites(movie) {
    let favourites = this.state.userData.FavouriteMovies;

    if (favourites.indexOf(movie) < 0) {
      favourites.push(movie);
    }

    this.setState(prevState => ({
      ...prevState,
      userData: {
        ...prevState.userData,
        FavouriteMovies: favourites
      }
    })
    );
  }

  getUserData(token) {
    console.log('get user data');
    axios.get('https://movieflix-rxnldwg.herokuapp.com/users/' + localStorage.getItem('user'), {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log('user', response.data);
        // Assign the result to the state
        this.setState({ userData: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  /*When a movie is clicked, 
  sthis function is invoked and 
  updates the state of the `selectedMovie` *property to that movie*/

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  render() {

    let { movies } = this.props;
    const { user, userData } = this.state;
    console.log('user: ', user);

    return (
      <Router>

        <NavbarView onLoggedOut={() => this.onLoggedOut()} />
        {/* ----------------  LOGGED IN AS <user>  */}
        <Row>
          {user && <Link to={`/users/${user}`} >logged in as {user}</Link>}
        </Row>

        <Container>
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {

              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;

              return <MoviesList movies={movies} />;
            }} />

            <Route path="/login" render={() => {
              if (user) {
                return <Redirect to="/" />;
              }

              return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
            }} />
            <Route path="/register" render={() => {
              if (user) {
                return <Redirect to="/" />;
              }

              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }} />

            <Route exact path={`/users/:username`} render={({ history }) => {
              if (!user) return
              <Redirect to="/" />

              return <ProfileView userData={userData} user={user} onBackClick={() => history.goBack()} onLoggedOut={() => this.onLoggedOut()} movies={movies} />
            }} />

            <Route path="/movies/:movieId" render={({ match, history }) => {
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              }

              if (movies.length === 0) {
                return <div className="main-view" />;
              }

              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find(m => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()} />
                </Col>
              );
            }} />
            <Route path="/profile" render={({ history }) => {
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              }

              return (
                <Col md={8}>
                  <ProfileView movies={movies} onBackClick={() => history.goBack()} />
                </Col>
              );
            }} />
            <Route path="/genres/:name" render={({ match, history }) => {
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              }


              if (movies.length === 0) {
                return <div className="main-view" />;
              }

              return (
                <Col md={8}>
                  <GenreView
                    genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                    onBackClick={() => history.goBack()}
                    movies={movies.filter(movie => movie.Genre.Name === match.params.name)} />
                </Col>
              )
            }} />
            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              }

              if (movies.length === 0) return <div className="main-view" />;

              return (
                <Col md={8}>
                  <DirectorView
                    director={movies.find(m => m.Director.Name === match.params.name).Director}
                    onBackClick={() => history.goBack()}
                    movies={movies.filter(movie => movie.Director.Name === match.params.name)} />
                </Col>
              );
            }} />

          </Row>
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);