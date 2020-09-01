import {createStore} from 'redux'
import movieReducer from './Movies'

/* eslint-disable no-underscore-dangle */
export default createStore(movieReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
/* eslint-enable */