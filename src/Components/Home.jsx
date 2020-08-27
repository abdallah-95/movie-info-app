import React from 'react'
import MovieAppHeader from './MovieAppHeader'
import Movie from './Movie'
import FooterMovie from './FooterMovie'
import { withRouter } from "react-router";


class Home extends React.Component{

     constructor(props){
        super(props);

        this.state = {
            movie:null,
            trailer:null,
            previousMovies:[]
        }
    }

    getMovieTrailerVideoID = async (movieName, releaseDate) => {
        let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.REACT_APP_Google_API_KEY}&q=${movieName} trailer ${releaseDate != null ? releaseDate : ''}`,{
                                    method:"Get"
                                    }).then(response => response.json());
        
        return response.error == null ? response.items[0].id.videoId : null;
    }

    async componentWillMount(){
        debugger;

        let trailer = null;
        if(this.props.location?.state != null){
            trailer = await this.getMovieTrailerVideoID(this.props.location?.state.Title,this.props.location?.state.Year);
            trailer = `https://www.youtube.com/watch?v=${trailer}`;

        }

        this.setState({
            movie:this.props.location?.state != null ? this.props.location?.state : null,
            trailer:trailer
        })
        
    }

    updateMovieState = (movieData,trailerVideoID) => {
        debugger;

        let prevMovies = this.state.previousMovies;
        if(movieData.Response !== "False"){
        prevMovies.unshift({
           movie:movieData,
           trailer: `https://www.youtube.com/watch?v=${trailerVideoID}`,
           });
        }
        this.setState({movie:movieData,
                       trailer: `https://www.youtube.com/watch?v=${trailerVideoID}`,
                       previousMovies: prevMovies
                    })
    }

    onPrevMovieClick = (prevMovie, trailer) => {
        debugger;
        this.setState({movie:prevMovie,
                       trailer:trailer
                      });

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });

    }

    render(){
        debugger;

        return(
            <div className="app">
                <MovieAppHeader updateMovieState = {this.updateMovieState}/>
                {
                      this.state.movie != null && this.state.movie?.Response === "True" &&
                        <Movie movie={this.state.movie} trailer={this.state.trailer}/>
                }
                {/* <MovieAppFooter currentMovie={this.state.movie}/> */}
                
                {
                this.state.movie != null && this.state.movie?.Response === "True" &&
                    <div className="container previous-movies-group m-5">
                    <div className="row">
                        {this.state.previousMovies.map(prevMovie => 
                        <div className="col-1 mr-5">
                        <FooterMovie moviePoster = {prevMovie.movie?.Poster} 
                                     movieTrailer = {prevMovie.trailer}
                                     movie = {prevMovie.movie}
                                     onPrevMovieClickHandler = {this.onPrevMovieClick}
                        />
                        </div>)
                        }
                    </div>
                </div>
                }

                {/* <div>
                    <Route path="/" component={Home} exact />
                    <Route path="/about" component={About} />
                    <Route path="/shop" component={Shop} />
                </div> */}
            </div>
        );
    }
}


export default withRouter(Home)