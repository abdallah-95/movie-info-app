import React from 'react'

export default class FooterMovie extends React.Component{

    render(){
        return(
            <div>
                <img className="mt-2" src={this.props.moviePoster} alt="" onClick={() => {debugger; this.props.onPrevMovieClickHandler(this.props.movie,this.props.movieTrailer,this.props.images)}}/>
            </div>
            
        );
    }
}