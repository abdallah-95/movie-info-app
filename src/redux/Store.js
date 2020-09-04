import {createStore,combineReducers} from 'redux'
import {displayTopMovie,addMovieToHistory} from './Movies'

/* eslint-disable no-underscore-dangle */
export default createStore(combineReducers({displayTopMovie,addMovieToHistory}),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
/* eslint-enable */