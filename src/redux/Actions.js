import * as actions from './ActionTypes'

export default function displayTopMovie(movie){
    return{
        type: actions.topMovieDisplay,
        movie
    }
}