import * as actions from './ActionTypes'

export default function(state = {topMovie: null}, action){

    if(action.type === actions.topMovieDisplay)
        return{
            ...state,
            topMovie:action.movie
        }
    else
        return state;
}