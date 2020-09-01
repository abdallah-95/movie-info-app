import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import displayTopMovieAction from '../redux/Actions'

function TopMovieItem(props){
debugger;
    return(
        <div className="row TopMovieItem mb-2">
            <div className="col-1">
            <img src={props.movieData.movie.Poster} alt="" />
            </div>
            <div className="col-4 align-self-center">
            <span>{props.movieData.ranking}.</span>
            {/* <a href="#" >{props.movieData.movie.Title}</a> */}
            {/* <Link to={{pathname:`/${props.movieData.movie.Title}`,state:props.movieData.movie}} >{props.movieData.movie.Title}</Link> */}
            <Link to={{pathname:`/${props.movieData.movie.Title}`}} onClick={() => {debugger; props.displayTopMovie(props.movieData.movie)}}>{props.movieData.movie.Title}</Link>

            <span style={{marginLeft:"5px"}}>({props.movieData.movie.Year})</span>
            </div>
            <div className="col-1 align-self-center rating">
                <img src={require('../images/star-removebg-preview.png')} /> 
                <span>{props.movieData.rating}</span>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    console.log(dispatch);

    return { displayTopMovie: (movie) => {dispatch(displayTopMovieAction(movie))} }
}

export default connect(null, mapDispatchToProps)(TopMovieItem)