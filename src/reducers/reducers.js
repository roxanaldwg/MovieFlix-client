//import actions:
import { SET_FILTER, SET_MOVIES } from '../actions/actions';

import { combineReducers } from 'redux';

//create reducer functions:
function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

//combined reducer:
/* function moviesApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    movies: movies(state.movies, action)
  }
} 
for readability purposes function above is replaced by the following */
const moviesApp = combineReducers({
  visibilityFilter,
  movies
});

export default moviesApp;


