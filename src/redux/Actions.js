import * as actions from './ActionTypes'

export function displayTopMovie(movie){
    return{
        type: actions.topMovieDisplay,
        movie
    }
}

export function addMovieToHistory(movie,trailer,movieImages){
    return{
        type: actions.addMovieToHistory,
        movie,
        trailer,
        movieImages
    }
}