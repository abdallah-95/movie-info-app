import * as actions from './ActionTypes'

const initialState = {topMovie: null, movieBrowsingHistory: []}

export function displayTopMovie(state = initialState, action){

    if(action.type === actions.topMovieDisplay)
        return{
            ...state,
            topMovie:action.movie
        }
    else
        return state;
}

export function addMovieToHistory(state = initialState, action){

    if(action.type === actions.addMovieToHistory){

        let currentMovieBrowsingHistory = state.movieBrowsingHistory;
        currentMovieBrowsingHistory.unshift({
            movie: action.movie,
            trailer: action.trailer,
            movieImages: action.movieImages
        })

        return{
            ...state,
            movieBrowsingHistory:currentMovieBrowsingHistory
        }
    }
    else
        return state;
}