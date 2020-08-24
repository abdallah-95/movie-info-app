import React from 'react'
import FooterMovie from './FooterMovie'

export default class MovieAppFooter extends React.Component{

    state = {
        footer:'Movie App Footer',
        prviousMovies:[{}]
    }


    render(){
        return(
            <div className="container previous-movies-group m-5">
                <h3>{this.state.footer}</h3>
                <div className="row">
                    {this.state.prviousMovies.map(prevMovie => 
                    <div className="col-3">
                    <FooterMovie moviePoster={this.props.currentMovie?.Title} 
                                movieTrailer={prevMovie.movieTrailer}
                    />
                    </div>)
                    }
                </div>
            </div>
        );
    }
}