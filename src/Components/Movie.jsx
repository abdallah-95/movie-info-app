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
            <div className="container mt-5 movie">
                <div className="row">
                    <div className="col-4">
                        <h2 className="mb-2">{this.props.movie?.Title}</h2>
                        <img alt="" src={this.props.movie?.Poster}/>
                    </div>
                    <div className="col-md-8 col-sm-4">                         
                        <MovieBriefInfoBox movie={this.props.movie} />   

                        <div className="row h-100">
                            <div className="col h-75 align-self-center">
                            <YouTubePlayer
                                url={this.props.trailer}
                                controls = {true}
                                key={this.props.trailer}//in order to reload player with "trailer" state
                                width="100%"
                                height="100%"
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

                    <div className="col-12">

                    { this.props.images.map(img => <img  alt="" src={img.url} className="movieImage"/>)}

                    {/* <img alt="" src={this.props.movie?.Poster} style={{width:"150px"}}/>
                    <img alt="" src={this.props.movie?.Poster} style={{width:"150px"}}/> */}
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-6" style={{fontWeight:"bold",fontSize:"15px"}}>
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