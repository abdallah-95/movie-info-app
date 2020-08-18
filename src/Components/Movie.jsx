import React from 'react'
import '../Styles/App.css'
import YouTubePlayer from 'react-player';
import MovieBriefInfoBox from './MovieBriefInfoBox'


class Movie extends React.Component{

    // constructor(props){
    //     super(props);
    //     // this.state = { 
    //     //     movie:this.props.movie
    //     //  }
    // }
    render(){
        return(
            <div className="container mt-5">
                <div className="row">
                    <div className="col-4">
                        <h2 className="mb-2">{this.props.movie?.Title}</h2>
                        <img alt="" src={this.props.movie?.Poster}/>
                    </div>
                    <div className="col-md-8 col-sm-10">                         
                        <MovieBriefInfoBox movie={this.props.movie} />   

                        <div className="row h-100">
                            <div className="col align-self-center">
                            <YouTubePlayer
                                url={this.props.trailer}
                                controls = "true"
                                key={this.props.trailer}//in order to reload player with "trailer" state
                            />
                            </div>
                        </div>                          
                    </div>    
                </div>
                {/* Movie Description */}

                <div className="row mt-3">
                    <div className="col-7">
                        <p>{this.props.movie.Plot}</p>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-7" style={{fontWeight:"bold",fontSize:"15px"}}>
                        <p>{this.props.movie.Awards}</p>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-7">
                        <h6>Director:</h6>
                        <span>{this.props.movie.Director}</span>
                        <h6 className="mt-2">Actors:</h6>
                        <span>{this.props.movie.Actors}</span>
                        <h6 className="mt-2">BoxOffice:</h6>
                        <span>{this.props.movie.BoxOffice}</span>                
                    </div>
                </div>
            </div>
        );
    }
}

export default Movie