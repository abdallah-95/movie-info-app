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
            </div>
        );
    }
}

export default Movie